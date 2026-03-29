# Code Polisher Workflow

Fully autonomous, self-looping pipeline that continuously reviews and perfects the codebase — without human intervention. Runs multi-pass analysis on every source file, applies improvements through TDD-safe refactoring, and tracks quality scores over time.

---

## Phase 0: Init / Resume

Read `.claude/state/polisher-state.json`.

### Fresh Start (state file absent or `status` is `completed` / `stalled`)

1. Parse `$ARGUMENTS` — optional file path or module name to prioritize.
2. Glob all source files; build the full polish queue (see Phase 1).
3. Write initial state:

```json
{
  "pipeline": "code-polisher",
  "status": "running",
  "priority_target": "<$ARGUMENTS or null>",
  "queue": [],
  "current_group": null,
  "completed_groups": [],
  "metrics": {
    "groups_polished": 0,
    "groups_skipped": 0,
    "groups_reverted": 0,
    "avg_score_before": 0,
    "avg_score_after": 0,
    "total_commits": 0
  },
  "started_at": "<ISO-8601>",
  "last_update": "<ISO-8601>"
}
```

### Resume (state exists and `status` is `running`)

Read state. If `current_group` is set, the previous run was interrupted — re-run that group from Phase 3. Otherwise, pop the next group from `queue` (Phase 2).

**Stall detection**: If the last 5 consecutive groups were all reverted (score < 60), set `status: "stalled"`, write a summary to `Docs/reports/polisher-stall-{date}.md`, and STOP. The codebase may need human-directed architectural work before automated polishing can help.

**Gate**: always.

---

## Phase 1: Build / Refresh Polish Queue

Run when the queue is empty or on fresh start.

### 1.1 — File Discovery

Glob source files. **Include**:
- `**/*.ts`, `**/*.tsx`, `**/*.js`, `**/*.jsx`
- `**/*.py`, `**/*.rb`, `**/*.go`, `**/*.rs`
- `**/*.css`, `**/*.scss`

**Exclude** (never polish these):
- `node_modules/`, `dist/`, `build/`, `.next/`, `coverage/`
- `**/*.min.js`, `**/*.generated.*`, `**/schema.rb`, `**/migrations/**`
- `.claude/state/**`, `**/*.lock`, `**/*.snap`
- Test fixtures and seed files (`**/fixtures/**`, `**/seeds/**`)

### 1.2 — Priority Scoring (lower = higher priority in queue)

For each file, compute a **polish priority score**:

| Signal | Weight |
|--------|--------|
| Last polished > 14 days ago (or never) | −20 |
| Last modified in the last 7 days | −15 (recently touched = regressions possible) |
| File has no corresponding test file | −10 |
| File size > 200 lines | −8 (larger = more complexity debt) |
| File contains TODO / FIXME / HACK / XXX | −5 per occurrence (capped at −20) |
| File was skipped or reverted in last polisher run | +30 (cool-down — deprioritize) |

Sort ascending (most negative = polished first).

If `$ARGUMENTS` names a specific file or module, move all matching files to the front of the queue.

### 1.3 — Group Formation

Group related files together so polish is applied holistically:

- A component file (`Button.tsx`) groups with its test (`Button.test.tsx`) and its types (`Button.types.ts`).
- A service (`auth.service.py`) groups with its test (`test_auth_service.py`) and its interface/schema file.
- Standalone utility files that share the same directory group together (max 4 files per group).
- If no related files are found, a file forms a single-file group.

Max group size: **5 files**. Larger modules split into logical sub-groups.

Write the ordered group list to `queue` in state. Each entry:

```json
{
  "group_id": "PG-001",
  "files": ["src/components/Button.tsx", "src/components/Button.test.tsx"],
  "priority_score": -35,
  "last_polished": null,
  "skip_reason": null
}
```

**Gate**: always — queue building is a read-only operation, never blocks.

---

## Phase 2: Pop Next File Group

1. Pop the highest-priority (lowest score) group from `queue` with `status: null`.
2. If queue is empty: trigger Phase 1 to rescan. If rescan also produces 0 unpolished groups, set `status: "completed"` and STOP.
3. Set `current_group` in state. Record `started_at` timestamp.

**Gate**: always.

---

## Phase 3: Snapshot (Pre-Polish Baseline)

Before touching anything:

1. Record the current git HEAD SHA: `git rev-parse HEAD` → store as `current_group.baseline_sha`.
2. Run the test suite scoped to the group's files to establish a **green baseline**:
   - TypeScript/Vitest: `npx vitest run <file>`
   - Jest: `npx jest --testPathPattern=<file>`
   - Pytest: `pytest <file>`
   - RSpec: `bundle exec rspec <file>`

   If tests are already failing at baseline: **skip this group**. Log `skip_reason: "pre_existing_test_failure"`. Move to Phase 2.

3. Capture pre-polish metrics:
   - Line count per file
   - TODO/FIXME count
   - Linter warning count (check mode only — do not auto-fix yet)
   - Test count and coverage if available

**Gate**: baseline_green — hard stop on pre-existing test failure for this group.

---

## Phase 4: Analysis Pass (Parallel)

