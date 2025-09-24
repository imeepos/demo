interface FeatureCardProps {
  title: string;
  description: string;
}

/**
 * 功能特性卡片组件
 * 职责：展示单个技术特性
 */
export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-card border rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
