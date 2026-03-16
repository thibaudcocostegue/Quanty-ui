# QuantTabs

Local navigation tabs with strict active/inactive distinction.

## Installation

```bash
npx @quanty-ui/cli add tabs
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Active tab value |
| `items` | `{ label: string; value: string; disabled?: boolean }[]` | — | Tabs list |

## Events

| Name | Payload |
|------|---------|
| `update:modelValue` | `string` |

## Usage

```vue
<QuantTabs v-model="activeTab" :items="tabItems" />
```