Run three analyses simultaneously. Each is a read-pass only — no changes yet.

### 4a — Code Review (Lead Dev lens)

Using the `code-review-excellence` skill, scan the group for:
- **Correctness issues**: uncovered edge cases, missing error handling, off-by-one errors
- **Performance**: N+1 patterns, unnecessary re-renders, missing memoization, blocking calls in async paths
- **Maintainability**: functions > 30 lines, deeply nested conditionals (> 3 levels), duplicated logic, poor naming, magic numbers
- **Type safety**: `any` usage (TS), missing return types, untyped params
- **Test gaps**: public functions without tests, uncovered edge cases

Classify each finding:
- `SAFE_TO_AUTO_FIX` — mechanical, no behavior change risk (rename, extract constant, add type annotation)
- `TDD_REQUIRED` — must write/update a test first before changing code
- `SKIP` — too risky for autonomous polishing (algorithmic changes, auth logic, payment flows, concurrency)

### 4b — Test Quality (QA lens)

Using the `tdd-mastery` skill:
- Tests with zero assertions
- Tests that mock everything (testing nothing)
- Missing negative test cases (only happy path)
- `test.skip` / `xit` occurrences — log but never remove autonomously
- Missing E2E coverage for user-critical paths

### 4c — Linter Auto-Fix

Run the project's linter in auto-fix mode:
```bash
npx eslint --fix <files>       # JS/TS
ruff check --fix <files>       # Python
rubocop -a <files>             # Ruby
cargo fmt <files>              # Rust
gofmt -w <files>               # Go
```

Capture which lines were changed. These are purely stylistic and do not require a TDD cycle.

### 4d — UX Spot-Check (frontend groups only)

**Trigger**: Only when the group contains at least one file matching `*.tsx`, `*.jsx`, `*.vue`, `*.html`, `*.css`, or `*.scss`.

Launch a **ux-designer subagent** (`subagent_type: "ux-designer"`, model: `sonnet`) with this task:

> You are doing a quick UX spot-check on these files as part of an automated polishing run. This is code-level review only — no running app needed. Be fast and precise.
>
> For each UI file in the group:
> 1. **States**: Does every interactive component have `loading`, `error`, and `empty` states? If any are missing, flag as `MISSING_STATE`.
> 2. **Hardcoded values**: Any hardcoded colors (`#hex`, `rgb()`), hardcoded spacing (`px` values not from a variable/token), or hardcoded font sizes? Flag as `HARDCODED_VALUE`.
> 3. **Accessibility**: Any interactive element (button, link, input, icon-button) missing `aria-label`, `role`, or a visible text label? Any form input without a `<label>`? Flag as `A11Y_MISSING`.
> 4. **Microcopy**: Any button labeled "Submit", "OK", "Click here", or "Button"? Any error message that says "Something went wrong" or "Error"? Flag as `WEAK_MICROCOPY`.
> 5. **AI slop**: Any of these patterns: purple/violet gradients, icons in colored circles, centered-everything layout, uniform bubbly border-radius, decorative blobs, emoji as design elements? Flag as `AI_SLOP`.
>
> Output ONLY a list of findings in this format:
> `[SEVERITY] [file:line] TYPE: description — suggested fix`
>
> Severity: `BLOCKING` (missing state, hardcoded value, a11y) or `STYLE` (microcopy, slop).
> If no findings: output `[CLEAN]`.

Store findings in state as `current_group.ux_findings`. Pass BLOCKING findings to Phase 5 — the Dev subagent must fix them before the Evaluator Gate.

**If no frontend files in group**: skip this step entirely, set `current_group.ux_findings: "N/A"`.

**Gate**: always — UX analysis is read-only.

---

## Phase 5: Polish Pass (Dev Agent)

Launch a **dev subagent** (`subagent_type: "dev"`, model: `sonnet`).

Apply fixes in this strict order:

**Round 0 — UX Blocking fixes** (from Phase 4d — run BEFORE linter):
For each `BLOCKING` finding from the UX spot-check:
- Add missing state (e.g., add `if (isLoading) return <Skeleton />` or an error boundary)
- Replace hardcoded values with the appropriate design token variable
- Add missing `aria-label` or `<label>` association
- Rewrite weak microcopy (e.g., `"Submit"` → `"Save Project"`, `"Something went wrong"` → `"Failed to load — check your connection and try again"`)

After each UX fix: run tests. If a test breaks (unlikely for UX fixes but possible), revert that specific fix and mark `revert_reason: "test_broke_on_ux_fix"`.

**Round 1 — Linter fixes** (already applied in Phase 4c — verify they are in the working tree):
- Run tests: all must still be green. If any failed, revert linter changes on the failing file.

**Round 2 — SAFE_TO_AUTO_FIX items**:
Apply each finding one at a time:
- After each change: run the test suite. If it breaks, **revert that single change** and mark `revert_reason: "test_broke"`.

**Round 3 — TDD_REQUIRED items**:
For each finding:
1. **RED**: Write a failing test capturing the missing behavior or edge case.
2. **GREEN**: Implement the minimal fix to pass the test.
3. **REFACTOR**: Clean up, re-run all tests.

