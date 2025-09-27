// Widgets Components
export { TrendAnalysisChart } from './TrendAnalysisChart';
export type { TrendAnalysisChartProps } from './TrendAnalysisChart';

export { SentimentOverviewWidget } from './SentimentOverviewWidget';
export type {
  SentimentOverviewWidgetProps,
  SentimentOverviewData,
  TrendData as SentimentTrendData,
  ComparisonData,
  SentimentType,
} from './SentimentOverviewWidget';

export { GeographicDistributionMap } from './GeographicDistributionMap';
export type {
  GeographicDistributionMapProps,
  GeographicData,
  RegionInfo,
  EventInfo,
  MapViewMode,
  MapLevel,
  DataMetric,
  ColorScheme,
  GeoExportFormat,
} from './GeographicDistributionMap';

export { DataExplorerTable } from './DataExplorerTable';
export type {
  DataExplorerTableProps,
  TableData,
  ColumnConfig,
  FilterConfig,
  FilterOption,
  SortDirection,
  FilterOperator,
  TableExportFormat,
} from './DataExplorerTable';

export { AlertManagementWidget } from './AlertManagementWidget';
export type {
  AlertManagementWidgetProps,
  AlertItem as WidgetAlertItem,
  AlertLevel as WidgetAlertLevel,
  AlertStatus as WidgetAlertStatus,
  AlertAction as WidgetAlertAction,
  BatchAction,
} from './AlertManagementWidget';

export { AdvancedSearchPanel } from './AdvancedSearchPanel';
export type {
  AdvancedSearchPanelProps,
  SearchConfig,
  SearchFilters,
  SearchSuggestion,
  SavedSearch,
  PresetFilter,
  DataSourceOption,
  TimeRangeOption,
  SentimentOption,
  RegionOption,
  CategoryOption,
  LanguageOption,
} from './AdvancedSearchPanel';
