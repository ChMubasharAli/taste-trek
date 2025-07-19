import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Manitne imports
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import { Notifications } from "@mantine/notifications";

// use StoreContextProvider import
import { StoreContextProvider } from "./context/StoreContext.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutComponent from "./pages/PlaceOrder/PlaceOrder.jsx";
import ForgetPassword from "./components/auth/ForgetPassword.jsx";
import VerifyOtp from "./components/auth/VerifyOtp.jsx";
import PrivateRoute from "./components/ProtectedRoute.jsx";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage.jsx";
import MyOrders from "./components/MyOrder.jsx";
import SuccessPage from "./components/SuccessPage.jsx";
import PaymentComp from "./components/PaymentComp.jsx";
import FailurePage from "./components/FailurePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/checkout"
        element={<PrivateRoute element={<CheckoutComponent />} />}
      />
      <Route
        path="/myOrders"
        element={<PrivateRoute element={<MyOrders />} />}
      />
      <Route
        path="/payment"
        element={<PrivateRoute element={<PaymentComp />} />}
      />
      <Route path="/forgetPassword" element={<ForgetPassword />} />
      <Route path="/verifyOtp" element={<VerifyOtp />} />
      <Route path="/order-success" element={<SuccessPage />} />
      <Route path="/order-failed" element={<FailurePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <Notifications />
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  </MantineProvider>
);
