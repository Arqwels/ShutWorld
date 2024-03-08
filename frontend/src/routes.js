import { ADMIN_EDIT_RANKS, ADMIN_ROUTE, ADMIN_SINGLE_EDIT_RANK, AUTHORIZATION_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PLAY_ROUTE, PROFILE_ROUTE, PUBLIC_OFFER_ROUTE, RULES_ROUTE, SHOP_ROUTE, USER_AGREEMENT_ROUTE } from "./utils/consts";
import HomePage from "./pages/HomePage";
import HowPlay from "./pages/HowPlayPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Rules from "./pages/RulesPage";
import ProfilePage from "./pages/ProfilePage";
import ShopPage from "./pages/ShopPage";
import mPublicOfferPage from "./pages/mPublicOfferPage";
import mUserAgreementPage from "./pages/mUserAgreementPage";
import AdminPage from "./ADMIN/AdminPage";
import EditerRanksPage from "./ADMIN/EditerRanks.Page";
import SinglEditRank from "./ADMIN/components/Donate/Editor/SinglEditRank";

export const authRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: ProfilePage
  }
];

export const adminRouters = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage
  },
  {
    path: ADMIN_EDIT_RANKS,
    Component: EditerRanksPage
  },
  {
    path: ADMIN_SINGLE_EDIT_RANK,
    Component: SinglEditRank
  },
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
    Component: ShopPage
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
    path: USER_AGREEMENT_ROUTE,
    Component: mUserAgreementPage
  },
  {
    path: PUBLIC_OFFER_ROUTE,
    Component: mPublicOfferPage
  },
]