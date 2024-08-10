export enum AssetType {
  stock = 'stock',
  mutualFund = 'mutual_fund',
}

export enum ExchangeId {
  SAU = 'SAU',
  // @TBD
  PSX = 'PSX',
}

export enum Currency {
  pakstaniRupee = 'PKR',
  saudiRiyal = 'SAR',
}

export enum SegmentMetrics {
  sales = 'SALES',
  operatingIncome = 'OPINC',
  assets = 'ASSETS',
  depreciationExpense = 'DEP',
  capitalExpenditure = 'CAPEX',
}

export enum SegmentType {
  business = 'BUS',
  geographic = 'GEO',
}

export enum SegmentsPeriodicity {
  annualOriginal = 'ANN',
  annualLatest = 'ANN_R',
}

export enum FundamentalsPeriodicity {
  annualOriginal = 'ANN',
  annualLatest = 'ANN_R',
  quarterly = 'QTR',
  quarterlyLatest = 'QTR_R',
  semiAnnual = 'SEMI',
  semiAnnualLatest = 'SEMI_R',
  lastTwelveMonths = 'LTM',
  lastTwelveMonthsLatest = 'LTM_R',
  lastTwelveMonthsGlobal = 'LTMSG',
  lastTwelveMonthsSemiAnnualReported = 'LTM_SEMI',
  yearToDate = 'YTD',
}

export enum FundamentalsMetricDataType {
  floatArray = 'floatArray',
  intArray = 'intArray',
  date = 'date',
  stringArray = 'stringArray',
  float = 'float',
}
