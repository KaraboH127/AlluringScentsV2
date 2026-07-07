import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Order {
  id: string;
  order_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  amount_in_cents: number;
  status: string;
  created_at: string;
}

interface InventoryItem {
  id: string;
  fragrance_id: string;
  fragrance_name: string;
  collection: string;
  size: string;
  stock: number;
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  fulfilled: number;
  shipped: number;
  pending: number;
  lowStock: { fragrance_name: string; size: string; stock: number }[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (cents: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(cents / 100);

const statusColor: Record<string, string> = {
  succeeded: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  fulfilled: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  shipped: "bg-green-500/10 text-green-400 border border-green-500/20",
};

// ─── Admin Page ───────────────────────────────────────────────────────────────

export function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem("admin_token") ?? "");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"orders" | "inventory">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editStock, setEditStock] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  // ── Login ──────────────────────────────────────────────────────────────────

  const handleLogin = async () => {
    setLoginError("");
    const res = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setLoginError(data.error || "Invalid password.");
      return;
    }
    sessionStorage.setItem("admin_token", data.token);
    setToken(data.token);
  };

  // ── Fetch data ─────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    Promise.all([
      fetch(`${API}/admin/orders`, { headers }).then((r) => r.json()),
      fetch(`${API}/admin/inventory`, { headers }).then((r) => r.json()),
      fetch(`${API}/admin/stats`, { headers }).then((r) => r.json()),
    ]).then(([o, inv, s]) => {
      setOrders(Array.isArray(o) ? o : []);
      setInventory(Array.isArray(inv) ? inv : []);
      setStats(s);
      const stockMap: Record<string, number> = {};
      if (Array.isArray(inv)) inv.forEach((i: InventoryItem) => { stockMap[i.id] = i.stock; });
      setEditStock(stockMap);
      setLoading(false);
    });
  }, [token]);

  // ── Update order status ────────────────────────────────────────────────────

  const updateStatus = async (orderId: string, status: string) => {
    await fetch(`${API}/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.order_id === orderId ? { ...o, status } : o))
    );
    if (selectedOrder?.order_id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status } : prev);
    }
  };

  // ── Update stock ───────────────────────────────────────────────────────────

  const saveStock = async (id: string) => {
    setSaving(id);
    await fetch(`${API}/admin/inventory/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ stock: editStock[id] }),
    });
    setInventory((prev) =>
      prev.map((i) => (i.id === id ? { ...i, stock: editStock[id] } : i))
    );
    setSaving(null);
  };

  // ── Login screen ───────────────────────────────────────────────────────────

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl text-white tracking-widest uppercase">Alluring Scents</h1>
            <p className="text-xs text-[#666] tracking-widest uppercase">Admin Access</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm outline-none focus:border-[#c9a84c] transition-colors"
            />
            {loginError && <p className="text-red-400 text-xs">{loginError}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-[#c9a84c] text-black py-3 text-sm font-semibold tracking-widest uppercase hover:bg-[#b8973b] transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Order detail modal ─────────────────────────────────────────────────────

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <button
            onClick={() => setSelectedOrder(null)}
            className="text-[#666] text-sm hover:text-white transition-colors"
          >
            ← Back to orders
          </button>
          <div className="border border-[#1a1a1a] p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-[#666] tracking-widest uppercase mb-1">Order</p>
                <p className="text-xl text-[#c9a84c] tracking-widest">{selectedOrder.order_id}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${statusColor[selectedOrder.status]}`}>
                {selectedOrder.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[#666] text-xs uppercase tracking-widest mb-1">Customer</p>
                <p>{selectedOrder.first_name} {selectedOrder.last_name}</p>
                <p className="text-[#888]">{selectedOrder.email}</p>
                <p className="text-[#888]">{selectedOrder.phone}</p>
              </div>
              <div>
                <p className="text-[#666] text-xs uppercase tracking-widest mb-1">Delivery Address</p>
                <p>{selectedOrder.address}</p>
                <p className="text-[#888]">{selectedOrder.city}, {selectedOrder.province}</p>
                <p className="text-[#888]">{selectedOrder.postal_code}</p>
              </div>
            </div>

            <div className="border-t border-[#1a1a1a] pt-4">
              <p className="text-[#666] text-xs uppercase tracking-widest mb-3">Amount</p>
              <p className="text-2xl text-[#c9a84c]">{fmt(selectedOrder.amount_in_cents)}</p>
            </div>

            <div className="border-t border-[#1a1a1a] pt-4">
              <p className="text-[#666] text-xs uppercase tracking-widest mb-3">Update Status</p>
              <div className="flex gap-2 flex-wrap">
                {["succeeded", "fulfilled", "shipped"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selectedOrder.order_id, s)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                      selectedOrder.status === s
                        ? "bg-[#c9a84c] text-black border-[#c9a84c]"
                        : "border-[#333] text-[#888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#1a1a1a] pt-4 text-xs text-[#555]">
              Placed {new Date(selectedOrder.created_at).toLocaleString("en-ZA")}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main dashboard ─────────────────────────────────────────────────────────

  const standardInventory = inventory.filter((i) => i.collection === "standard");
  const privateInventory = inventory.filter((i) => i.collection === "private");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg tracking-widest uppercase">Alluring Scents</h1>
          <p className="text-xs text-[#666] tracking-widest">Admin Dashboard</p>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem("admin_token"); setToken(""); }}
          className="text-xs text-[#666] hover:text-white transition-colors uppercase tracking-widest"
        >
          Sign Out
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 text-[#666] text-sm">Loading...</div>
      ) : (
        <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Revenue", value: fmt(stats.totalRevenue) },
                { label: "Total Orders", value: stats.totalOrders },
                { label: "Pending", value: stats.pending },
                { label: "Shipped", value: stats.shipped },
              ].map((s) => (
                <div key={s.label} className="border border-[#1a1a1a] p-4 space-y-1">
                  <p className="text-xs text-[#666] uppercase tracking-widest">{s.label}</p>
                  <p className="text-2xl text-[#c9a84c]">{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Low stock alerts */}
          {stats && stats.lowStock.length > 0 && (
            <div className="border border-yellow-500/20 bg-yellow-500/5 p-4 space-y-2">
              <p className="text-xs text-yellow-400 uppercase tracking-widest">⚠ Low Stock Alerts</p>
              <div className="flex flex-wrap gap-2">
                {stats.lowStock.map((item) => (
                  <span key={`${item.fragrance_name}-${item.size}`}
                    className="text-xs bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 px-2 py-1">
                    {item.fragrance_name} {item.size} — {item.stock} left
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#1a1a1a]">
            {(["orders", "inventory"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 text-sm uppercase tracking-widest transition-colors ${
                  tab === t
                    ? "text-[#c9a84c] border-b-2 border-[#c9a84c]"
                    : "text-[#666] hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Orders tab */}
          {tab === "orders" && (
            <div className="space-y-2">
              {orders.length === 0 && (
                <p className="text-[#666] text-sm">No orders yet.</p>
              )}
              {orders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="border border-[#1a1a1a] p-4 flex items-center justify-between cursor-pointer hover:border-[#c9a84c]/30 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm text-[#c9a84c] tracking-widest">{order.order_id}</p>
                    <p className="text-sm">{order.first_name} {order.last_name}</p>
                    <p className="text-xs text-[#666]">{order.email}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm">{fmt(order.amount_in_cents)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[order.status]}`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-[#555]">
                      {new Date(order.created_at).toLocaleDateString("en-ZA")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inventory tab */}
          {tab === "inventory" && (
            <div className="space-y-8">
              {[
                { label: "Standard Collection", items: standardInventory },
                { label: "Private Collection", items: privateInventory },
              ].map(({ label, items }) => (
                <div key={label} className="space-y-3">
                  <p className="text-xs text-[#666] uppercase tracking-widest">{label}</p>
                  <div className="grid gap-2">
                    {Object.entries(
                      items.reduce<Record<string, InventoryItem[]>>((acc, item) => {
                        if (!acc[item.fragrance_name]) acc[item.fragrance_name] = [];
                        acc[item.fragrance_name].push(item);
                        return acc;
                      }, {})
                    ).map(([name, sizes]) => (
                      <div key={name} className="border border-[#1a1a1a] p-4">
                        <p className="text-sm mb-3">{name}</p>
                        <div className="grid grid-cols-3 gap-3">
                          {sizes.map((item) => (
                            <div key={item.id} className="space-y-1">
                              <p className="text-xs text-[#666] uppercase tracking-widest">{item.size}</p>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min={0}
                                  value={editStock[item.id] ?? item.stock}
                                  onChange={(e) =>
                                    setEditStock((prev) => ({
                                      ...prev,
                                      [item.id]: parseInt(e.target.value) || 0,
                                    }))
                                  }
                                  className="w-16 bg-[#111] border border-[#222] text-white px-2 py-1 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                                />
                                <button
                                  onClick={() => saveStock(item.id)}
                                  disabled={saving === item.id}
                                  className="text-xs text-[#c9a84c] hover:text-white transition-colors disabled:opacity-40"
                                >
                                  {saving === item.id ? "..." : "Save"}
                                </button>
                              </div>
                              {(editStock[item.id] ?? item.stock) <= 5 && (
                                <p className="text-xs text-yellow-500">Low stock</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}