import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/Auth";
import AuthLayout from "./components/layouts/AuthLayout";
import ManagerLayout from "./components/layouts/ManagerLayout";
import CashierLayout from "./components/layouts/CashierLayout";
import ManagerDashboard from "./pages/manager/Dashboard";
import ManagerReports from "./pages/manager/Reports";
import ManagerCashiers from "./pages/manager/Cashiers";
import ManagerFieldBuilder from "./pages/manager/FieldBuilder";
import CashierDashboard from "./pages/cashier/Dashboard";
import CashierSubmit from "./pages/cashier/Submit";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AuthLayout />,
      children: [{ index: true, element: <AuthPage /> }],
    },
    {
      path: "/manager",
      element: <ManagerLayout />,
      children: [
        { index: true, element: <ManagerDashboard /> },
        { path: "reports", element: <ManagerReports /> },
        { path: "cashiers", element: <ManagerCashiers /> },
        { path: "fields", element: <ManagerFieldBuilder /> },
      ],
    },
    {
      path: "/cashier",
      element: <CashierLayout />,
      children: [
        { index: true, element: <CashierDashboard /> },
        { path: "submit", element: <CashierSubmit /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

export default function App() {
  return <RouterProvider router={router} />;
}
