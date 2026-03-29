# Quality Gate Workflow

Pre-merge quality check. **All steps are report-only — no fixes applied.** Use this command before merging a feature branch to get a comprehensive quality assessment from three independent angles: code correctness, test coverage, and UX/design.

---

## Phase 0: Setup

### 0.1 — Detect Base Branch

Use the same detection logic as the ship workflow:

1. Check for an open PR: `gh pr view --json baseRefName -q .baseRefName`
2. If no PR: `gh repo view --json defaultBranchRef -q .defaultBranchRef.name`
3. If both fail: fall back to `main`.

Print the detected base branch name.

### 0.2 — Check for Changes

```bash
git fetch origin <base> --quiet
git diff origin/<base> --stat
```

If there is no diff: output **"Nothing to review — no changes against the base branch."** and STOP.

### 0.3 — Get the Full Diff

```bash
git diff origin/<base>
```

Store the diff for use by all reviewers. Also collect:
- `git log origin/<base>..HEAD --oneline` — all commits on this branch
- List of changed files: `git diff origin/<base> --name-only`
- Which files are UI/frontend vs. backend/API (for conditional UX phase)

**Gate**: always — setup never blocks.

---

## Phase 1: Code Review (Lead Dev + Security — Parallel)

Spawn two subagents simultaneously. They review the same diff independently.

### 1a — Lead Dev Review (`subagent_type: "lead-dev"`, model: `sonnet`)

Using the `code-review-excellence` skill, evaluate the diff across:

**Pass 1 — Critical (flag any as BLOCKER to fail the gate):**
- SQL & data safety: raw queries, unparameterized inputs, missing sanitization
- Race conditions & concurrency: shared mutable state without synchronization
- Auth & authorization gaps: unprotected routes, privilege escalation paths
- LLM output trust boundary: unsanitized LLM output injected into SQL, HTML, or shell

**Pass 2 — Important (flag as MAJOR — should fix before merge):**
- N+1 query patterns, missing indexes for new query patterns
- Missing error handling on external calls (HTTP, DB, file I/O)
- Functions > 30 lines introduced in this diff
- Duplicated logic when a shared utility already exists

**Pass 3 — Informational (flag as MINOR — consider fixing):**
- Magic numbers without named constants
- Dead code or commented-out blocks introduced in the diff
- Missing type annotations on public functions (TS/Python)
- Stale comments that no longer match the code

Output format per finding:
```
[SEVERITY] [file:line] Category: Description
Context: what the code does
Risk: what goes wrong if unfixed
Suggestion: how to fix it
```

### 1b — Security Review (`subagent_type: "security"`, model: `sonnet`)

Using the `security-audit` skill:
- Secrets scan: hardcoded API keys, tokens, passwords, connection strings
- SAST on changed files: injection vectors (SQL, SSRF, XSS, command injection)
- Dependency audit: new dependencies introduced in this diff with known CVEs
- Auth flow changes: any changes to authentication or session handling
- Data exposure: PII or sensitive data in logs, error messages, or API responses

Classify each finding as:
- `CRITICAL` — exploitable now, must fix before merge
- `HIGH` — significant risk, should fix before merge
- `MEDIUM` — worth tracking, can defer with justification
- `LOW` — informational, best practice recommendation

**Gate (Phase 1 combined)**: Report-only — findings are recorded but do NOT block this workflow from completing. The report surfaces the findings; the human decides whether to merge.

---

## Phase 2: QA Testing

Spawn a **qa-tester subagent** (`subagent_type: "qa-tester"`, model: `sonnet`).

### 2.1 — Run Full Test Suite

Auto-detect and run tests (same detection logic as ship.md Step 3):

```bash
npm test     # or pnpm/yarn
pytest       # Python
bundle exec rspec / rake test   # Ruby
cargo test   # Rust
go test ./...
```

Report:
- Pass / fail count
- Any failures with stack traces (full, not truncated)
- Total test runtime

### 2.2 — Run E2E Tests

Detect if Playwright (or Cypress) is configured:
- Check for `playwright.config.ts`, `playwright.config.js`, `cypress.config.ts`, `cypress.config.js`
- Check for `e2e/` or `cypress/` directories

If E2E framework detected:
```bash
npx playwright test --reporter=list    # or: npx cypress run --reporter spec
```

If E2E framework is NOT detected: log `"No E2E framework detected — skipping E2E tests."` and continue.

Report:
- E2E pass / fail count
- Any failures with scenario name + step where it failed + screenshot path if available
- Browsers / viewports tested

### 2.3 — Coverage Report

