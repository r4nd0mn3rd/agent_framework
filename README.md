# Pocket Dev — Solo Agent Development Framework

> **Framework Version**: 1.0.0
> **Package**: `pocket-dev`
> **Status**: Active

A framework and toolchain that lets **one developer plus AI agents** take a
product from idea to production-ready code — with standardized artifacts,
quality gates, and a live Kanban board.

## Why Pocket Dev

- **End-to-end coverage**: Discovery → Specification → Design →
  Implementation → Verification.
- **Agent-friendly**: unambiguous tasks agents can execute independently.
- **Quality gates**: objective checkpoints before any phase proceeds.
- **Reusable patterns**: proven approaches for common problems.
- **CLI + board**: `pocket-dev` commands and an interactive TypeScript
  Kanban board.

## Quick Start

Install dependencies and build:

```bash
npm install
npm run build
```

Run the framework checker:

```bash
npm run pocket-dev -- validate   # or: node packages/cli/dist/index.js validate
```

Serve the Kanban board:

```bash
node packages/cli/dist/index.js board --open
```

Initialize agent integration (Claude / OpenCode / Vibe):

```bash
node packages/cli/dist/index.js init            # interactive
node packages/cli/dist/index.js init --integration claude
```

## Pocket Dev CLI

See `docs/POCKET-DEV.md` for the full reference. Commands:

| Command | Purpose |
|---------|---------|
| `pocket-dev init` | Scaffold integration for Claude, OpenCode, or Vibe |
| `pocket-dev status` | Project name, phase, and task counts |
| `pocket-dev validate` | Run framework consistency checks |
| `pocket-dev deps` | Check build/test tooling availability |
| `pocket-dev board` | Serve the interactive Kanban board |

## Kanban Board

![Kanban board](docs/assets/kanban-board.png)

Tasks are loaded from `.pocket-dev/state.json`; when empty the board falls back
to 26 bundled demo tickets across the 6 phases. Tiles are grouped by status
(Pending, In Progress, Blocked, Completed, Cancelled). Click a tile for open
items, next steps, and action buttons (Start, Continue, move to next status).

## Framework Structure

```
agent_framework/
├── README.md
├── GETTING-STARTED.md
├── SUMMARY.md
├── docs/POCKET-DEV.md          # CLI + board guide
├── docs/assets/                # screenshots
├── packages/                   # CLI, board, shared models
├── .pocket-dev/                # installed framework docs/templates
│   ├── 00-constitution/
│   ├── 01-governance/
│   ├── ...
│   └── GETTING-STARTED.md
├── 07-examples/pocket-dev-module/   # (source in repo root)
└── skill/
```

## How to Use

### New Features

1. Start with ideation (.pocket-dev/`02-methodology/`)
2. Run discovery checklist
3. Fill spec template (.pocket-dev/`04-templates/spec-template.md`)
4. Pass Gate 0 (.pocket-dev/`02-methodology/checkpoints/gate-00.md`)
5. Progress through phases and gates

### Agents

1. Load relevant phase docs from .pocket-dev/`02-methodology/`
2. Use templates from `04-templates/`
3. Validate against `05-checklists/`
4. Follow `03-standards/`
5. Document decisions per `01-governance/`

## Installation (Framework)

```bash
git clone https://github.com/r4nd0mn3rd/agent_framework.git
cd agent_framework
./install.sh /path/to/your/project
```

Installed layout lives under `.pocket-dev/` (framework docs and templates) plus
`.pocket-dev/state.json`. Manual install: run `./install.sh`, or
`npm install -g .` then `pocket-dev init .`.

## Key Documents

| Purpose | Document |
|---------|----------|
| Getting started | `GETTING-STARTED.md` |
| Framework summary | `SUMMARY.md` |
| CLI & board | `docs/POCKET-DEV.md` |
| Constitution | .pocket-dev/`00-constitution/constitution.md` |
| Process overview | .pocket-dev/`02-methodology/process-overview.md` |
| Spec template | .pocket-dev/`04-templates/spec-template.md` |
| Example module | `07-examples/pocket-dev-module/` |

## Success Metrics

- A solo developer + agents complete a feature with zero ambiguity
- All artifacts meet defined quality criteria without manual review
- The process is repeatable across features
- Quality gates catch issues before they propagate

## Relationship to Constitution

This framework extends the Solo Agent Development Framework constitution.
.pocket-dev/`00-constitution/constitution.md` takes precedence on conflict.
