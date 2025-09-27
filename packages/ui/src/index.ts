// Re-export all components
export * from './components';

// Re-export utilities
export { cn } from './lib/utils';

// Re-export types with specific exports to avoid conflicts
export type {
  // Component types (actual exports from components.ts)
  BaseComponentProps,
  ClickableProps,
  FormComponentProps,
  LoadingProps,
  SizeVariant,
  ColorVariant,
  DisplayVariant,
  LayoutComponentProps,
  ResponsiveLayoutProps,
  GridProps,
} from './types/components';

export type {
  // Sentiment types (actual exports from sentiment.ts)
  SentimentType,
  UrgencyLevel,
  TrendDirection,
  MediaType,
  GeographicLevel,
  StatusType,
  SentimentData,
  SourceInfo,
  LocationInfo,
  MetricsData,
} from './types/sentiment';

export type {
  // Theme types (actual exports from theme.ts)
  ThemeMode,
  SemanticColorType,
  NeutralColorType,
  SpacingVariant,
  RadiusVariant,
  ShadowVariant,
  HSLColor,
  RGBColor,
  HEXColor,
} from './types/theme';

export type {
  // Utility types (actual exports from utils.ts)
  DeepPartial,
  DeepRequired,
  StrictOmit,
  StrictPick,
  If,
  NonNullable,
  Nullable,
  Optional,
  ArrayElement,
  ObjectValues,
  ObjectKeys,
  Parameters,
  ReturnType,
  Awaited,
  ComponentType,
  MergeProps,
  OverrideProps,
  ExtendProps,
  HTMLProps,
  NativeElementProps,
  ForwardRefProps,
  // String manipulation
  Capitalize,
  Uncapitalize,
  KebabCase,
  CamelCase,
  Split,
  Join,
  // Event handlers
  EventHandler,
  MouseEventHandler,
  KeyboardEventHandler,
  FocusEventHandler,
  ChangeEventHandler,
  FormEventHandler,
  // State types
  LoadingState,
  AsyncState,
  PaginationInfo,
  ApiResponse,
  SortConfig,
  FilterConfig,
  // Form types
  FieldValue,
  FormValues,
  FormErrors,
  FormState,
  FieldConfig,
  ValidationRule,
  // Chart types
  DataPoint,
  ChartSeries,
  AxisConfig,
  ChartConfig,
  // Business types specific to utils.ts
  BusinessStatus,
  // Advanced types
  Brand,
  Opaque,
  Tagged,
  Unit,
  Path,
  URL,
  Email,
  Timestamp,
  ID,
  UUID,
  // Type validation
  TypeChecker,
  TypeConverter,
  ValidationResult,
  TypeValidator,
} from './types/utils';

// Import styles
import './styles.css';
