import HomePage from "./pages/HomePage";
import HowPlay from "./pages/HowPlayPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Rules from "./pages/RulesPage";
import Store from "./pages/StorePage";
import AdminPage from "./pages/mAdminPage";
import ShopPage from "./pages/mShopPage";
import { ADMIN_ROUTE, AUTHORIZATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, M_SHOP_ROUTE, PLAY_ROUTE, RULES_ROUTE, SHOP_ROUTE } from "./utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  }
]

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: HomePage
  },
  {
    path: LOGIN_ROUTE,
    Component: LoginPage
  },
  {
    path: AUTHORIZATION_ROUTE,
    Component: RegisterPage
  },
  {
    path: SHOP_ROUTE,
    Component: Store
  },
  {
    path: RULES_ROUTE,
    Component: Rules
  },
  {
    path: PLAY_ROUTE,
    Component: HowPlay
  },
  {
    path: M_SHOP_ROUTE,
    Component: ShopPage
  },
]