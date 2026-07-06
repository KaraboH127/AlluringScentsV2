import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { CartProvider } from "./store/CartContext";

/**
 * Application root.
 *
 * Composition order matters:
 * - BrowserRouter enables route-aware components globally.
 * - CartProvider exposes cross-page commerce state.
 * - AppRouter renders the route tree inside the global layout.
 */
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </BrowserRouter>
  );
}
