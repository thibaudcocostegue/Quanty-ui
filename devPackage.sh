#!/bin/bash

# ============================================================
# quanty-ui — build & pack all packages
# Usage: ./pack.sh
# ============================================================

set -e

ROOT=$(pwd)
TOKENS_DIR="$ROOT/packages/tokens"
CLI_DIR="$ROOT/packages/cli"

echo ""
echo "📦 Building quanty-ui packages..."
echo ""

# ── TOKENS ──────────────────────────────────────────────────
echo "→ Building @quanty-ui/tokens..."
cd "$TOKENS_DIR"
pnpm pack
TOKENS_TGZ=$(ls quanty-ui-tokens-*.tgz | tail -1)
echo "  ✅ $TOKENS_DIR/$TOKENS_TGZ"

# ── CLI ─────────────────────────────────────────────────────
echo "→ Building @quanty-ui/cli..."
cd "$CLI_DIR"
pnpm run build
chmod +x dist/index.mjs
pnpm pack
CLI_TGZ=$(ls quanty-ui-cli-*.tgz | tail -1)
echo "  ✅ $CLI_DIR/$CLI_TGZ"

# ── RÉSUMÉ ──────────────────────────────────────────────────
echo ""
echo "════════════════════════════════════════════════════════"
echo "  To install in your test project:"
echo ""
echo "  pnpm add $TOKENS_DIR/$TOKENS_TGZ"
echo "  pnpm add $CLI_DIR/$CLI_TGZ"
echo "════════════════════════════════════════════════════════"
echo ""