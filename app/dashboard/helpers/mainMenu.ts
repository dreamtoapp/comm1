// Main menu items for dashboard sidebar (Restructured for enhanced UX)
import {
  AlertTriangle,
  ListOrdered, // Kept for now, if '/dashboard/orders' is still relevant
  Timer,
  Truck,
  Package,
  TagIcon, // Could be reused or replaced by Gift for promotions
  ShoppingBasket,
  Users,
  Newspaper,
  User2,
  Settings,
  Wrench,
  FileText,
  Layers, // Good for a comprehensive "Orders Management" view
  MapPin,
  Info,
  BarChart2,
  TrendingUp,
  UserCheck,
  DollarSign,
  ClipboardList,
  Gift,
  Star,
  Award,
  LayoutGrid, // Already present
  LayoutDashboard, // Added for dashboard home icon
  Target, // Added for SEO
  Briefcase, // For "Business" or "Operations"
  Users2, // Alt for Customers
  CreditCard, // For Expenses/Financials
  ShieldCheck, // For Permissions/Roles
  PieChart, // General Analytics
  Activity, // Performance
  Home, // Added for e-commerce home link
} from 'lucide-react';

// Define type for menu items (assuming it's defined in AppSidebar.tsx or a shared types file)
// For clarity here if this file were standalone:
/*
interface MenuItem {
  title: string;
  url: string;
  icon: ElementType;
  children?: MenuItem[];
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}
*/

export const menuGroups = [
  {
    label: 'نظرة عامة', // Overview - Reverted label, will have two items now
    items: [
      { title: 'لوحة التحكم الرئيسية', url: '/dashboard', icon: LayoutDashboard },
      { title: 'المتجر الإلكتروني', url: '/', icon: Home }, // Link to e-commerce homepage
    ],
  },
  {
    label: 'إدارة الطلبات', // Order Management
    items: [
      { title: 'إدارة الطلبات', url: '/dashboard/orders-management', icon: Layers }, // Main, new/comprehensive view
      // { title: 'الطلبات القديمة/الأرشيف', url: '/dashboard/orders', icon: ListOrdered }, // If '/dashboard/orders' serves a distinct purpose
      { title: 'تتبع الطلبات', url: '/dashboard/track', icon: MapPin },
    ],
  },
  {
    label: 'إدارة العمليات', // Operations Management (New Group)
    items: [
      { title: 'إدارة السائقين', url: '/dashboard/drivers', icon: Truck },
      { title: 'جدولة الورديات', url: '/dashboard/shifts', icon: Timer },
      // { title: 'إدارة المخزون', url: '/dashboard/reports/inventory', icon: ClipboardList }, // Moved to reports page
    ],
  },
  {
    label: 'إدارة المنتجات', // Product Catalog
    items: [
      { title: 'المنتجات', url: '/dashboard/products-control', icon: Package },
      { title: 'الأصناف', url: '/dashboard/categories', icon: LayoutGrid },
      { title: 'الموردون', url: '/dashboard/suppliers', icon: ShoppingBasket },
    ],
  },
  {
    label: 'التسويق والعروض', // Marketing & Promotions
    items: [
      { title: 'إدارة العروض', url: '/dashboard/promotions', icon: Gift },
      { title: 'النشرات الإخبارية', url: '/dashboard/clientnews', icon: Newspaper },
      { title: 'إدارة SEO', url: '/dashboard/seo', icon: Target },
      { title: 'دليل SEO', url: '/seo/documentation', icon: FileText }, // Added SEO Documentation
      // { title: 'تقرير العروض', url: '/dashboard/reports/promotions', icon: BarChart2 }, // Can be here or under general reports
    ],
  },
  {
    label: 'إدارة العملاء', // Customer Management
    items: [
      { title: 'قائمة العملاء', url: '/dashboard/users', icon: Users2 }, // Changed icon for distinction
      { title: 'مراسلات العملاء', url: '/dashboard/clientsubmission', icon: Users }, // Kept Users icon for submissions
      // { title: 'تقرير العملاء', url: '/dashboard/reports/customers', icon: UserCheck }, // Can be here or under general reports
    ],
  },
  {
    label: 'المصروفات', // Financials - Label changed to match single item
    items: [
      // { title: 'التقارير المالية', url: '/dashboard/reports/finance', icon: DollarSign }, // Moved to reports page
      { title: 'المصروفات', url: '/dashboard/expenses', icon: CreditCard }, // Changed icon
    ],
  },
  {
    label: 'نظرة عامة على التقارير', // Changed label to match single item
    items: [
      { title: 'نظرة عامة على التقارير', url: '/dashboard/reports', icon: PieChart },
    ],
  },
  {
    label: 'النظام والإعدادات', // System & Settings
    items: [
      { title: 'الإعدادات العامة', url: '/dashboard/settings', icon: Settings },
      { title: 'المستخدمون والصلاحيات', url: '/dashboard/users-permissions', icon: ShieldCheck }, // Assuming a dedicated page for roles/permissions, distinct from customer list
      { title: 'التنبيهات', url: '/dashboard/alerts', icon: AlertTriangle },
      // { title: 'تنبيهات الطوارئ', url: '/dashboard/fallback-alerts', icon: AlertTriangle }, // Could be merged or kept if distinct
      { title: 'الدعم الفني', url: '/dashboard/support', icon: Wrench },
      { title: 'الدليل والإرشادات', url: '/dashboard/guidelines', icon: Info },
    ],
  },
];