If a new test causes an existing test to break: revert, mark `revert_reason: "regression_risk"`.

**Round 4 — Test quality improvements**:
- Add missing assertions to empty tests.
- Add one negative test case per public function with only happy-path coverage.
- Never remove existing tests.

**Hard limits per group**:
- Max wall time: 20 minutes
- Max files changed: 6 (if more are touched, scope-creep — stop and log)
- Never touch files outside the group; if a fix requires a shared utility, log it as `cross_group_dependency` and skip
- Never change logic in `SKIP`-classified items
- Never modify test expectations to make failing tests pass — fix the code

**Output**:
```
STATUS: COMPLETE | PARTIAL | BLOCKED
FILES_CHANGED: list of files and what changed
TESTS_BEFORE / TESTS_AFTER: counts
ITEMS_APPLIED / ITEMS_REVERTED / ITEMS_SKIPPED: counts with brief reasons
```

**Gate**: all tests green after each round. Any red test = revert that specific change.

---

## Phase 6: Evaluator Gate (Final User Agent)

Launch a **final-user subagent** (`subagent_type: "final-user"`, model: `sonnet`).

Score the polished diff across 5 dimensions (20 points each, total 100):

| Dimension | What to evaluate |
|-----------|-----------------|
| **Code Clarity** | Readable? Well-named? Self-documenting? |
| **Test Quality** | Tests are meaningful, cover edge cases, follow AAA pattern? |
| **Type Safety** | No `any`, no implicit types, errors are typed? |
| **Error Handling** | Every failure path handled? No silent swallows? |
| **Polish Delta** | Is this meaningfully better than before — or just noise? |

**For groups with frontend files**, replace the **Polish Delta** dimension with **UX Quality** (same 20 points):

| Dimension | What to evaluate |
|-----------|-----------------|
| **UX Quality** | All states present (loading/error/empty)? No hardcoded values? Aria labels on interactive elements? Microcopy is specific and helpful? No AI slop patterns? |

Check `current_group.ux_findings` — if any `BLOCKING` findings remain unfixed, cap UX Quality at 8/20 regardless of other improvements.

**Verdict thresholds**:
- **Score ≥ 80** (`APPROVE`): commit with `polish:` prefix.
- **Score 60–79** (`PARTIAL_APPROVE`): commit with `polish(partial):` prefix. Log weaknesses for next pass.
- **Score < 60** (`REJECT`): revert all changes. Log as `reverted_low_score`. Group re-enters queue with +30 deprioritization penalty.

**Special case — linter-only output**: If the diff is only formatting/style (all AI rounds were skipped or reverted), commit with `style:` prefix. No Final User scoring needed.

**Gate**: score >= 60 to commit anything beyond linter-only fixes.

---

## Phase 7: Commit & State Update

### If APPROVE or PARTIAL_APPROVE:

```bash
git add <changed-files>
git commit -m "<prefix>(<scope>): polish {files_summary}

Polisher score: {score}/100
Applied: {N} | Reverted: {M} | Skipped: {K}
Dimensions: Clarity {a}/20 | Tests {b}/20 | Types {c}/20 | Errors {d}/20 | Delta {e}/20"
```

Prefix mapping: `polish:` (≥ 80), `polish(partial):` (60–79), `style:` (linter-only).

### If REJECT:

```bash
git checkout -- <changed-files>   # revert all group changes
```

Do NOT commit. Log the rejection. Update `metrics.groups_reverted++`.

### Always:

Clear `current_group`. Update `last_update`. Loop back to **Phase 2**.

---

## Audit Trail

Every polisher run appends to `.claude/state/polisher-audit-trail.json`:

```json
{
  "run_date": "ISO-8601",
  "group_id": "PG-007",
  "files": ["src/utils/date.ts", "src/utils/date.test.ts"],
  "verdict": "APPROVE",
  "score_after": 84,
  "items_applied": 5,
  "items_reverted": 1,
  "items_skipped": 2,
  "commit_sha": "abc1234",
  "duration_seconds": 312
}
```

The evaluator calibration skill reads `polisher-audit-trail.json` to detect if the Final User agent is systematically over- or under-scoring polished code.

---

## Integration with Factory Dashboard

When `metrics.groups_polished % 10 === 0`, emit a polisher summary block:
- Top 5 most frequently polished files (quality debt hotspots)
- Average score improvement per pass
- Most common skip reason (signals architectural problem areas)

---

## Failure Handling

| Failure | Action |
|---------|--------|
| Baseline tests already failing | Skip group → `pre_existing_test_failure` |
| Dev subagent exceeds 20 min | Terminate, revert all, skip → `timeout` |
| Dev changes > 6 files | Revert excess files, continue with ≤ 6 |
| Cross-group dependency needed | Log finding, skip the fix, continue |
| Final User score < 60 | Revert all AI changes, do not commit |
| 5 consecutive group rejections | Set `status: stalled`, stop pipeline |
| Linter fails to run | Skip linter round, continue with AI rounds |

**Never halt the pipeline for a single group failure.** Always move to the next group.