```bash
npx vitest run --coverage   # Vitest
npx jest --coverage         # Jest
pytest --cov --cov-report=term-missing   # Pytest
```

Report:
- Overall line/branch coverage %
- Coverage on **new/changed files only** (most important number)
- Files with < 60% coverage in the diff (flag as LOW_COVERAGE)

### 2.4 — Smoke Check (if UI files changed)

If the diff includes frontend files (`*.tsx`, `*.jsx`, `*.vue`, `*.html`):

Launch dev server if not running. Use the `smoke-testing` skill to verify:
- All key pages return HTTP 200
- No console errors on page load
- No broken network requests on the main routes

Shut down dev server after smoke check.

**Gate**: Report-only.

---

## Phase 3: UX & Accessibility Audit (Conditional)

**Skip entirely if no UI files were changed in the diff.**

Spawn a **ux-designer subagent** (`subagent_type: "ux-designer"`, model: `sonnet`).

Using the `ux-audit` skill and `accessibility-audit` skill:

### 3.1 — UX Review (diff-focused)

For each new or changed UI component/screen:
- Does the component handle empty states (zero data, first-time user)?
- Are error messages user-readable (not stack traces or error codes)?
- Is the interaction flow consistent with surrounding components?
- Any new UI that breaks mobile responsiveness?

### 3.2 — Accessibility Check

```bash
# If axe-playwright or similar is available:
npx playwright test --grep @a11y

# Otherwise, use static analysis:
npx axe-cli <url>   # if dev server is running
```

Check changed components for:
- Missing `aria-label` on interactive elements without visible text
- Images without `alt` attributes
- Form inputs without `<label>` associations
- Color contrast issues (report only — can't auto-test without running app)
- Keyboard navigation: any new interactive elements that aren't focusable?

**Gate**: Report-only.

---

## Phase 4: Consolidated Report

Produce a single, structured **Quality Gate Report** that the human reviewer can act on before merging.

### Report Format

```markdown
# Quality Gate Report — {branch} → {base}
**Date**: {ISO date}  **Commit range**: {short-sha}..HEAD  **Files changed**: {N}

---

## 🔴 Blockers — Must fix before merge
{List all CRITICAL/BLOCKER findings from Phase 1a and 1b}
{List any E2E test failures from Phase 2.2}
{Empty if none: "✅ No blockers found."}

## 🟠 Major — Should fix before merge
{List HIGH severity security findings}
{List MAJOR code review findings}
{List unit test failures if any}
{Empty if none: "✅ No major issues."}

## 🟡 Minor — Consider fixing
{List MEDIUM security findings}
{List MINOR/SUGGESTION code review findings}
{List LOW_COVERAGE files}
{List UX findings}
{List accessibility findings}
{Empty if none: "✅ No minor issues."}

## 📊 Test Coverage Summary
- Overall: {N}%
- New/changed code: {N}%
- E2E: {pass}/{total} scenarios passing ({N} skipped if no E2E framework)
- Smoke: {pass}/{total} pages healthy

## 🔐 Security Summary
- Secrets scan: {CLEAN / N findings}
- SAST: {N critical, N high, N medium, N low}
- Dependency audit: {N new CVEs / CLEAN}

## 📋 Recommendation
{AUTO-GENERATED based on findings:}
- If any BLOCKER: "❌ NOT READY — {N} blocker(s) must be resolved before merging."
- If MAJOR only: "⚠️ REVIEW REQUIRED — No blockers, but {N} major issue(s) warrant attention."
- If MINOR only: "✅ READY WITH NOTES — Minor issues noted. Merge at your discretion."
- If clean: "✅ CLEAR — No issues found. Safe to merge."
```

Save the report to `Docs/reports/quality-gate-{branch}-{date}.md`.

Print the report to the console. The final line output is always the **Recommendation** line.

**Gate**: always — report generation never fails the workflow. Even if a subagent errors out, the report marks that phase as `ERROR: {reason}` and continues.

---

## Failure Handling

| Failure | Action |
|---------|--------|
| Test suite fails to run | Mark Phase 2.1 as `ERROR: test runner not found`, continue |
| E2E framework not detected | Log, skip Phase 2.2, continue |
| Dev server won't start for smoke check | Skip smoke check, note in report |
| No UI files changed | Skip Phase 3 entirely |
| Subagent errors mid-review | Mark that phase section as `ERROR`, continue to next phase |
| `gh` CLI not available for branch detection | Fall back to `git branch -r`, then `main` |

**This is a report-only workflow. It never makes changes to files, branches, or the git history.**
