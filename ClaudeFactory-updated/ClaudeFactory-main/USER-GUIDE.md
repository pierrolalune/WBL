# Factory TT - User Guide

> Your entry point is always a `/command`. This guide tells you which command to use, when, and how.

---

## At a Glance

```
            YOUR SITUATION                          THE COMMAND
            ─────────────                           ───────────
     "I have a raw idea"                    ──►  /vision
     "I need to write specs"                ──►  /feature-spec
     "I want a full app from scratch"       ──►  /idea-to-app
     "I want to build a new feature"        ──►  /idea-to-feature
     "I have multiple features to ship"     ──►  /factory
     "I need a structured dev sprint"       ──►  /feature-sprint
     "I want to improve an existing feature"──►  /feature-improve
     "I want deep iterative improvement"    ──►  /improve-loop
     "I need to fix a bug"                  ──►  /tdd-cycle
     "I want to clean up code quality"      ──►  /polisher
     "I want a design system / audit"       ──►  /design-sprint
     "I need a pre-merge quality check"     ──►  /quality-gate
     "I need a security audit"              ──►  /security-audit
     "I need documentation"                 ──►  /doc-pipeline
     "I want new feature ideas"             ──►  /product-discovery
     "I want a team retrospective"          ──►  /retro
     "I want to audit the harness itself"   ──►  /audit-harness
```

---

## Commands Reference

---

### `/vision`

> Brainstorm and refine an idea interactively before committing to build anything.

**Autonomy**: Interactive - you talk, it listens, it asks one question at a time
**Input**: A raw idea in 1-4 sentences
**Agents involved**: Vision Facilitator (lead) + CEO-Founder, Architect, UX Designer, Lead Dev, Security (called in as needed)
**Output**: Feature brief, optionally saved to `factory-seeds.md`

**Phases**:
1. **UNDERSTAND** - Restates your idea, 5 Whys, scans codebase for context
2. **DREAM** - CEO challenges you to think 10x, Architect explores possibilities, UX envisions the experience
3. **GROUND** - Feasibility check, risk assessment, MVP vs full vision scope
4. **SHAPE** - Drafts feature brief collaboratively, iterates until you're satisfied
5. **DECIDE** - Add to factory seeds / generate spec / keep exploring / save for later

**When to use**:
- You have a vague idea and need to think it through
- You want to challenge your assumptions before writing specs
- You want expert perspectives (architecture, UX, security) before committing

**Typical scenarios**:
- *"J'ai une idee de logiciel, je dois la travailler avant d'ecrire des specs"* → `/vision "mon idee..."`
- *"Je veux creer un site vitrine mais je ne sais pas encore exactement ce que je veux"* → `/vision "site vitrine pour artisan, mobile-first..."`

**Example**:
```
/vision "Je veux créer un outil de gestion de devis pour les artisans.
Ils perdent du temps avec Excel, oublient de relancer les clients,
et n'ont pas de visibilité sur leur CA prévisionnel."
```

The facilitator will ask you things like:
> *"When you say artisans lose time with Excel — what's the most painful step? Creating the quote? Tracking its status? Following up?"*

**Tips**:
- Don't prepare all the answers. The point is to explore.
- Say when you disagree. It adapts.
- Run `/vision` multiple times for different aspects of the same project.
- When satisfied, it can write the brief to seeds for `/factory` or you can move to `/feature-spec`.

**Natural next step**: `/feature-spec` or `/idea-to-app`

---

### `/feature-spec`

> Turn an idea (or partial specs) into a complete, implementation-ready specification.

**Autonomy**: Autonomous
**Input**: An idea, partial specs, or a file path to existing specs
**Agents involved**: Business Analyst, Architect, UX Designer, Lead Dev
**Output**: Complete spec with user stories, acceptance criteria (Given/When/Then), UX flows, technical design, ADR

**Phases**:
1. **Feature Clarification** - BA identifies gaps, asks about persona, problem, solution
2. **Technical Design** - Architect reviews/designs architecture, produces ADR with 2+ options
3. **UX Flow Design** - UX Designer maps full user flow, defines all screen states
4. **Spec Review** - Lead Dev + Architect challenge for completeness (VETO on missing acceptance criteria, edge cases, UX states)
5. **Spec File & FP Creation** - Final spec document

**When to use**:
- You have an idea but no formal specification
- You started writing specs but they're incomplete
- Your architecture needs rethinking
- You want specs validated before coding

