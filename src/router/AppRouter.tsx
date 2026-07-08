import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CollectionsPage } from "../pages/CollectionsPage";
import { FragranceDetailPage } from "../pages/FragranceDetailPage";
import { HomePage } from "../pages/HomePage";
import { JournalArticlePage } from "../pages/JournalArticlePage";
import { JournalPage } from "../pages/JournalPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PricingPage } from "../pages/PricingPage";
import { StoryPage } from "../pages/StoryPage";
import { SuccessPage } from "../pages/SuccessPage";
import { AdminPage } from "../pages/AdminPage";
import { TrackOrderPage } from "../pages/TrackOrderPage";

export function AppRouter() {
  return (
    <Routes>
      {/* Admin — no layout */}
      <Route path="/admin" element={<AdminPage />} />

      {/* Main site — wrapped in layout */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/our-story" element={<StoryPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/fragrance/:slug" element={<FragranceDetailPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/journal/:slug" element={<JournalArticlePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}