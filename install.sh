#!/usr/bin/env bash
# Install the Solo Agent Development Framework into a project directory.
#
# Usage:
#   ./install.sh [target-dir]
#
# Defaults to the current directory. Safe to re-run: existing state and
# artifacts are preserved.

set -euo pipefail

TARGET="${1:-.}"
TARGET="$(cd "$TARGET" && pwd)"
SRC_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Installing Solo Agent Development Framework into: $TARGET"

# Copy framework documentation and templates (overwrite with latest).
for d in 00-constitution 01-governance 02-methodology 03-standards 04-templates 05-checklists 06-automation 07-examples; do
  if [ -d "$SRC_DIR/$d" ]; then
    rm -rf "$TARGET/$d"
    cp -R "$SRC_DIR/$d" "$TARGET/$d"
  fi
done

# Copy top-level docs.
for f in README.md GETTING-STARTED.md SUMMARY.md; do
  if [ -f "$SRC_DIR/$f" ]; then
    cp "$SRC_DIR/$f" "$TARGET/$f"
  fi
done

# Copy OpenCode skill + command.
mkdir -p "$TARGET/.opencode/skills/home-dash-framework-manager" "$TARGET/.opencode/commands"
cp "$SRC_DIR/.opencode/skills/home-dash-framework-manager/SKILL.md" \
   "$TARGET/.opencode/skills/home-dash-framework-manager/SKILL.md"
cp "$SRC_DIR/.opencode/commands/framework.md" \
   "$TARGET/.opencode/commands/framework.md"

# Initialize per-project state (do not overwrite existing state).
mkdir -p "$TARGET/.framework/tasks" "$TARGET/.framework/sessions" "$TARGET/specs"
if [ ! -f "$TARGET/.framework/state.json" ]; then
  cp "$SRC_DIR/.framework/state.json" "$TARGET/.framework/state.json"
fi

# Ensure .gitignore entries exist.
if [ ! -f "$TARGET/.gitignore" ]; then
  touch "$TARGET/.gitignore"
fi
grep -qxF ".framework/state.json" "$TARGET/.gitignore" 2>/dev/null || echo ".framework/state.json" >> "$TARGET/.gitignore"
grep -qxF ".framework/tasks/" "$TARGET/.gitignore" 2>/dev/null || echo ".framework/tasks/" >> "$TARGET/.gitignore"
grep -qxF ".framework/sessions/" "$TARGET/.gitignore" 2>/dev/null || echo ".framework/sessions/" >> "$TARGET/.gitignore"

echo "Done."
echo
echo "Next steps:"
echo "  1. cd \"$TARGET\""
echo "  2. Run: opencode"
echo "  3. In the TUI: /framework"
