import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProviderLayout from "./layouts/ProviderLayout";

// Public & General Pages
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import ProviderRegister from "./pages/ProviderRegister";
import UserRegister from "./pages/UserRegister";
import Login from "./pages/Login";
import Category from "./pages/Category";
import TechnitianByCategory from "./pages/TechnitianByCategory";
import ProviderDetails from "./pages/ProviderDetails";
import NotFound from "./pages/NotFound"; // 👈 Ye zaroori hai

// Customer Private Pages
import Booking from "./pages/Booking";
import Notifications from "./pages/Notifications";
import ProfileManagement from "./pages/ProfileManagement";
import UserBookings from "./pages/UserBookings";

// Admin Pages
import Dashboard from "./pages/Admin/Dashboard";
import GetAllCategories from "./pages/Admin/GetAllCategories";
import GetAllBookings from "./pages/Admin/GetAllBookings";
import GetAllUsers from "./pages/Admin/GetAllUsers";
import GetAllProviders from "./pages/Admin/GetAllProviders";
import GetAllReviews from "./pages/Admin/GetAllReviews";
import SuperAdminLogin from "./pages/Admin/SuperAdminLogin";

// Provider Private Pages
import ProviderDashboard from "./pages/Provider/ProviderDashboard";
import MyBookings from "./pages/Provider/MyBookings";
import Profile from "./pages/Provider/Profile";
import MyReviews from "./pages/Provider/MyReviews";
import SearchResults from "./pages/SearchResults";
import ScrollToTop from "./components/ScrollToTop";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        {/* ================================================= */}
        {/* 1️⃣ MAIN WEBSITE AREA (Customer & Public Mix)      */}
        {/* ================================================= */}
        <Route path="/" element={<MainLayout />}>
          {/* ✅ Public Routes (Login not required) */}
          <Route index element={<Home />} />
          <Route path="getstarted" element={<GetStarted />} />
          <Route path="categories" element={<Category />} />
          <Route path="login" element={<Login />} />
          <Route path="providerRegister" element={<ProviderRegister />} />
          <Route path="userRegister" element={<UserRegister />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService/>} />
          <Route
            path="technitians-by-category/:categoryId"
            element={<TechnitianByCategory />}
          />
          <Route path="providerProfile/:id" element={<ProviderDetails />} />
          <Route path="/search-results" element={<SearchResults />} />

          {/* 🔒 Customer Only Routes */}
          <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
            <Route path="book-a-technitian/:id" element={<Booking />} />
            <Route path="my-bookings" element={<UserBookings />} />
            <Route path="user-Profile" element={<ProfileManagement />} />
          </Route>

          {/* 🔒 Shared Routes (Customer + Provider) */}
          <Route
            element={<ProtectedRoute allowedRoles={["Customer", "Provider"]} />}
          >
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>

        {/* ================================================= */}
        {/* 2️⃣ ADMIN AREA                                     */}
        {/* ================================================= */}

        {/* Admin Login (Public) */}
        <Route path="/admin/login" element={<SuperAdminLogin />} />

        {/* Protected Admin Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/admin/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="getAllcategories" element={<GetAllCategories />} />
            <Route path="getAllbookings" element={<GetAllBookings />} />
            <Route path="getAllUsers" element={<GetAllUsers />} />
            <Route path="getAllProviders" element={<GetAllProviders />} />
            <Route path="getAllReviews" element={<GetAllReviews />} />
          </Route>
        </Route>

        {/* ================================================= */}
        {/* 3️⃣ PROVIDER AREA                                  */}
        {/* ================================================= */}
        <Route element={<ProtectedRoute allowedRoles={["Provider"]} />}>
          <Route path="/provider/" element={<ProviderLayout />}>
            <Route index element={<ProviderDashboard />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-reviews" element={<MyReviews />} />
            <Route path="notifications" element={<Notifications isProviderView={true} />} />
          </Route>
        </Route>

        {/* ================================================= */}
        {/* 4️⃣ ERROR PAGE (Catch All)                         */}
        {/* ================================================= */}
        <Route path="/not-found" element={<NotFound />} />
        {/* Agar koi aesa link ho jo exist nahi karta, to yahan bhejo */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics/>
    </BrowserRouter>
  );
};

export default App;
