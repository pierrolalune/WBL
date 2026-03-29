# Factory Harness -- New Project Setup Guide

## Quick Start (5 minutes)

### Step 1: Copy the harness into your project

```bash
# From your new project root:
cp -r /path/to/Factory/TT/.claude .claude
cp /path/to/Factory/TT/.mcp.json .mcp.json
cp -r /path/to/Factory/TT/tools tools
cp /path/to/Factory/TT/TEMPLATE_CLAUDE.md TEMPLATE_CLAUDE.md
```

### Step 2: Install MCP tools

```bash
cd tools/factory-mcp-server
npm install
cd ../..
```

### Step 3: Generate your CLAUDE.md

Copy the template and fill in the placeholders:

```bash
cp TEMPLATE_CLAUDE.md CLAUDE.md
```

Edit `CLAUDE.md` and replace:
- `{{PROJECT_NAME}}` -- your project name (e.g., "Acme Dashboard")
- `{{DESCRIPTION}}` -- one-line description (e.g., "Real-time analytics dashboard for Acme Corp")
- `{{TECH_STACK}}` -- stack details (e.g., "Next.js 15, TypeScript, Tailwind CSS, Prisma, PostgreSQL")
- `{{PROJECT_STRUCTURE}}` -- your directory layout
- `{{PROJECT_CONVENTIONS}}` -- project-specific rules (e.g., "Components in src/components/, API routes in src/app/api/")
- `{{DEVELOPMENT_NOTES}}` -- anything else Claude should know

### Step 4: Initialize state directory

```bash
mkdir -p .claude/state
touch .claude/state/factory-seeds.md
```

### Step 5: (Optional) Load optional skills

If your project needs regulatory compliance:

```bash
# For EU/French projects:
cp .claude/skills/optional/rgpd-audit-skill-prompt.md .claude/skills/
cp .claude/skills/optional/droit-du-numérique-skill-prompt.md .claude/skills/

# For green IT requirements:
cp .claude/skills/optional/green-it-numérique-responsable-skill-prompt.md .claude/skills/

# For AI ethics requirements:
cp .claude/skills/optional/éthique-ia-skill-prompt.md .claude/skills/
```

If your project needs archived specialized skills:

```bash
# Example: restore database design skill for a data-heavy project
cp .claude/skills/archived/database-design.md .claude/skills/

# Example: restore pentest skills for a security-critical project
cp .claude/skills/archived/pentest-web-owasp-top-10-testing-methodology.md .claude/skills/
cp .claude/skills/archived/pentest-infrastructure-network-container-cloud-security.md .claude/skills/
```

### Done. Start building.

---

## What's Included

### Directory Structure After Setup

```
your-project/
  .claude/
    agents/          # 15 agent personas
      architect.md
      business-analyst.md
      ceo-founder.md
      dev.md
      devops.md
      engineering-manager.md
      final-user.md
      lead-dev.md
      product-manager.md
      qa-tester.md
      security.md
      sre.md
      tech-writer.md
      ux-designer.md
      vision-facilitator.md
    commands/         # 18 slash commands
      factory.md          # /factory
      idea-to-app.md      # /idea-to-app
      idea-to-feature.md  # /idea-to-feature
      improve-loop.md     # /improve-loop
      dashboard.md        # /dashboard
      ...
    skills/           # 25 active skills
      tdd-mastery.md
      code-review-excellence.md
      security-audit.md
      triage-router.md        # NEW: complexity classification
      cross-feature-learning.md  # NEW: learns from past features
      factory-dashboard.md      # NEW: observability
      ...
      optional/       # Project-dependent skills
      archived/       # Unused but available skills
      workflows/      # 17 workflow orchestrations
        feature-factory-workflow.md
        idea-to-feature-workflow.md
        idea-to-app-workflow.md
        ...
    settings.local.json  # Permissions + hooks
    state/            # Runtime state (created at Step 4)
      factory-seeds.md
  .mcp.json           # MCP server config
  tools/
    factory-mcp-server/  # State management tools
  CLAUDE.md           # Project context (generated from template)
```

---

## How to Use

### Build a complete app from scratch

```
/idea-to-app "A task manager with AI-powered prioritization and natural language input"
```

This runs the full pipeline autonomously: vision -> scaffold -> decompose -> build features -> improve -> polish -> report.

