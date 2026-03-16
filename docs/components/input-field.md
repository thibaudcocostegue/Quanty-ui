# QuantInputField

Operator input field with strict black background and focus border accent.

## Installation

```bash
npx @quanty-ui/cli add input-field
```

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Current value |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Disabled state |
| `label` | `string` | `''` | Optional label |
| `invalid` | `boolean` | `false` | Neutral error hint |

## Events

| Name | Payload |
|------|---------|
| `update:modelValue` | `string` |

## Usage

```vue
<QuantInputField v-model="symbol" label="Ticker" placeholder="BTC-USD" />
```
