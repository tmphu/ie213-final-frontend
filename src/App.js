import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./HOC/Layout";
import HomePage from "./Pages/Homepage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import DetailPage from "./Pages/DetailPage/DetailPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import Loading from "./Pages/Loading/Loading";
import LocationPage from "./Pages/LocationPage/LocationPage";
import MyProfile from "./Pages/MyProfile/MyProfile";
import CustomerAdminPage from "./Pages/AdminPage/CustomerAdminPage";
import AdminLayout from "./HOC/AdminLayout/AdminLayout";
import LocationAdminPage from "./Pages/AdminPage/LocationAdminPage";
import HouseAdminPage from "./Pages/AdminPage/HouseAdminPage";
import BookingAdminPage from "./Pages/AdminPage/BookingAdminPage";

function App() {
  return (
    <div>
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/signup" element={<Layout><SignupPage /></Layout>} />
          <Route path="/location/:id" element={<Layout><LocationPage /></Layout>} />
          <Route path="/house/details/:id" element={<Layout><DetailPage /></Layout>} />
          <Route path="/my-profile" element={<Layout><MyProfile /></Layout>} />
          <Route path="/admin">
            <Route path="customer" element={<AdminLayout><CustomerAdminPage /></AdminLayout>} />
            <Route path="location" element={<AdminLayout><LocationAdminPage /></AdminLayout>} />
            <Route path="house" element={<AdminLayout><HouseAdminPage /></AdminLayout>} />
            <Route path="booking" element={<AdminLayout><BookingAdminPage /></AdminLayout>} />
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
