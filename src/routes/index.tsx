import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { WizardLayout } from '../components/layout/WizardLayout';
import { LoginPage } from '../pages/auth/LoginPage';
import { SignUpPage } from '../pages/auth/SignUpPage';
import {
  Step1BusinessDetails,
  Step2ShiftsSchedule,
  Step3MachineryCatalog,
  Step4SupervisorInvites,
} from '../pages/onboarding';
import { HelpSupportPage } from '../pages/help';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { OrdersPage } from '../pages/orders';
import { DispatchPage } from '../pages/dispatch';
import { InventoryPage } from '../pages/inventory';
import { ProductionPage } from '../pages/production';
import { ProductionLogsPage } from '../pages/production-logs';
import { MachinesPage } from '../pages/machines';
import { QualityPage } from '../pages/quality';
import { ReportsPage } from '../pages/reports';
import { SettingsPage } from '../pages/settings';
import { OrdersManagementPage } from '../pages/orders-management';
import { TeamPage } from '../pages/team';
import { WorkbenchPage } from '../pages/workbench';
import { DesignReferenceDashboardPage } from '../design-reference';
import { RootEntry } from './RootEntry';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootEntry />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <OrdersPage />,
      },
      {
        path: '/orders-management',
        element: <OrdersManagementPage />,
      },
      {
        path: '/dispatch',
        element: <DispatchPage />,
      },
      {
        path: '/inventory',
        element: <InventoryPage />,
      },
      {
        path: '/production',
        element: <ProductionPage />,
      },
      {
        path: '/production-logs',
        element: <ProductionLogsPage />,
      },
      {
        path: '/machines',
        element: <MachinesPage />,
      },
      {
        path: '/team',
        element: <TeamPage />,
      },
      {
        path: '/quality',
        element: <QualityPage />,
      },
      {
        path: '/reports',
        element: <ReportsPage />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
      {
        path: '/help',
        element: <HelpSupportPage />,
      },
      {
        path: '/workbench',
        element: <WorkbenchPage />,
      },
    ],
  },
  {
    path: '/workbench',
    element: <WorkbenchPage />,
  },
  {
    path: '/m/:slug',
    element: <WorkbenchPage />,
  },
  {
    path: '/design-reference',
    element: <DesignReferenceDashboardPage />,
  },
  {
    path: '/onboarding',
    element: <WizardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/onboarding/step-1" replace />,
      },
      {
        path: 'step-1',
        element: <Step1BusinessDetails />,
      },
      {
        path: 'step-2',
        element: <Step2ShiftsSchedule />,
      },
      {
        path: 'step-3',
        element: <Step3MachineryCatalog />,
      },
      {
        path: 'step-4',
        element: <Step4SupervisorInvites />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
