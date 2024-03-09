import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/home/HomePage";
import RegisterPage from "../pages/register/RegisterPage";
import Error404Page from "../pages/404/Error404Page";
import LoginPage from "../pages/login/LoginPage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import SandboxPage from "../pages/Sandbox/SandboxPage";
import CreateCardPage from "../pages/CreateCardPage/CreateCardPage";
import AuthGuard from "../Guard/AuthGuard";
import BizGuard from "../Guard/BizGuard";
import AboutPage from "../pages/AboutPage/About";
import FavoriteCardPage from "../pages/FavoriteCardPage/FavoriteCardPage";
import MyCardsPage from "../pages/MyCardsPage/MyCardsPage";
import CardDetailsPage from "../pages/CardDetailsPage/CardDetailsPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import EditProfile from "../pages/EditProfilepage/EditProfile";
import ThankYouPage from "../pages/Thankyoupage/ThankYouPage";
import VerificationPage from "../pages/VerificationPage/VerificationPage";
import EditStatusPage from "../pages/Sandbox/EditStatusPage";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ForgotPassword from "../pages/ForgotPasswords/ForgotPassword";
import PrivacyPolicy from "../layout/footer/PrivacyPolicyPage";
import FAQ from "../layout/footer/FAQ";
import ContactUs from "../layout/footer/ContactUs";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.FAVCARD} element={<FavoriteCardPage />} />
      <Route path={ROUTES.MYCARDS} element={<MyCardsPage />} />
      <Route path={ROUTES.EDITSTATUS} element={<EditStatusPage />} />
      <Route path={ROUTES.CARTPAGE} element={<CartPage />} />
      <Route path={ROUTES.CHECKOUTPAGE} element={<CheckoutPage />} />
      <Route path={ROUTES.THANKYOUPAGE} element={<ThankYouPage />} />
      <Route path={ROUTES.VERIFICATIONPAGE} element={<VerificationPage />} />
      <Route path={ROUTES.FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.PRIVACYPOLICY} element={<PrivacyPolicy />} />
      <Route path={ROUTES.FAQ} element={<FAQ />} />
      <Route path={ROUTES.CONTACTUS} element={<ContactUs />} />

      <Route path="/editprofile/:id" element={<EditProfile />} />

      <Route path="/card-details/:cardId" element={<CardDetailsPage />} />

      <Route
        path={ROUTES.CREATECARD}
        element={
          <AuthGuard>
            <BizGuard>
              <CreateCardPage />
            </BizGuard>
          </AuthGuard>
        }
      />
      <Route path={`${ROUTES.EDITCARD}/:id`} element={<EditCardPage />} />
      <Route path={ROUTES.EDITSTATUSPAGE} element={<EditStatusPage />} />
      <Route path={ROUTES.SANDBOX} element={<SandboxPage />}>
        <Route path="Favoritecard" element={<favoriteCardPage />} />
      </Route>
      <Route path={ROUTES.RESETPASSWORD} element={<ResetPassword />} />

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};
export default Router;
