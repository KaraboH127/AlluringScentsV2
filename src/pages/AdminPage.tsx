import { useEffect, useState, useMemo, useRef } from "react";
import { Skeleton } from "../components/ui/Skeleton";

const API = import.meta.env.VITE_API_URL;

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  image: string;
}

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
  items?: OrderItem[];
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

interface Fragrance {
  id: string;
  slug: string;
  name: string;
  collection_id: string;
  description: string;
  extrait: string;
  notes: { top: string; middle: string; base: string };
  best_for: string;
  occasions: string[];
  personality: string;
  image_url: string;
  active: boolean;
}

interface Collection {
  id: string;
  name: string;
  label: string;
  tagline: string;
  description: string;
  prices: { "10ml": number; "50ml": number; "100ml": number };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (cents: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(cents / 100);

const statusColor: Record<string, string> = {
  succeeded: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  fulfilled: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  shipped:   "bg-green-500/10 text-green-400 border border-green-500/20",
};

const ALL = "all";

const emptyForm = {
  name: "", slug: "", collection_id: "standard", description: "",
  extrait: "Extrait de Parfum", best_for: "", personality: "",
  top: "", middle: "", base: "",
  occasions: "",
};

// ─── Admin Page ───────────────────────────────────────────────────────────────

export function AdminPage() {
  const [token, setToken]                   = useState(() => sessionStorage.getItem("admin_token") ?? "");
  const [password, setPassword]             = useState("");
  const [loginError, setLoginError]         = useState("");
  const [tab, setTab]                       = useState<"orders" | "inventory" | "products">("orders");
  const [orders, setOrders]                 = useState<Order[]>([]);
  const [inventory, setInventory]           = useState<InventoryItem[]>([]);
  const [stats, setStats]                   = useState<Stats | null>(null);
  const [selectedOrder, setSelectedOrder]   = useState<Order | null>(null);
  const [editStock, setEditStock]           = useState<Record<string, number>>({});
  const [saving, setSaving]                 = useState<string | null>(null);
  const [loading, setLoading]               = useState(false);
  const [search, setSearch]                 = useState("");
  const [statusFilter, setStatusFilter]     = useState(ALL);

  // Products state
  const [fragrances, setFragrances]         = useState<Fragrance[]>([]);
  const [collections, setCollections]       = useState<Collection[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [showAddForm, setShowAddForm]       = useState(false);
  const [editingFragrance, setEditingFragrance] = useState<Fragrance | null>(null);
  const [form, setForm]                     = useState(emptyForm);
  const [imageFile, setImageFile]           = useState<File | null>(null);
  const [imagePreview, setImagePreview]     = useState<string | null>(null);
  const [formSaving, setFormSaving]         = useState(false);
  const [formError, setFormError]           = useState<string | null>(null);
  const fileInputRef                        = useRef<HTMLInputElement>(null);

  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  // ── Login ──────────────────────────────────────────────────────────────────

  const handleLogin = async () => {
    setLoginError("");
    const res  = await fetch(`${API}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) { setLoginError(data.error || "Invalid password."); return; }
    sessionStorage.setItem("admin_token", data.token);
    setToken(data.token);
  };

  // ── Fetch dashboard data ───────────────────────────────────────────────────

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      fetch(`${API}/admin/orders`,    { headers }).then((r) => r.json()),
      fetch(`${API}/admin/inventory`, { headers }).then((r) => r.json()),
      fetch(`${API}/admin/stats`,     { headers }).then((r) => r.json()),
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

  // ── Fetch products when tab opens ──────────────────────────────────────────

  useEffect(() => {
    if (tab !== "products" || !token) return;
    setProductsLoading(true);
    Promise.all([
      fetch(`${API}/admin/fragrances`,  { headers }).then((r) => r.json()),
      fetch(`${API}/admin/collections`, { headers }).then((r) => r.json()),
    ]).then(([f, c]) => {
      setFragrances(Array.isArray(f) ? f : []);
      setCollections(Array.isArray(c) ? c : []);
      setProductsLoading(false);
    });
  }, [tab, token]);

  // ── Filtered orders ────────────────────────────────────────────────────────

  const filteredOrders = useMemo(() => {
    const q = search.toLowerCase().trim();
    return orders.filter((o) => {
      const matchesStatus = statusFilter === ALL || o.status === statusFilter;
      const matchesSearch =
        !q ||
        o.order_id.toLowerCase().includes(q) ||
        o.first_name.toLowerCase().includes(q) ||
        o.last_name.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  // ── Update order status ────────────────────────────────────────────────────

  const updateStatus = async (orderId: string, status: string) => {
    await fetch(`${API}/admin/orders/${orderId}/status`, {
      method: "PATCH", headers, body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => o.order_id === orderId ? { ...o, status } : o));
    setSelectedOrder((prev) => prev ? { ...prev, status } : prev);
  };

  // ── Update stock ───────────────────────────────────────────────────────────

  const saveStock = async (id: string) => {
    setSaving(id);
    await fetch(`${API}/admin/inventory/${id}`, {
      method: "PATCH", headers, body: JSON.stringify({ stock: editStock[id] }),
    });
    setInventory((prev) => prev.map((i) => i.id === id ? { ...i, stock: editStock[id] } : i));
    setSaving(null);
  };

  // ── Image handler ──────────────────────────────────────────────────────────

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ── Auto-generate slug ─────────────────────────────────────────────────────

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    }));
  };

  // ── Open edit form ─────────────────────────────────────────────────────────

  const openEdit = (f: Fragrance) => {
    setEditingFragrance(f);
    setForm({
      name: f.name,
      slug: f.slug,
      collection_id: f.collection_id,
      description: f.description,
      extrait: f.extrait,
      best_for: f.best_for,
      personality: f.personality,
      top: f.notes.top,
      middle: f.notes.middle,
      base: f.notes.base,
      occasions: f.occasions.join(", "),
    });
    setImagePreview(f.image_url);
    setImageFile(null);
    setShowAddForm(true);
  };

  // ── Reset form ─────────────────────────────────────────────────────────────

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setEditingFragrance(null);
    setShowAddForm(false);
    setFormError(null);
  };

  // ── Save fragrance ─────────────────────────────────────────────────────────

  const saveFragrance = async () => {
    setFormError(null);
    if (!form.name || !form.slug || !form.collection_id || !form.description) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (!editingFragrance && !imageFile) {
      setFormError("Please upload a product image.");
      return;
    }

    setFormSaving(true);

    try {
      let imageUrl = editingFragrance?.image_url ?? "";

      // Upload image if new one selected
      if (imageFile) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve((reader.result as string).split(",")[1]);
          reader.readAsDataURL(imageFile);
        });

        const uploadRes = await fetch(`${API}/admin/upload-image`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            base64,
            fileName: imageFile.name,
            mimeType: imageFile.type,
          }),
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Image upload failed.");
        imageUrl = uploadData.url;
      }

      const payload = {
        id: editingFragrance?.id ?? form.slug,
        slug: form.slug,
        name: form.name,
        collection_id: form.collection_id,
        description: form.description,
        extrait: form.extrait,
        best_for: form.best_for,
        personality: form.personality,
        notes: { top: form.top, middle: form.middle, base: form.base },
        occasions: form.occasions.split(",").map((o) => o.trim()).filter(Boolean),
        image_url: imageUrl,
      };

      if (editingFragrance) {
        await fetch(`${API}/admin/fragrances/${editingFragrance.id}`, {
          method: "PATCH", headers, body: JSON.stringify(payload),
        });
        setFragrances((prev) => prev.map((f) =>
          f.id === editingFragrance.id ? { ...f, ...payload } : f
        ));
      } else {
        await fetch(`${API}/admin/fragrances`, {
          method: "POST", headers, body: JSON.stringify(payload),
        });
        const refreshed = await fetch(`${API}/admin/fragrances`, { headers }).then((r) => r.json());
        setFragrances(Array.isArray(refreshed) ? refreshed : []);
      }

      resetForm();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setFormSaving(false);
    }
  };

  // ── Toggle active ──────────────────────────────────────────────────────────

  const toggleActive = async (id: string, active: boolean) => {
    await fetch(`${API}/admin/fragrances/${id}/status`, {
      method: "PATCH", headers, body: JSON.stringify({ active }),
    });
    setFragrances((prev) => prev.map((f) => f.id === id ? { ...f, active } : f));
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

  // ── Order detail view ──────────────────────────────────────────────────────

  if (selectedOrder) {
    const items: OrderItem[] = selectedOrder.items ?? [];
    const delivery = 9500;
    const subtotal = selectedOrder.amount_in_cents - delivery;

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="border-b border-[#1a1a1a] px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSelectedOrder(null)}
            className="text-[#666] text-sm hover:text-white transition-colors flex items-center gap-2">
            ← <span>Orders</span>
          </button>
          <span className={`text-xs px-3 py-1 rounded-full ${statusColor[selectedOrder.status]}`}>
            {selectedOrder.status}
          </span>
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div>
            <p className="text-xs text-[#666] tracking-widest uppercase mb-1">Order Reference</p>
            <p className="text-2xl text-[#c9a84c] tracking-widest">{selectedOrder.order_id}</p>
            <p className="text-xs text-[#555] mt-1">{new Date(selectedOrder.created_at).toLocaleString("en-ZA")}</p>
          </div>
          <div className="border border-[#1a1a1a] p-4 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div className="space-y-1">
              <p className="text-[#666] text-xs uppercase tracking-widest mb-2">Customer</p>
              <p className="text-white">{selectedOrder.first_name} {selectedOrder.last_name}</p>
              <p className="text-[#888]">{selectedOrder.email}</p>
              <p className="text-[#888]">{selectedOrder.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[#666] text-xs uppercase tracking-widest mb-2">Delivering To</p>
              <p className="text-white">{selectedOrder.address}</p>
              <p className="text-[#888]">{selectedOrder.city}, {selectedOrder.province}</p>
              <p className="text-[#888]">{selectedOrder.postal_code}</p>
            </div>
          </div>
          <div className="border border-[#1a1a1a] p-4 space-y-4">
            <p className="text-xs text-[#666] uppercase tracking-widest">Items Ordered</p>
            {items.length === 0 ? (
              <p className="text-xs text-[#555]">No item details available for this order.</p>
            ) : (
              <div className="space-y-3">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-[#1a1a1a] last:border-0">
                    <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{item.name}</p>
                      <p className="text-xs text-[#888] mt-0.5">{item.size}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-[#666]">Qty</p>
                      <p className="text-sm text-white">{item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-2 space-y-2 text-sm border-t border-[#1a1a1a]">
              <div className="flex justify-between text-[#888]"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
              <div className="flex justify-between text-[#888]"><span>Delivery</span><span>{fmt(delivery)}</span></div>
              <div className="flex justify-between text-white font-medium pt-1 border-t border-[#1a1a1a]">
                <span>Total</span><span className="text-[#c9a84c]">{fmt(selectedOrder.amount_in_cents)}</span>
              </div>
            </div>
          </div>
          <div className="border border-[#1a1a1a] p-4 space-y-3">
            <p className="text-xs text-[#666] uppercase tracking-widest">Update Status</p>
            <div className="grid grid-cols-3 gap-2">
              {["succeeded", "fulfilled", "shipped"].map((s) => (
                <button key={s} onClick={() => updateStatus(selectedOrder.order_id, s)}
                  className={`py-2 text-xs uppercase tracking-widest border transition-colors ${
                    selectedOrder.status === s
                      ? "bg-[#c9a84c] text-black border-[#c9a84c]"
                      : "border-[#333] text-[#888] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Add / Edit fragrance form ──────────────────────────────────────────────

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="border-b border-[#1a1a1a] px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={resetForm}
            className="text-[#666] text-sm hover:text-white transition-colors flex items-center gap-2">
            ← <span>Products</span>
          </button>
          <p className="text-xs text-[#666] tracking-widest uppercase">
            {editingFragrance ? "Edit Fragrance" : "Add Fragrance"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-6">

          {/* Image upload */}
          <div className="border border-[#1a1a1a] p-4 space-y-3">
            <p className="text-xs text-[#666] uppercase tracking-widest">Product Image</p>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-[#333] p-6 text-center cursor-pointer hover:border-[#c9a84c] transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded" />
              ) : (
                <p className="text-xs text-[#555]">Click to upload image</p>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {imageFile && <p className="text-xs text-[#666]">{imageFile.name}</p>}
          </div>

          {/* Basic info */}
          <div className="border border-[#1a1a1a] p-4 space-y-4">
            <p className="text-xs text-[#666] uppercase tracking-widest">Basic Info</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-[#666]">Name *</p>
                <input value={form.name} onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-[#111] border border-[#222] text-white px-3 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                  placeholder="e.g. Midnight Oud" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#666]">Slug (auto-generated)</p>
                <input value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  className="w-full bg-[#111] border border-[#222] text-[#666] px-3 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                  placeholder="e.g. midnight-oud" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-xs text-[#666]">Collection *</p>
                <select value={form.collection_id}
                  onChange={(e) => setForm((p) => ({ ...p, collection_id: e.target.value }))}
                  className="w-full bg-[#111] border border-[#222] text-white px-3 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors">
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-xs text-[#666]">Description *</p>
                <textarea value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  rows={2}
                  className="w-full bg-[#111] border border-[#222] text-white px-3 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors resize-none"
                  placeholder="A short poetic description..." />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#666]">Best For</p>
                <input value={form.best_for} onChange={(e) => setForm((p) => ({ ...p, best_for: e.target.value }))}
                  className="w-full bg-[#111] border border-[#222] text-white px-3 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                  placeholder="e.g. Evening elegance" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-[#666]">Personality</p>
                <input value={form.personality} onChange={(e) => setForm((p) => ({ ...p, personality: e.target.value }))}
                  className="w-full bg-[#111] border border-[#222] text-white px-3 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                  placeholder="e.g. Bold, magnetic, refined" />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-xs text-[#666]">Occasions (comma separated)</p>
                <input value={form.occasions} onChange={(e) => setForm((p) => ({ ...p, occasions: e.target.value }))}
                  className="w-full bg-[#111] border border-[#222] text-white px-3 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                  placeholder="e.g. Date nights, Formal events, Winter evenings" />
              </div>
            </div>
          </div>

          {/* Fragrance notes */}
          <div className="border border-[#1a1a1a] p-4 space-y-4">
            <p className="text-xs text-[#666] uppercase tracking-widest">Fragrance Notes</p>
            <div className="space-y-3">
              {(["top", "middle", "base"] as const).map((note) => (
                <div key={note} className="space-y-1">
                  <p className="text-xs text-[#666] capitalize">{note} Notes</p>
                  <input
                    value={form[note]}
                    onChange={(e) => setForm((p) => ({ ...p, [note]: e.target.value }))}
                    className="w-full bg-[#111] border border-[#222] text-white px-3 py-2 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                    placeholder={
                      note === "top" ? "e.g. Bergamot and pink pepper" :
                      note === "middle" ? "e.g. Rose and jasmine" :
                      "e.g. Sandalwood and musk"
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {formError && (
            <div className="border border-red-500/20 bg-red-500/5 p-3">
              <p className="text-sm text-red-400">{formError}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={resetForm}
              className="flex-1 py-3 text-xs uppercase tracking-widest border border-[#333] text-[#666] hover:border-white hover:text-white transition-colors">
              Cancel
            </button>
            <button onClick={saveFragrance} disabled={formSaving}
              className="flex-1 py-3 text-xs uppercase tracking-widest bg-[#c9a84c] text-black hover:bg-[#b8973b] transition-colors disabled:opacity-40">
              {formSaving ? "Saving..." : editingFragrance ? "Save Changes" : "Add Fragrance"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Main dashboard ─────────────────────────────────────────────────────────

  const standardInventory = inventory.filter((i) => i.collection === "standard");
  const privateInventory  = inventory.filter((i) => i.collection === "private");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Header */}
      <div className="border-b border-[#1a1a1a] px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base sm:text-lg tracking-widest uppercase">Alluring Scents</h1>
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
        <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-[#1a1a1a] p-4 space-y-2">
                <Skeleton variant="dark" className="h-3 w-20" />
                <Skeleton variant="dark" className="h-7 w-24" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="border border-[#1a1a1a] p-4 flex items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <Skeleton variant="dark" className="h-4 w-24" />
                  <Skeleton variant="dark" className="h-4 w-40" />
                </div>
                <div className="space-y-2 flex-shrink-0">
                  <Skeleton variant="dark" className="h-4 w-16" />
                  <Skeleton variant="dark" className="h-5 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 sm:px-6 py-6 max-w-6xl mx-auto space-y-6">

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total Revenue", value: fmt(stats.totalRevenue) },
                { label: "Total Orders",  value: stats.totalOrders },
                { label: "Pending",       value: stats.pending },
                { label: "Shipped",       value: stats.shipped },
              ].map((s) => (
                <div key={s.label} className="border border-[#1a1a1a] p-4 space-y-1">
                  <p className="text-xs text-[#666] uppercase tracking-widest">{s.label}</p>
                  <p className="text-xl sm:text-2xl text-[#c9a84c]">{s.value}</p>
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
            {(["orders", "inventory", "products"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`pb-3 text-sm uppercase tracking-widest transition-colors ${
                  tab === t
                    ? "text-[#c9a84c] border-b-2 border-[#c9a84c]"
                    : "text-[#666] hover:text-white"
                }`}>
                {t}
              </button>
            ))}
          </div>

          {/* Orders tab */}
          {tab === "orders" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input type="text" placeholder="Search by name, email, order ID, phone..."
                  value={search} onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-[#111] border border-[#222] text-white px-4 py-2.5 text-sm outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#444]" />
                <div className="flex gap-2 flex-wrap">
                  {[ALL, "succeeded", "fulfilled", "shipped"].map((s) => (
                    <button key={s} onClick={() => setStatusFilter(s)}
                      className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors whitespace-nowrap ${
                        statusFilter === s
                          ? "bg-[#c9a84c] text-black border-[#c9a84c]"
                          : "border-[#333] text-[#666] hover:border-[#c9a84c] hover:text-[#c9a84c]"
                      }`}>
                      {s === ALL ? "All" : s}
                    </button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#555]">
                {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
                {statusFilter !== ALL && ` · ${statusFilter}`}
                {search && ` · "${search}"`}
              </p>
              {filteredOrders.length === 0 ? (
                <div className="border border-[#1a1a1a] p-8 text-center">
                  <p className="text-[#666] text-sm">No orders match your search.</p>
                  <button onClick={() => { setSearch(""); setStatusFilter(ALL); }}
                    className="mt-3 text-xs text-[#c9a84c] hover:text-white transition-colors">
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div key={order.id} onClick={() => setSelectedOrder(order)}
                    className="border border-[#1a1a1a] p-4 flex items-center justify-between cursor-pointer hover:border-[#c9a84c]/30 transition-colors gap-4">
                    <div className="space-y-1 min-w-0">
                      <p className="text-sm text-[#c9a84c] tracking-widest">{order.order_id}</p>
                      <p className="text-sm truncate">{order.first_name} {order.last_name}</p>
                      <p className="text-xs text-[#666] truncate hidden sm:block">{order.email}</p>
                    </div>
                    <div className="text-right space-y-1 shrink-0">
                      <p className="text-sm">{fmt(order.amount_in_cents)}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full inline-block ${statusColor[order.status]}`}>
                        {order.status}
                      </span>
                      <p className="text-xs text-[#555]">{new Date(order.created_at).toLocaleDateString("en-ZA")}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Inventory tab */}
          {tab === "inventory" && (
            <div className="space-y-8">
              {[
                { label: "Standard Collection", items: standardInventory },
                { label: "Private Collection",  items: privateInventory },
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
                        <p className="text-sm mb-4">{name}</p>
                        <div className="grid grid-cols-3 gap-3">
                          {sizes.map((item) => (
                            <div key={item.id} className="space-y-2">
                              <p className="text-xs text-[#666] uppercase tracking-widest">{item.size}</p>
                              <div className="flex items-center gap-2">
                                <input type="number" min={0}
                                  value={editStock[item.id] ?? item.stock}
                                  onChange={(e) => setEditStock((prev) => ({
                                    ...prev, [item.id]: parseInt(e.target.value) || 0,
                                  }))}
                                  className="w-14 sm:w-16 bg-[#111] border border-[#222] text-white px-2 py-1 text-sm outline-none focus:border-[#c9a84c] transition-colors"
                                />
                                <button onClick={() => saveStock(item.id)} disabled={saving === item.id}
                                  className="text-xs text-[#c9a84c] hover:text-white transition-colors disabled:opacity-40">
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

          {/* Products tab */}
          {tab === "products" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#666] uppercase tracking-widest">
                  {fragrances.length} {fragrances.length === 1 ? "fragrance" : "fragrances"}
                </p>
                <button onClick={() => { resetForm(); setShowAddForm(true); }}
                  className="px-4 py-2 text-xs uppercase tracking-widest bg-[#c9a84c] text-black hover:bg-[#b8973b] transition-colors">
                  + Add Fragrance
                </button>
              </div>

              {productsLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border border-[#1a1a1a] p-4 flex items-center gap-4">
                      <Skeleton variant="dark" className="w-14 h-14 rounded flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton variant="dark" className="h-4 w-32" />
                        <Skeleton variant="dark" className="h-3 w-20" />
                      </div>
                      <Skeleton variant="dark" className="h-7 w-16" />
                    </div>
                  ))}
                </div>
              ) : fragrances.length === 0 ? (
                <div className="border border-[#1a1a1a] p-8 text-center">
                  <p className="text-[#666] text-sm">No fragrances yet.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {fragrances.map((f) => (
                    <div key={f.id}
                      className={`border p-4 flex items-center gap-4 transition-colors ${
                        f.active ? "border-[#1a1a1a]" : "border-[#1a1a1a] opacity-50"
                      }`}>
                      <img src={f.image_url} alt={f.name}
                        className="w-14 h-14 object-cover rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-sm text-white font-medium">{f.name}</p>
                        <p className="text-xs text-[#666] capitalize">{f.collection_id} collection</p>
                        <p className="text-xs text-[#555] truncate">{f.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => openEdit(f)}
                          className="px-3 py-1.5 text-xs uppercase tracking-widest border border-[#333] text-[#888] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                          Edit
                        </button>
                        <button onClick={() => toggleActive(f.id, !f.active)}
                          className={`px-3 py-1.5 text-xs uppercase tracking-widest border transition-colors ${
                            f.active
                              ? "border-green-500/30 text-green-400 hover:border-red-500/30 hover:text-red-400"
                              : "border-[#333] text-[#555] hover:border-green-500/30 hover:text-green-400"
                          }`}>
                          {f.active ? "Active" : "Inactive"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}