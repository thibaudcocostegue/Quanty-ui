<script setup lang="ts">
import QuantBadge from '../../components/badge/QuantBadge.vue'
import QuantButton from '../../components/button/QuantButton.vue'
import QuantCard from '../../components/card/QuantCard.vue'
import QuantTable from '../../components/table/QuantTable.vue'
import QuantHeading from '../../components/heading/QuantHeading.vue'
import QuantText from '../../components/text/QuantText.vue'
import QuantCode from '../../components/code/QuantCode.vue'

const tableColumns = [
  { key: 'ticker', label: 'Ticker' },
  { key: 'price', label: 'Price', align: 'right' as const },
  { key: 'change', label: 'Change', align: 'right' as const },
  { key: 'signal', label: 'Signal' },
]

const tableRows = [
  { id: '1', ticker: 'BTCUSD', price: 68342.18, change: '+2.14%', signal: 'Long' },
  { id: '2', ticker: 'ETHUSD', price: 3542.22, change: '-1.08%', signal: 'Neutral' },
  { id: '3', ticker: 'AAPL', price: 198.74, change: '+0.63%', signal: 'Watch' },
]
</script>

<template>
  <main class="playground">
    <h1 class="playground__title">Quanty UI Playground</h1>

    <section class="playground__section">
      <h2 class="playground__section-title">Typography</h2>
      <div class="playground__typography">
        <div class="playground__typography-block">
          <QuantHeading :level="1">Portfolio Overview</QuantHeading>
          <QuantHeading :level="2">Market Summary</QuantHeading>
          <QuantHeading :level="3" color="secondary">Positions</QuantHeading>
          <QuantHeading :level="4">Analytics</QuantHeading>
          <QuantHeading :level="5" color="muted">Footnote</QuantHeading>
          <QuantHeading :level="6">Timestamp</QuantHeading>
        </div>
        
        <div class="playground__typography-block">
          <QuantText variant="body">Daily PnL summary for the current session.</QuantText>
          <QuantText variant="label">Last updated</QuantText>
          <QuantText variant="caption">Data delayed by 15 minutes</QuantText>
          <QuantText variant="body" color="secondary">Secondary text color</QuantText>
          <QuantText variant="body" color="muted">Muted text color</QuantText>
        </div>
        
        <div class="playground__typography-block">
          <QuantCode variant="ticker">AAPL</QuantCode>
          <QuantCode variant="numeric">+1,250.50</QuantCode>
          <QuantCode variant="formula">sharpe = mean(r) / std(r)</QuantCode>
          <QuantCode variant="ticker">BTC-USD</QuantCode>
          <QuantCode variant="numeric">68,342.18</QuantCode>
        </div>
      </div>
    </section>

    <section class="playground__section">
      <h2 class="playground__section-title">QuantBadge</h2>
      <div class="playground__row">
        <QuantBadge tone="neutral">Neutral</QuantBadge>
        <QuantBadge tone="signal">Signal</QuantBadge>
        <QuantBadge tone="profit">Profit</QuantBadge>
        <QuantBadge tone="loss">Loss</QuantBadge>
        <QuantBadge tone="warning">Warning</QuantBadge>
        <QuantBadge tone="signal" pill>Signal Pill</QuantBadge>
      </div>
    </section>

    <section class="playground__section">
      <h2 class="playground__section-title">QuantButton</h2>
      <div class="playground__row">
        <QuantButton tone="signal" variant="solid">Signal</QuantButton>
        <QuantButton tone="neutral" variant="solid">Neutral</QuantButton>
        <QuantButton tone="profit" variant="outline">Profit</QuantButton>
        <QuantButton tone="loss" variant="outline">Loss</QuantButton>
        <QuantButton tone="warning" variant="ghost">Warning</QuantButton>
        <QuantButton tone="signal" :loading="true">Loading</QuantButton>
      </div>
    </section>

    <section class="playground__section">
      <h2 class="playground__section-title">QuantCard</h2>
      <div class="playground__row playground__row--cards">
        <QuantCard title="Portfolio" subtitle="Daily snapshot">
          Equity: $152,340.00
        </QuantCard>
        <QuantCard title="Risk" subtitle="Current limits">
          Max drawdown: 4.1%
          <template #footer>
            <QuantBadge tone="warning">Monitor</QuantBadge>
          </template>
        </QuantCard>
      </div>
    </section>

    <section class="playground__section">
      <h2 class="playground__section-title">QuantTable</h2>
      <QuantTable :columns="tableColumns" :rows="tableRows">
        <template #cell-change="{ value }">
          <span :class="['playground__change', String(value).startsWith('-') ? 'playground__change--loss' : 'playground__change--profit']">
            {{ value }}
          </span>
        </template>
      </QuantTable>
    </section>
  </main>
</template>

<style scoped>
.playground {
  min-height: 100vh;
  padding: var(--spacing-6);
  background: var(--surface-base);
  color: var(--text-primary);
  display: grid;
  gap: var(--spacing-6);
}

.playground__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
}

.playground__section {
  display: grid;
  gap: var(--spacing-3);
}

.playground__section-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
}

.playground__typography {
  display: grid;
  gap: var(--spacing-6);
}

.playground__typography-block {
  display: grid;
  gap: var(--spacing-2);
}

.playground__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-3);
}

.playground__row--cards {
  align-items: stretch;
}

.playground__row--cards > * {
  min-width: 240px;
}

.playground__change {
  font-variant-numeric: tabular-nums;
}

.playground__change--profit {
  color: var(--color-profit);
}

.playground__change--loss {
  color: var(--color-loss);
}
</style>
