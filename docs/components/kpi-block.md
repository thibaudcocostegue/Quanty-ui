# QuantKpiBlock

Key metric block optimized for dense dashboard reading.

## Installation

```bash
npx @quanty-ui/cli add kpi-block
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | KPI label |
| `value` | `string \| number` | — | KPI value |
| `state` | `'default' \| 'positive' \| 'attention'` | `'default'` | Visual state |

## Usage

```vue
<QuantKpiBlock label="Daily PnL" value="+2.14%" state="positive" />
```
