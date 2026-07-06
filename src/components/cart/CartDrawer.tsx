import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../config/site";
import { useCart } from "../../store/CartContext";
import { CartItem } from "./CartItem";
import { Button } from "../ui/Button";

/**
 * Slide-out cart preview.
 *
 * Consumes cart context so users can inspect subtotal and line items without
 * leaving their current route.
 */
export function CartDrawer() {
  const { isDrawerOpen, toggleDrawer, items, subtotal } = useCart();
  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-[#2A2A2A] bg-[#090909]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between border-b border-[#222] p-5">
              <h3 className="text-lg text-white">Cart</h3>
              <button className="text-sm text-[#C9A227]" onClick={() => toggleDrawer(false)}>
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto p-5">
              {items.length === 0 ? <p className="text-sm text-[#AFAFAF]">Your cart is empty.</p> : items.map((item) => <CartItem key={`${item.fragranceId}-${item.size}`} item={item} />)}
            </div>
            <div className="space-y-3 border-t border-[#222] p-5">
              <div className="flex items-center justify-between text-sm text-[#EAEAEA]">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <Link to="/cart" onClick={() => toggleDrawer(false)}>
                <Button className="w-full">View Cart</Button>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