**Typical scenarios**:
- *"J'ai commence a ecrire des specs mais pas fini, et je dois revoir l'architecture"* → `/feature-spec "Voici mes specs en cours: [specs]. Incomplet: [ce qui manque]. L'archi doit etre revue car [raison]."`
- *"J'ai une idee, je veux des specs propres avant de coder"* → `/feature-spec "Mon idee: [description]"`

**Examples**:
```bash
# From a raw idea
/feature-spec "Systeme de notifications push pour l'app mobile. Les artisans doivent etre alertes quand un devis est accepte ou quand un client relance."

# From a file with partial specs
/feature-spec "path/to/my-partial-specs.md - specs incompletes, il manque les cas d'erreur et le modele de donnees. L'architecture REST vs GraphQL doit etre tranchee."

# Architecture-focused
/feature-spec "Revoir l'architecture du module de paiement. Actuellement monolithique, besoin de le decoupler. Specs existantes dans docs/payment-v1.md"
```

**Tips**:
- Be explicit about what's missing: "il manque les cas d'erreur", "l'API n'est pas definie"
- State architecture constraints if you have preferences
- Output includes Given/When/Then acceptance criteria, ready for TDD

**If architecture needs deeper exploration first**: Run `/vision` before `/feature-spec`

**Natural next step**: `/idea-to-feature` or `/feature-sprint`

---

### `/idea-to-app`

> Build a complete, polished application from scratch. From a 1-4 sentence idea to a fully running app.