### Add a feature to an existing project

```
/idea-to-feature "Add dark mode toggle with system preference detection"
```

Human-in-the-loop mode: you approve requirements (Phase 2) and deploy (Phase 10).

### Ship features continuously

Add your ideas to `.claude/state/factory-seeds.md`:

```markdown
- Add export to CSV for all data tables
- Implement real-time notifications via WebSocket
- Add keyboard shortcuts for power users
```

Then run:

```
/factory
```

The factory picks them up in order, builds, tests, reviews, and ships each one autonomously.

### Improve an existing feature

```
/improve-loop "the dashboard page" 3
```

Runs 3 improvement cycles with rotating perspectives (CX, depth, polish, integration, robustness).

### Quick quality check before merging

```
/quality-gate
```

Report-only: code review + QA + design audit. No changes made.

### Brainstorm before building

```
/vision "I want to add collaborative editing but I'm not sure about the approach"
```

Interactive session with the Vision Facilitator. Outputs a feature brief that can feed into `/factory`.

### Check pipeline health

```
/dashboard
```

Shows: shipped/skipped counts, score trends, bottleneck phases, alerts.

---

## How Features Get Classified

Every feature goes through triage before any work starts:

| Tier | What triggers it | What happens |
|------|-----------------|--------------|
| **PATCH** | "fix typo", "change color", single-file change | Dev -> Lead Dev + Security -> Ship (fast lane) |
| **MINOR** | 2-10 files, no migration/auth change | Full pipeline, fewer TDD rounds, skip contract negotiation |
| **MAJOR** | DB migration, new auth, external API, 10+ files | Full pipeline, all agents, voting on Final User score |

Lead Dev can escalate a PATCH to MINOR or MAJOR if the blast radius is larger than expected.

---

## Configuration

### Settings (`.claude/settings.local.json`)

```json
{
  "permissions": {
    "allow": [...]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash(git commit*)",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c '...pre-commit guard...'"
          }
        ]
      }
    ]
  }
}
```

The pre-commit hook blocks:
- Committing `.claude/state/*.json` (state files should not be in version control)
- Committing files matching `.env`, `.pem`, `.key`, `credentials`, `secret`

### MCP Server (`.mcp.json`)

The factory MCP server provides 6 tools for atomic state management:
- `factory_state_read` / `factory_state_update` -- read/write pipeline state
- `backlog_pop` / `backlog_update_status` -- manage feature backlog
- `seed_mark_done` -- track seed progress
- `phase_timer` -- collect phase timing metrics

The server must be launched from the project root (it resolves `.claude/state/` relative to `cwd`).

---

## What to .gitignore

Add to your `.gitignore`:

```
# Factory runtime state (regenerated each run)
.claude/state/factory-state.json
.claude/state/feature-backlog.json
.claude/state/factory-learnings.json
.claude/state/final-user-reports.json
.claude/state/calibration-amendments.md
.claude/state/improve-loop-state.json
.claude/state/idea-to-app-state.json

# Keep factory-seeds.md tracked (your feature ideas)
# !.claude/state/factory-seeds.md

# MCP server dependencies
tools/factory-mcp-server/node_modules/
```

**DO commit**: `.claude/agents/`, `.claude/skills/`, `.claude/commands/`, `.claude/settings.local.json`, `.mcp.json`, `CLAUDE.md`, `.claude/state/factory-seeds.md`

**DO NOT commit**: `.claude/state/*.json` (runtime state), `node_modules/`

---

## Cheat Sheet

| I want to... | Command |
|-------------|---------|
| Build an app from scratch | `/idea-to-app "brief idea"` |
| Add one feature (with human gates) | `/idea-to-feature "feature idea"` |
| Ship features autonomously | Add to `factory-seeds.md`, then `/factory` |
| Improve an existing feature | `/improve-loop "target" N` |
| Quick pre-merge check | `/quality-gate` |
| Brainstorm an idea | `/vision "rough idea"` |
| Run a single TDD cycle | `/tdd-cycle "bug or feature"` |
| Generate docs | `/doc-pipeline` |
| Security audit | `/security-audit` |
| Check pipeline health | `/dashboard` |
| Weekly team retro | `/retro` |
| Audit the harness itself | `/audit-harness` |
