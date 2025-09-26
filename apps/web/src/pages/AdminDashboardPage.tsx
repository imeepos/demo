import { DashboardLayout } from '../components/layout';
import { DashboardExample } from '../components/dashboard/DashboardExample';

/**
 * 专业管理后台页面
 * 职责：展示完整的管理后台界面，包含侧边导航和顶部导航
 */
export function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <DashboardExample />
    </DashboardLayout>
  );
}