**Autonomy**: Fully autonomous (0 human checkpoints)
**Input**: 1-4 sentences describing your app idea
**Agents involved**: 14+ (CEO-Founder, Product Manager, Architect, Dev, Lead Dev, Security, QA, UX Designer, Final User, Tech Writer, Business Analyst, DevOps, SRE...)
**Output**: Fully running, tested, polished application + deliverable report
**Isolation**: Runs in a separate worktree (won't touch your current code)
**State**: Persisted in `.claude/state/` - crash-safe, resumes from last checkpoint

**Phases**:
1. **Product Vision** - CEO applies 10-star test, names the product, defines "wow" moments
2. **Project Scaffold** - Git init, directory structure, dependencies, build tools
3. **Feature Decomposition** - PM breaks vision into features, groups into sprints, WSJF prioritization
4. **Factory Execution** - Full pipeline for each feature (spec → architecture → TDD → review → QA → docs → UX → final user gate). Minimum 50% ship rate to continue.
5. **Improvement Cycles** (3 rounds) - CX polish, Visual polish, Edge case hardening
6. **Final Polish** - Code Polisher pass on entire codebase
7. **Deliverable Report** - What was built, quality scores, architecture overview

**When to use**:
- Starting from zero - no existing codebase
- You want everything handled: from project init to polished result
- You're OK with full autonomy (no human checkpoints)

**Typical scenarios**:
- *"Je veux creer un simple site vitrine pour un artisan"* →
  ```
  /idea-to-app "Site vitrine artisan plombier Lyon. Mobile-first, SEO local
  (schema.org LocalBusiness, meta geo). Pages: accueil hero + CTA, services,
  galerie realisations, formulaire contact. Pas de base de donnees."
  ```
- *"Depuis une idee et un peu de contexte, j'ai une app"* →
  ```
  /idea-to-app "Outil de gestion de devis pour artisans. Creation depuis
  templates, envoi par email, suivi des statuts, relances auto, dashboard CA."
  ```

**More examples**:
```bash
# Creative tool
/idea-to-app "Build a browser-based digital audio workstation using Web Audio API with track mixing, effects, and waveform visualization."

# Game
/idea-to-app "Build a retro 2D game maker with sprite editor, level editor, and AI-assisted design suggestions."
```

**Tips**:
- Be specific: include constraints ("pas de BDD", "mobile-first", "Next.js static export")
- Include target audience: "pour les artisans", "for developers"
- Mention SEO/GEO requirements explicitly if relevant
- Reference example projects if they exist: "Voir Docs/ pour des exemples"
- If interrupted, re-run the same command - it resumes from where it stopped

**Natural next step**: `/improve-loop` (to iterate further) or `/quality-gate` (to verify)

---

### `/idea-to-feature`

> Build a single new feature end-to-end on an existing project, with human checkpoints.

**Autonomy**: Mostly autonomous (2 human checkpoints: story approval + deploy GO/NOGO)
**Input**: Feature idea, description, or path to a spec file
**Agents involved**: Business Analyst, Architect, UX Designer, Dev, Lead Dev (STRONG veto), Security (ABSOLUTE veto), QA, Tech Writer
**Output**: Shipped feature with tests, docs, and changelog
**Veto authorities**: Architect (STRONG), Lead Dev (STRONG), Security (ABSOLUTE)

**Phases**:
1. **Codebase Discovery** - Scans project patterns, conventions, existing code
2. **Requirement Refinement** - INVEST-compliant user stories, 5 Whys
3. **UX Design** - Component specs, states (loading/empty/error/success), accessibility, responsive
4. **Architecture & NFR** - ADR, SLOs if needed, Lead Dev review
5. **Environment Setup** - Dependencies, infrastructure, rollback plan
6. **TDD Sprint** - Strict Red-Green-Refactor, max 4 iterations, security checks each iteration
7. **Adversarial Review** - Security (ABSOLUTE veto) + Lead Dev (STRONG veto), max 2 recovery iterations
8. **E2E Validation** - QA + security testing, 80% coverage minimum
9. **Documentation** - API docs, changelog, glossary, SLOs
10. **Deploy** - **Human GO/NOGO decision**

**When to use**:
- You want to add a NEW feature to an existing project
- You want quality gates but also want control (deploy checkpoint)
- You have specs ready (or a clear enough description)

**Typical scenarios**:
- *"J'ai les specs, je dois me mettre a developper"* → `/idea-to-feature "path/to/spec.md"`
- *"Je veux creer une nouvelle feature"* → `/idea-to-feature "Ajouter un systeme de filtres avancés au dashboard. Filtres: date, statut, montant. Acceptance: [criteria]"`

**Examples**:
```bash
# From a spec file
/idea-to-feature "path/to/my-spec.md"

# Inline description
/idea-to-feature "Ajouter un systeme de notifications: alerte quand devis accepte, rappel relance apres 7j, notification nouveau message client. Doit etre temps reel (WebSocket)."

# With constraints
/idea-to-feature "Export PDF des devis. Doit inclure logo artisan, mentions legales, conditions de paiement. Contrainte: generation cote serveur pour compatibilite mobile."
```

**Tips**:
- The more context (acceptance criteria, constraints, what NOT to do), the better
- Dev agent enforces TDD: failing test first, then minimal implementation, then refactor
- Security has ABSOLUTE veto: injection, exposed secrets, broken auth = code goes back to dev
- Functions capped at 30 lines, comments explain WHY not WHAT

**Natural next step**: `/quality-gate` or `/doc-pipeline`

---

### `/factory`

> Continuous, autonomous feature delivery. Never stops. Builds feature after feature.

**Autonomy**: Fully autonomous (0 human checkpoints, never stops on its own)
**Input**: Optional feature seeds (descriptions). Without seeds, it auto-discovers features.
**Agents involved**: All 15 agents
**Output**: Shipped features, continuously
**Isolation**: Runs in a separate worktree
**State**: Persisted in `.claude/state/factory-seeds.md` + state files

**Pipeline per feature**:
1. Seed Ingestion → 2. Discovery → 3. Spec (visual design) → 4. Architecture Lock → 5. TDD Sprint (max 6 iterations) → 6. Adversarial Review → 7. E2E Validation → 8. Documentation → 9. UX & Accessibility Polish → 10. Final User Quality Gate (score >= 80/100) → 11. Ship

**When to use**:
- You have multiple features to build
- You want fully autonomous delivery with zero intervention
- You want continuous operation (it auto-discovers new features when seeds run out)

**Typical scenario**:
- *"J'ai les specs, je dois developper (multiple features)"* →
  ```
  /factory "Feature 1: Gestion de devis avec templates. Feature 2: Dashboard CA previsionnel. Feature 3: Systeme de relances automatiques."
  ```

**Tips**:
- Seeds are prioritized using WSJF (Weighted Shortest Job First)
- On failure, it skips and marks `[SKIPPED: reason]` - never halts
- CEO-Founder and Lead-Dev replace human checkpoints in autonomous mode
- Add seeds anytime by editing `.claude/state/factory-seeds.md`

**Natural next step**: `/quality-gate` or `/retro`

---

### `/feature-sprint`

> End-to-end feature development sprint with architecture phase and deploy checkpoint.

**Autonomy**: Mostly autonomous (1 human checkpoint: deploy GO/NOGO)
**Input**: Feature description or path to a spec file
**Agents involved**: Architect, Dev, Lead Dev, Security, QA, DevOps, Tech Writer

**Phases**:
1. **Architecture Design** - ADR, API contracts, data model
2. **Environment Setup** - Build tools, infrastructure, testing setup
3. **TDD Sprint** - Strict Red-Green-Refactor
4. **Adversarial Review** - Security + Lead Dev
5. **E2E Test Writing**
6. **E2E Validation** - QA + security testing
7. **Technical Documentation Update**
8. **Deploy** - **Human GO/NOGO**

**When to use**:
- You have a spec and want a structured sprint with architecture phase
- You prefer explicit deploy approval
- Similar to `/idea-to-feature` but more sprint-structured

**Example**:
```
/feature-sprint "path/to/validated-spec.md"
```

**Natural next step**: `/quality-gate`

---

### `/feature-improve`

> Safely improve an existing feature without breaking anything.

**Autonomy**: Autonomous
**Input**: Feature name + description of the improvement
**Agents involved**: Dev, Lead Dev, QA, Architect
**Focus**: Minimal-change principle, regression protection, behavior preservation

**Phases**:
1. **Feature Archaeology** - Understand current behavior completely
2. **Change Impact Analysis** - Assess blast radius, risk level
3. **Safe Implementation** - TDD with regression protection
4. **Regression Review** - Verify minimal changes, no side effects
5. **E2E Validation** - No regressions, updated tests
6. **Changelog & Documentation** - Atomic git commit

**When to use**:
- Improving an existing feature (better UX, new option, performance)
- Fixing a complex bug with potential side effects
- You need regression safety

**Typical scenarios**:
- *"Je veux ameliorer une feature"* → `/feature-improve "Dashboard - ajouter filtre par periode. Ne pas casser les graphiques existants."`
- *"Bug complexe avec impact potentiel"* → `/feature-improve "ContactForm - fix: formulaire ne soumet pas sur mobile. Attention comportement desktop."`

**Tips**:
- Always state what must NOT break
- Won't refactor surrounding code (minimal-change principle)
- For deeper improvements, use `/improve-loop` instead

**Natural next step**: `/quality-gate`

---

### `/improve-loop`

> Iterative deep improvement: 5 rotating expert angles, each generating improvement seeds built by the Factory.

**Autonomy**: Autonomous (bounded - stops after N cycles, default 5)
**Input**: Feature name + optional cycle count
**Agents involved**: Final User, Business Analyst, Architect, UX Designer, Lead Dev, Product Manager, QA, CEO-Founder
**Isolation**: Runs in a separate worktree
**State**: Persisted in `.claude/state/improve-loop-state.json`

**Rotating angles** (one per cycle):

| Cycle | Angle | Agents | Question |
|-------|-------|--------|----------|
| 1 | Customer Experience | Final User + BA | "Is this delightful to use?" |
| 2 | Feature Depth | Architect + BA | "What capabilities are missing?" |
| 3 | Visual & Interaction Polish | UX Designer + Lead Dev | "Does it look and feel right?" |
| 4 | Workflow Integration | PM + Architect | "Does it fit the bigger picture?" |
| 5 | Edge Cases & Robustness | QA + Lead Dev | "What breaks under stress?" |

Each cycle: discover improvements → CEO prioritizes → Factory builds them.

**When to use**:
- You want deep, multi-angle improvement of a feature
- After `/idea-to-app` to refine the result
- When you want systematic quality improvement from different perspectives

**Typical scenario**:
- *"Je veux ameliorer une feature en profondeur"* → `/improve-loop "the Dashboard page" 5`

**Examples**:
```bash
/improve-loop "the Dashboard page" 5     # 5 cycles (default)
/improve-loop "the Grader page" 3         # 3 cycles (lighter)
/improve-loop "Run History and filtering" 7  # 7 cycles (deep)
```

**Tips**:
- Heavy workflow (each cycle is a full factory pipeline). Control with cycle count.
- `/improve-loop "feature" 2` for light passes
- If interrupted, resumes from last checkpoint

**Natural next step**: `/quality-gate`

---

### `/tdd-cycle`

> Pure Red-Green-Refactor. Write a failing test, make it pass, clean up. Nothing else.

**Autonomy**: Autonomous
**Input**: Feature description or bug description
**Agents involved**: Dev (primary), Lead Dev (review)

**Phases**:
1. **RED** - Write failing test(s) from acceptance criteria / bug reproduction
2. **GREEN** - Minimal implementation to make tests pass
3. **REFACTOR** - Clean up without changing behavior
4. **REVIEW** - Verify tests written first, check coverage

**When to use**:
- You just need to code something with TDD discipline
- Bug fix: write test that reproduces it, then fix
- You handle architecture/review/deploy yourself

**Typical scenarios**:
- *"Je dois debugger une feature"* →
  ```
  /tdd-cycle "Bug: le bouton submit ne fonctionne pas sur mobile.
  Attendu: soumission du formulaire. Actuel: rien ne se passe.
  Repro: ouvrir sur iPhone, remplir le formulaire, cliquer submit."
  ```
- *"Je veux juste coder cette piece avec TDD"* →
  ```
  /tdd-cycle "Implement date range filter for dashboard.
  Acceptance: user selects start/end date, data filters in real-time."
  ```

**Tips**:
- For bugs: be specific (expected vs actual, steps to reproduce)
- Test MUST fail before any implementation is written
- For complex bugs needing investigation first: ask Claude directly (no command), then use `/tdd-cycle` once root cause is identified
- For bugs with broad impact, prefer `/feature-improve` (adds regression safety)

---

### `/polisher`

> Continuous, autonomous codebase quality improvement. Refactoring, type safety, test coverage, clarity.

**Autonomy**: Fully autonomous (never stops on its own)
**Input**: Optional file path or module to prioritize
**Isolation**: Runs in a separate worktree
**Output**: Improved code quality (no new features, no behavior changes)

**When to use**:
- Code quality cleanup (not new features)
- After major development to clean up
- Continuous improvement in the background

**Examples**:
```bash
/polisher                          # Polish entire codebase
/polisher "src/pages/Dashboard"    # Prioritize specific module
```

---

### `/design-sprint`

> Build or review a design system, audit the live site against it, fix design issues.

**Autonomy**: Varies
**Input**: Feature or problem to design-sprint on
**Agents involved**: UX Designer (lead), Senior Designer

**When to use**:
- Establishing a design system
- Auditing design consistency across the app
- After development, before shipping, to fix visual issues

**Example**:
```
/design-sprint "Creer un design system pour le site vitrine. Couleurs metier, typographie, composants reutilisables."
```

---

### `/quality-gate`

> Pre-merge quality check: code review + QA testing + design audit. Report only, no fixes.

**Autonomy**: Diagnostic (read-only)
**Input**: Optional branch name or PR number
**Agents involved**: Lead Dev, QA, UX Designer

**When to use**:
- Before merging code
- Before shipping (final check)
- When you want a comprehensive quality assessment without auto-fixes

**Example**:
```bash
/quality-gate                    # Current branch
/quality-gate "feature/dashboard"  # Specific branch
```

---

### `/security-audit`

> Full security audit: reconnaissance, threat modeling, exploitation testing, remediation.

**Autonomy**: Mostly autonomous
**Input**: Target scope or path
**Agents involved**: Security (lead), DevSecOps

**Phases**: Reconnaissance → STRIDE Threat Model → OWASP Top 10 Exploitation → Vulnerability Report (CVSS) → Remediation → Verification

**When to use**:
- Before shipping to production
- After adding auth/payment/data features
- Periodic security review

**Example**:
```bash
/security-audit "le module d'authentification et le formulaire de contact"
```

---

### `/doc-pipeline`

> Generate comprehensive documentation: API docs, ADRs, changelog, user guides, onboarding.

**Autonomy**: Autonomous (1 human review at the end)
**Input**: Scope or path
**Agents involved**: Tech Writer (lead), Lead Dev (review)

**Phases**: API Documentation → ADR Capture → Changelog → User Guide → Developer Onboarding → Documentation Review

**Example**:
```
/doc-pipeline "Complete documentation for the quote management system"
```

---

### `/product-discovery`

> Analyze the current project and surface new feature proposals (entirely new capabilities).

**Autonomy**: Autonomous
**Input**: Optional product area or persona to focus on
**Agents involved**: Product Manager, Business Analyst, CEO-Founder, Architect

**Phases**: Reconnaissance → Use Case Discovery → Feature Ideation → WSJF Prioritization → Report

**Example**:
```
/product-discovery "focus on the artisan mobile experience"
```

**Natural next step**: `/factory` (to build discovered features)

---

### `/retro`

> Weekly engineering retrospective: commit analysis, LOC/test ratios, PR sizes, team insights.

**Autonomy**: Autonomous
**Input**: None
**Agent**: Engineering Manager

---

### `/audit-harness`

> Diagnostic audit of the Factory harness itself. Identifies redundant, orphaned, or counterproductive components.

**Autonomy**: Diagnostic (Phase 5 removal requires human approval)
**Input**: None
**When to use**: After major model upgrades or when the harness feels bloated

---

## Decision Tree

```
What do you need?
│
├─ THINK about an idea ──────────────────── /vision
│
├─ WRITE specifications ─────────────────── /feature-spec
│
├─ BUILD from scratch (full app) ────────── /idea-to-app
│
├─ BUILD a new feature (existing project)
│  ├─ Single feature, want control ──────── /idea-to-feature
│  ├─ Single feature, structured sprint ─── /feature-sprint
│  ├─ Multiple features, autonomous ─────── /factory
│  └─ Just code it (TDD only) ──────────── /tdd-cycle
│
├─ FIX a bug
│  ├─ Simple, isolated bug ─────────────── /tdd-cycle
│  └─ Complex, risky fix ──────────────── /feature-improve
│
├─ IMPROVE an existing feature
│  ├─ Targeted, safe change ────────────── /feature-improve
│  ├─ Deep, multi-angle improvement ────── /improve-loop
│  └─ Code quality only ───────────────── /polisher
│
├─ REVIEW / AUDIT
│  ├─ Pre-merge check ─────────────────── /quality-gate
│  ├─ Security ────────────────────────── /security-audit
│  └─ Design system ───────────────────── /design-sprint
│
├─ DOCUMENT ─────────────────────────────── /doc-pipeline
│
├─ DISCOVER new feature ideas ───────────── /product-discovery
│
└─ RETROSPECTIVE ────────────────────────── /retro
```

---

## Common Pipelines

### From zero to app (careful path)
```
/vision → /feature-spec → /idea-to-app
```

### From zero to app (fast path)
```
/idea-to-app "complete description with constraints"
```

### New feature on existing project (careful path)
```
/vision → /feature-spec → /idea-to-feature → /quality-gate
```

### New feature on existing project (fast path)
```
/idea-to-feature "complete description with acceptance criteria"
```

### Multiple features sprint
```
/factory "seed1. seed2. seed3."
```

### Iterative improvement
```
/improve-loop "feature" 5 → /quality-gate → /doc-pipeline
```

### Pre-ship quality
```
/quality-gate → /security-audit → /doc-pipeline
```

---

## Agents & Veto Hierarchy

Every command orchestrates multiple agents. Here's who has power to block:

| Priority | Agent | Veto | Blocks on |
|----------|-------|------|-----------|
| 1 | **Security** | ABSOLUTE | Injection, exposed secrets, broken auth |
| 2 | **Architect** | STRONG | Architecture violations |
| 3 | **Lead Dev** | STRONG | Code quality, TDD compliance, KISS |
| 4 | **UX Designer** | BLOCKING | Accessibility (WCAG 2.1 AA) violations |
| 5 | **Final User** | STRONG | Score < 80/100 = REVISE, < 60 = REJECT |

---

## Quality Bar (enforced automatically)

- TDD mandatory: failing test first, always
- 80% minimum test coverage
- Functions max 30 lines
- No `any` in TypeScript, no `.unwrap()` in Rust
- Every feature scored /100 by Final User before shipping
- Mobile-first responsive: 375px → 768px → 1280px
- WCAG 2.1 AA accessibility compliance

---

## State & Recovery

| Command | State location | Recovery |
|---------|---------------|----------|
| `/factory` | `.claude/state/factory-seeds.md` | Re-run to resume |
| `/idea-to-app` | `.claude/state/` | Re-run to resume |
| `/improve-loop` | `.claude/state/improve-loop-state.json` | Re-run to resume |

Commands that run in **isolated worktrees**: `/factory`, `/idea-to-app`, `/polisher`, `/improve-loop`
These won't affect your current working branch.
