# Solo Agent Development Framework

> **Framework Version**: 1.0.0
> **Last Updated**: 2026-10-29
> **Status**: Active

## Purpose

This framework enables **a single developer working with AI agents** to **completely plan, design, specify, and implement** an application from idea to production-ready code.

It provides:
- **Complete process coverage**: Discovery → Specification → Design → Implementation → Verification
- **Standardized artifacts**: Every deliverable has defined structure, quality criteria, and review gates
- **Agent-friendly instructions**: Clear, unambiguous tasks that agents can execute independently
- **Quality gates**: Objective checkpoints that must be passed before proceeding
- **Reusable patterns**: Proven approaches for common problems

## Framework Structure

```
agent_framework/
├── README.md
├── GETTING-STARTED.md
├── SUMMARY.md
├── LICENSE
├── install.sh
├── package.json
│
├── .opencode/                      # OpenCode TUI integration
│   ├── commands/
│   │   └── framework.md           # /framework slash command
│   └── skills/
│       └── home-dash-framework-manager/
│           └── SKILL.md            # Framework manager skill
│
├── .framework/                     # Per-project state (gitignored)
│   ├── state.json
│   ├── tasks/
│   └── sessions/
│
├── specs/                          # Feature artifacts (per feature)
│
├── 00-constitution/
│   └── constitution.md             # Core principles
│
├── 01-governance/
│   ├── decision-process.md
│   └── cross-dependencies.md       # Cross-dependency management
│
├── 02-methodology/
│   ├── process-overview.md         # 6-phase, 6-gate workflow
│   └── checkpoints/
│       └── gate-00.md              # Gate definitions
│
├── 03-standards/
│   ├── README.md                   # Standards index
│   ├── swift/coding-standard.md
│   ├── python/coding-standard.md
│   ├── javascript-typescript/coding-standard.md
│   ├── java-kotlin/coding-standard.md
│   ├── go/coding-standard.md
│   ├── rust/coding-standard.md
│   ├── csharp/coding-standard.md
│   └── ui/design-standard.md       # UI design standard
│
├── 04-templates/
│   └── spec-template.md            # Feature specification template
│
├── 05-checklists/
│   ├── gate-02-checklist.md
│   └── cross-dependency-checklist.md
│
├── 06-automation/
│   └── agents/
│       └── spec-agent.md
│
└── skill/                          # Original Vibe CLI skill package
    ├── SKILL.md
    ├── README.md
    └── INSTALL.md
```



## Installation

### OpenCode (TUI) — recommended

1. Clone this repository into your project (or run the installer):
   ```bash
   git clone https://github.com/r4nd0mn3rd/agent_framework.git
   cd agent_framework
   ./install.sh /path/to/your/project
   ```
2. Open your project with OpenCode:
   ```bash
   cd /path/to/your/project
   opencode
   ```
3. In the TUI, invoke the framework:
   ```
   /framework
   ```

The installer copies the framework docs, the OpenCode skill, and the `/framework`
slash command, and initializes `.framework/` state storage. Existing state and
specs are never overwritten.

### Manual install

Copy these into your project root:
- `00-constitution/`, `01-governance/`, `02-methodology/`, `03-standards/`,
  `04-templates/`, `05-checklists/`, `06-automation/`
- `.opencode/skills/home-dash-framework-manager/`
- `.opencode/commands/framework.md`
- Create `.framework/{tasks,sessions}/` and `.framework/state.json`

Then run `opencode` and use `/framework`.

---
## How to Use This Framework

### For New Features

1. **Start with Ideation**: Use `02-methodology/phases/00-ideation/` to refine your idea
2. **Run Discovery**: Execute the discovery phase checklist
3. **Create Specification**: Fill out the spec template from `04-templates/`
4. **Pass Gate 0**: Verify against `02-methodology/checkpoints/gate-00.md`
5. **Proceed through phases**: Each phase has its own checklist and gate

### For Agents

Agents should:
1. Load the relevant phase documentation from `02-methodology/phases/`
2. Use templates from `04-templates/` for all deliverables
3. Validate against checklists in `05-checklists/`
4. Follow standards in `03-standards/`
5. Document decisions in accordance with `01-governance/`

### Quick Start

```bash
# Navigate to the framework
cd solo-agent-framework

# Review the constitution first
cat 00-constitution/constitution.md

# Start with ideation phase
open 02-methodology/phases/00-ideation/README.md
```

## Framework Evolution

This framework evolves through:
1. **Lessons learned** from each completed feature
2. **Agent feedback** on clarity and completeness
3. **Standard updates** as technologies change

Changes follow the process defined in `01-governance/changes.md`.

## Relationship to Project Constitution

This framework **extends and operationalizes** the Solo Agent Development Framework constitution. Where they conflict:
1. This framework's constitution (`00-constitution/constitution.md`) takes precedence
2. It incorporates all existing constitution principles
3. It adds detailed operational guidance

The project constitution at `.specify/memory/constitution.md` remains in effect but is superseded by this framework's constitution for new work.

## Success Metrics

The framework is successful when:
- A single developer + agents can complete a feature with **zero ambiguity**
- All artifacts meet **defined quality criteria** without manual review
- The process is **repeatable** across different features
- **Quality gates** catch issues before they propagate
- The time from idea to production is **predictable and minimized**

---

## Index of Key Documents

| Purpose | Document | Location |
|---------|----------|----------|
| Core principles | Constitution | `00-constitution/constitution.md` |
| Decision process | How decisions are made | `01-governance/decision-process.md` |
| Agent roles | What agents do | `01-governance/roles.md` |
| End-to-end process | Complete workflow | `02-methodology/process-overview.md` |
| Phase details | Each phase's requirements | `02-methodology/phases/*/` |
| Quality gates | Checkpoint criteria | `02-methodology/checkpoints/*/` |
| Swift standards | Language conventions | `03-standards/swift/*` |
| Language standards | Python, JS/TS, Java/Kotlin, Go, Rust, C# | `03-standards/*/coding-standard.md` |
| UI design standard | UI specification & design | `03-standards/ui/design-standard.md` |
| Cross-dependencies | Dependency management | `01-governance/cross-dependencies.md` |
| Architecture | Design patterns | `03-standards/architecture/*` |
| Templates | Reusable templates | `04-templates/*` |
| Checklists | Quality checks | `05-checklists/*` |
| Agent instructions | How agents operate | `06-automation/agents/*` |
