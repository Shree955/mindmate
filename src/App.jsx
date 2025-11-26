import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FeaturesPage from "./pages/FeaturesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import MoodTracker from "./components/MoodTracker";
import EmergencySupport from "./components/EmergencyComponent";
import Profile from "./pages/Profile";
import GuidedMeditation from "./components/GuidedMeditation";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/emergency" element={<EmergencySupport />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/meditations" element={<GuidedMeditation />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <Chatbot />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
