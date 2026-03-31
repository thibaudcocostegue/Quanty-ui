# QuantLogRow

Compact event trace row with visual hierarchy and optional attention state.

## Installation

```bash
npx @quanty-ui/cli add log-row
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `timestamp` | `string` | — | Event timestamp |
| `message` | `string` | — | Event message |
| `level` | `'standard' \| 'attention'` | `'standard'` | Row severity |

## Usage

```vue
<QuantLogRow timestamp="14:32:42" message="Risk threshold reached" level="attention" />
```
