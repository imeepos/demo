/**
 * 欢迎区域组件
 * 职责：显示项目欢迎信息
 */
export function WelcomeSection() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">欢迎来到 SKER 项目</h2>
      <p className="text-lg text-muted-foreground">
        这是一个基于 React 19 + TanStack Router 的现代化前端应用
      </p>
    </div>
  );
}
