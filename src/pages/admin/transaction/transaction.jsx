import { useState, useMemo } from "react";
import { useGetAllTransactionQuery } from "../../../store/api/bookings";

const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(n) || 0);

const pct = (paid, pending) => {
  const total = Number(paid) + Number(pending);
  return total > 0 ? Math.round((Number(paid) / total) * 100) : 0;
};

const STATUS_STYLES = {
  Confirmed:   { bg: "#e6f4ea", color: "#1e6b3c", dot: "#34a853" },
  Pending:     { bg: "#fef9e7", color: "#856404", dot: "#f59e0b" },
  Cancelled:   { bg: "#fdecea", color: "#922b21", dot: "#ef4444" },
  "Checked In":  { bg: "#e8f4fd", color: "#1a5276", dot: "#3b82f6" },
  "Checked Out": { bg: "#f3e8fd", color: "#5b2c6f", dot: "#8b5cf6" },
  Completed:   { bg: "#e6f4ea", color: "#1e6b3c", dot: "#34a853" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: "#f1f1f1", color: "#555", dot: "#999" };
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide"
      style={{ background: s.bg, color: s.color }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
      {status}
    </span>
  );
}

function Avatar({ name }) {
  const initials = (name || "?").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#3b5bdb","#0c8599","#2f9e44","#e67700","#c92a2a","#6741d9","#0f766e"];
  const bg = colors[(name || "").charCodeAt(0) % colors.length];
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
      style={{ background: bg }}>
      {initials}
    </div>
  );
}

