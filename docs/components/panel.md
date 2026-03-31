# QuantPanel

Universal functional surface with mandatory structure border.

## Installation

```bash
npx @quanty-ui/cli add panel
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `''` | Optional panel title |

## Usage

```vue
<QuantPanel title="Positions">
  <QuantTable :columns="columns" :rows="rows" />
</QuantPanel>
```
