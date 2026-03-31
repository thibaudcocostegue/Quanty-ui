# QuantStatusBadge

Status indicator with strict positive/attention/inactive mapping.

## Installation

```bash
npx @quanty-ui/cli add status-badge
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `'positive' \| 'attention' \| 'inactive'` | `'inactive'` | Badge state |

## Usage

```vue
<QuantStatusBadge state="attention">Attention</QuantStatusBadge>
```