function RecoveryBar({ paid, pending }) {
  const recovery = pct(paid, pending);
  const color = recovery >= 80 ? "#22c55e" : recovery >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${recovery}%`, background: color }} />
      </div>
      <span className="text-xs font-semibold min-w-[36px] text-right" style={{ color }}>{recovery}%</span>
    </div>
  );
}

function ApartmentRow({ apt }) {
  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-gray-800">{apt.name}</td>
      <td className="px-4 py-3"><StatusBadge status={apt.availability} /></td>
      <td className="px-4 py-3 text-sm font-semibold text-emerald-600">{fmt(apt.paid)}</td>
      <td className="px-4 py-3 text-sm font-semibold text-amber-600">{fmt(apt.pending)}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-700">{fmt(Number(apt.paid) + Number(apt.pending))}</td>
      <td className="px-4 py-3 min-w-[120px]"><RecoveryBar paid={apt.paid} pending={apt.pending} /></td>
    </tr>
  );
}

function VendorRow({ vendor }) {
  const [open, setOpen] = useState(false);
  const totalAmount = Number(vendor.total_paid) + Number(vendor.total_pending);
  const recovery = pct(vendor.total_paid, vendor.total_pending);
  const recoveryColor = recovery >= 80 ? "#22c55e" : recovery >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <>
      <tr
        onClick={() => setOpen(o => !o)}
        className="group cursor-pointer transition-all duration-200 border-b border-gray-100 hover:bg-gray-50/80"
        style={{ background: open ? "#fafafc" : "white" }}
      >
        {/* Vendor Info */}
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <Avatar name={vendor.name} />
            <div>
              <div className="text-sm font-semibold text-gray-800">{vendor.name}</div>
              <div className="text-xs text-gray-400">{vendor.email}</div>
            </div>
          </div>
        </td>
        
        {/* Apartments count */}
        <td className="px-5 py-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
            {vendor.total_apartments} {vendor.total_apartments !== 1 ? "units" : "unit"}
          </span>
        </td>
        
        {/* Paid */}
        <td className="px-5 py-4">
          <span className="text-sm font-bold text-emerald-600">{fmt(vendor.total_paid)}</span>
        </td>
        
        {/* Pending */}
        <td className="px-5 py-4">
          <span className="text-sm font-bold text-amber-600">{fmt(vendor.total_pending)}</span>
        </td>
        
        {/* Total */}
        <td className="px-5 py-4">
          <span className="text-sm font-semibold text-gray-800">{fmt(totalAmount)}</span>
        </td>
        
        {/* Recovery */}
        <td className="px-5 py-4 min-w-[140px]">
          <RecoveryBar paid={vendor.total_paid} pending={vendor.total_pending} />
        </td>
        
        {/* Expand Icon */}
        <td className="px-5 py-4 text-center">
          <div className={`
            w-7 h-7 rounded-lg flex items-center justify-center mx-auto transition-all duration-200
            ${open ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}
          `}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200">
              <path
                d={open ? "M2 8l4-4 4 4" : "M2 4l4 4 4-4"}
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
        </td>
      </tr>

      {/* Expanded Apartments Section */}
      {open && (
        <tr>
          <td colSpan={7} className="p-0 bg-gray-50/50">
            <div className="pl-12 pr-6 pb-5 pt-2">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-5 py-3 bg-gray-50/80 border-b border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Apartment Details</h4>
                </div>
                {vendor.apartments && vendor.apartments.length > 0 ? (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/30">
                        {["Apartment", "Status", "Paid", "Pending", "Total", "Recovery"].map(h => (
                          <th key={h} className="px-4 py-2.5 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {vendor.apartments.map(apt => <ApartmentRow key={apt.id} apt={apt} />)}
                    </tbody>
                  </table>
                ) : (
                  <div className="py-8 text-center text-sm text-gray-400">No apartments found for this vendor.</div>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function StatCard({ label, value, sub, icon, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
          <div className="text-2xl font-extrabold text-gray-800 tracking-tight">{value}</div>
          {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}10`, color }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function VendorTransactions() {
  const { data, isLoading, isError, refetch } = useGetAllTransactionQuery();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("paid_desc");

  const vendors = data || [];

  const stats = useMemo(() => {
    let totalPaid = 0, totalPending = 0, totalApts = 0;
    vendors.forEach(v => {
      totalPaid += Number(v.total_paid);
      totalPending += Number(v.total_pending);
      totalApts += Number(v.total_apartments);
    });
    return { totalPaid, totalPending, totalApts, count: vendors.length };
  }, [vendors]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = vendors.filter(v =>
      (v.name || "").toLowerCase().includes(q) ||
      (v.email || "").toLowerCase().includes(q)
    );
    const sorts = {
      paid_desc:    (a, b) => Number(b.total_paid) - Number(a.total_paid),
      paid_asc:     (a, b) => Number(a.total_paid) - Number(b.total_paid),
      pending_desc: (a, b) => Number(b.total_pending) - Number(a.total_pending),
      apts_desc:    (a, b) => Number(b.total_apartments) - Number(a.total_apartments),
      name_asc:     (a, b) => (a.name || "").localeCompare(b.name || ""),
    };
    return [...list].sort(sorts[sortBy] || sorts.paid_desc);
  }, [vendors, search, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 font-sans p-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Vendor Transactions
            </h1>
            <p className="text-gray-500 text-sm mt-1">Track payments and recovery across all vendors</p>
          </div>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12.5 7A5.5 5.5 0 1 1 7 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M7 1.5L9.5 4 7 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            label="Total Vendors" 
            value={stats.count} 
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
            color="#6366f1" 
          />
          <StatCard 
            label="Total Apartments" 
            value={stats.totalApts} 
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>}
            color="#0ea5e9" 
          />
          <StatCard 
            label="Total Collected" 
            value={fmt(stats.totalPaid)} 
            sub="amount paid"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>}
            color="#22c55e" 
          />
          <StatCard 
            label="Total Pending" 
            value={fmt(stats.totalPending)} 
            sub="yet to collect"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>}
            color="#f59e0b" 
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by vendor name or email..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
          >
            <option value="paid_desc">💰 Paid: High to Low</option>
            <option value="paid_asc">💰 Paid: Low to High</option>
            <option value="pending_desc">⏳ Pending: High to Low</option>
            <option value="apts_desc">🏢 Most Apartments</option>
            <option value="name_asc">📛 Name A–Z</option>
          </select>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          
          {isLoading && (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-3 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
              <div className="text-sm text-gray-400 mt-3">Loading transactions...</div>
            </div>
          )}

          {isError && (
            <div className="py-16 text-center">
              <div className="text-4xl mb-2">⚠️</div>
              <div className="text-sm font-semibold text-red-500">Failed to load data</div>
              <div className="text-xs text-gray-400 mt-1">Check your connection and try again.</div>
            </div>
          )}

          {!isLoading && !isError && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/80">
                      {["Vendor", "Apartments", "Total paid", "Pending", "Total value", "Recovery", ""].map((h, i) => (
                        <th key={i} className="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-sm text-gray-400">
                          No vendors match your search.
                        </td>
                      </tr>
                    ) : (
                      filtered.map(vendor => <VendorRow key={vendor.id} vendor={vendor} />)
                    )}
                  </tbody>
                </table>
              </div>
              
              {filtered.length > 0 && (
                <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/30 text-xs text-gray-400">
                  Showing {filtered.length} of {vendors.length} vendor{vendors.length !== 1 ? "s" : ""}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}