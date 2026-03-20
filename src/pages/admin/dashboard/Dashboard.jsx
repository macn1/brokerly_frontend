import { useMemo } from "react";
import { FaBuilding, FaUsers, FaMoneyBillWave, FaStar, FaPhone, FaSwimmingPool, FaWifi, FaCar, FaDog } from "react-icons/fa";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  Title, Tooltip, Legend, ArcElement, PointElement, LineElement,
} from "chart.js";

import { useGetAllTransactionQuery } from "../../../store/api/bookings";
import { useGetAllcustomerBookingsQuery } from "../../../store/api/bookings";   // alias: AllbookingsApiView
import { useGetAllcustomerVendorBookingsQuery } from "../../../store/api/bookings"; // alias: AllbokingsDomainApiView

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

// ─── helpers ────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(n) || 0);

const SHORT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getInitials(name = "") {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

const AVATAR_COLORS = ["#3b5bdb","#0c8599","#2f9e44","#e67700","#c92a2a","#6741d9","#0f766e","#a61e4d"];
const avatarColor = (name = "") => AVATAR_COLORS[(name || "?").charCodeAt(0) % AVATAR_COLORS.length];

const VISIT_STATUS_COLOR = {
  Interested: "#3b82f6", Holding: "#f59e0b",
  Rejected: "#ef4444",   Booked: "#8b5cf6", Paid: "#22c55e",
};
const REQUEST_STATUS_COLOR = {
  Requested: "#f59e0b", Approved: "#22c55e",
  Holding: "#3b82f6",   Rejected: "#ef4444",
};

// ─── sub-components ──────────────────────────────────────────────────────────
function StatCard({ icon: Icon, iconBg, iconColor, label, value, badge, badgeBg, badgeColor }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "20px",
      border: "1px solid #f1f5f9",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      display: "flex", flexDirection: "column", gap: 4,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: iconBg, display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 8,
      }}>
        <Icon style={{ color: iconColor, fontSize: 18 }} />
      </div>
      <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em" }}>{value}</span>
        {badge && (
          <span style={{
            fontSize: 12, fontWeight: 700, background: badgeBg, color: badgeColor,
            borderRadius: 999, padding: "2px 8px",
          }}>{badge}</span>
        )}
      </div>
    </div>
  );
}

function Avatar({ name, size = 34 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: avatarColor(name), color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
    }}>{getInitials(name)}</div>
  );
}

function StatusPill({ label, colorMap }) {
  const color = colorMap[label] || "#94a3b8";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 600, padding: "3px 9px",
      borderRadius: 999,
      background: color + "18", color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
      {label}
    </span>
  );
}

function SectionCard({ title, action, children }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14, padding: "22px",
      border: "1px solid #f1f5f9",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

function Skeleton({ h = 20, w = "100%", radius = 6 }) {
  return (
    <div style={{
      height: h, width: w, borderRadius: radius,
      background: "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.4s infinite",
    }} />
  );
}

const CHART_OPTIONS_BASE = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { position: "top", labels: { font: { size: 11 }, boxWidth: 10 } } },
  scales: {
    y: { beginAtZero: true, grid: { color: "#f1f5f9" }, ticks: { font: { size: 11 } } },
    x: { grid: { display: false }, ticks: { font: { size: 11 } } },
  },
};

// ─── main component ──────────────────────────────────────────────────────────
const VendorDashboard = () => {
  const { data: transactions = [], isLoading: txLoading } = useGetAllTransactionQuery();
  const { data: bookingsResp,  isLoading: bkLoading  } = useGetAllcustomerBookingsQuery();

  // AllbookingsApiView returns paginated: { results: [...] }
  const bookings = bookingsResp?.results || [];

  // ── derived stats ──────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    let totalPaid = 0, totalPending = 0, totalApts = 0, vendorSet = new Set();
    transactions.forEach(v => {
      totalPaid    += Number(v.total_paid);
      totalPending += Number(v.total_pending);
      totalApts    += Number(v.total_apartments);
      vendorSet.add(v.id);
    });

    // unique customers from bookings
    const customerSet = new Set(bookings.map(b => b.email));

    // status breakdown from bookings
    const visitStatusCount = {};
    const requestStatusCount = {};
    bookings.forEach(b => {
      visitStatusCount[b.visit_status]     = (visitStatusCount[b.visit_status]     || 0) + 1;
      requestStatusCount[b.request_status] = (requestStatusCount[b.request_status] || 0) + 1;
    });

    return {
      vendors: vendorSet.size,
      apartments: totalApts,
      customers: customerSet.size,
      totalPaid,
      totalPending,
      visitStatusCount,
      requestStatusCount,
    };
  }, [transactions, bookings]);

  // ── bookings by month (last 6 months) ─────────────────────────────────────
  const bookingsByMonth = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      return { label: SHORT_MONTHS[d.getMonth()], year: d.getFullYear(), month: d.getMonth() };
    });
    const counts = { Booked: {}, Paid: {}, Requested: {} };
    bookings.forEach(b => {
      const d = new Date(b.created);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      ["Booked","Paid","Requested"].forEach(s => {
        if (b.visit_status === s || b.request_status === s) {
          counts[s][key] = (counts[s][key] || 0) + 1;
        }
      });
    });
    const labels = months.map(m => m.label);
    const mkData = (s) => months.map(m => counts[s][`${m.year}-${m.month}`] || 0);
    return {
      labels,
      datasets: [
        { label: "Bookings",  data: mkData("Booked"),    backgroundColor: "#3b5bdb", borderRadius: 5 },
        { label: "Paid",      data: mkData("Paid"),      backgroundColor: "#22c55e", borderRadius: 5 },
        { label: "Requested", data: mkData("Requested"), backgroundColor: "#e2e8f0", borderRadius: 5 },
      ],
    };
  }, [bookings]);

  // ── revenue per vendor (pie) ───────────────────────────────────────────────
  const vendorPieData = useMemo(() => {
    const top = [...transactions].sort((a, b) => Number(b.total_paid) - Number(a.total_paid)).slice(0, 6);
    const COLORS = ["#3b5bdb","#22c55e","#f59e0b","#ef4444","#8b5cf6","#0c8599"];
    return {
      labels: top.map(v => v.name?.split(" ")[0] || "Vendor"),
      datasets: [{ data: top.map(v => Number(v.total_paid)), backgroundColor: COLORS, borderWidth: 0 }],
    };
  }, [transactions]);

  // ── revenue trend (line) — paid per vendor cumulative ─────────────────────
  const revenueLine = useMemo(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      return { label: SHORT_MONTHS[d.getMonth()], year: d.getFullYear(), month: d.getMonth() };
    });
    // approximate: distribute total_paid evenly (real data would need payment dates)
    // use bookings where visit_status=Paid, by month
    const paidByMonth = {};
    bookings.filter(b => b.visit_status === "Paid").forEach(b => {
      const d = new Date(b.created);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      paidByMonth[key] = (paidByMonth[key] || 0) + Number(b.amount_paid || 0);
    });
    return {
      labels: months.map(m => m.label),
      datasets: [{
        label: "Revenue collected (₹)",
        data: months.map(m => paidByMonth[`${m.year}-${m.month}`] || 0),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.08)",
        tension: 0.4, fill: true, pointRadius: 4,
        pointBackgroundColor: "#22c55e",
      }],
    };
  }, [bookings]);

  // ── recent bookings (latest 5) ─────────────────────────────────────────────
  const recentBookings = useMemo(() =>
    [...bookings].sort((a, b) => new Date(b.created) - new Date(a.created)).slice(0, 5),
  [bookings]);

  // ── top vendors by apartments ──────────────────────────────────────────────
  const topVendors = useMemo(() =>
    [...transactions].sort((a, b) => Number(b.total_apartments) - Number(a.total_apartments)).slice(0, 4),
  [transactions]);

  const loading = txLoading || bkLoading;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@500;700;800&family=Nunito:wght@400;500;600;700&display=swap');
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .dash-wrap * { font-family: 'Nunito', sans-serif; box-sizing: border-box; }
        .dash-wrap h1,h2,h3 { font-family: 'Syne', sans-serif; }
        .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
        .two-col  { display: grid; grid-template-columns: 2fr 1fr; gap: 14px; }
        .equal-col{ display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .three-col{ display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        @media(max-width:900px){
          .stat-grid,.three-col{grid-template-columns:repeat(2,1fr);}
          .two-col,.equal-col{grid-template-columns:1fr;}
        }
        @media(max-width:500px){
          .stat-grid,.three-col{grid-template-columns:1fr;}
        }
      `}</style>

      <div className="dash-wrap" style={{ padding: "28px 24px", background: "#f8fafc", minHeight: "100vh" }}>

        {/* ── header ── */}
        <div style={{ marginBottom: 26, animation: "fadeUp .4s ease" }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
            Dashboard
          </h1>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: "4px 0 0" }}>
            Real-time overview across all vendors and apartments
          </p>
        </div>

        {/* ── stat cards ── */}
        <div className="stat-grid" style={{ marginBottom: 18, animation: "fadeUp .45s ease" }}>
          {loading ? (
            [1,2,3,4].map(i => (
              <div key={i} style={{ background:"#fff", borderRadius:14, padding:20, border:"1px solid #f1f5f9" }}>
                <Skeleton h={44} w={44} radius={999} /><br/>
                <Skeleton h={12} w="60%" /><br/>
                <Skeleton h={28} w="80%" />
              </div>
            ))
          ) : (<>
            <StatCard icon={FaBuilding}     iconBg="#e0f2fe" iconColor="#0284c7"
              label="Total apartments" value={stats.apartments}
              badge={`${transactions.length} vendors`} badgeBg="#f0f9ff" badgeColor="#0284c7" />
            <StatCard icon={FaUsers}        iconBg="#f0fdf4" iconColor="#16a34a"
              label="Unique customers" value={stats.customers}
              badge={`${bookings.length} leads`} badgeBg="#f0fdf4" badgeColor="#16a34a" />
            <StatCard icon={FaMoneyBillWave} iconBg="#fef9c3" iconColor="#ca8a04"
              label="Total collected" value={fmt(stats.totalPaid)}
              badge="paid" badgeBg="#fef9c3" badgeColor="#854d0e" />
            <StatCard icon={FaMoneyBillWave} iconBg="#fef2f2" iconColor="#dc2626"
              label="Total pending" value={fmt(stats.totalPending)}
              badge="to collect" badgeBg="#fef2f2" badgeColor="#b91c1c" />
          </>)}
        </div>

        {/* ── charts row 1 ── */}
        <div className="two-col" style={{ marginBottom: 18, animation: "fadeUp .5s ease" }}>
          <SectionCard title="Monthly booking activity">
            <div style={{ height: 240 }}>
              {loading ? <Skeleton h={240} /> : <Bar data={bookingsByMonth} options={CHART_OPTIONS_BASE} />}
            </div>
          </SectionCard>
          <SectionCard title="Revenue by vendor">
            <div style={{ height: 240 }}>
              {loading ? <Skeleton h={240} /> : (
                <Pie data={vendorPieData} options={{
                  responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { position: "right", labels: { font:{size:11}, boxWidth:10 } } },
                }} />
              )}
            </div>
          </SectionCard>
        </div>

        {/* ── charts row 2 ── */}
        <div className="equal-col" style={{ marginBottom: 18, animation: "fadeUp .55s ease" }}>
          <SectionCard title="Revenue trend (paid bookings)">
            <div style={{ height: 220 }}>
              {loading ? <Skeleton h={220} /> : <Line data={revenueLine} options={CHART_OPTIONS_BASE} />}
            </div>
          </SectionCard>

          {/* status breakdown */}
          <SectionCard title="Booking status breakdown">
            {loading ? (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[1,2,3,4].map(i=><Skeleton key={i} h={36} />)}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {Object.entries(stats.visitStatusCount).map(([status, count]) => {
                  const color = VISIT_STATUS_COLOR[status] || "#94a3b8";
                  const pctVal = bookings.length > 0 ? Math.round(count / bookings.length * 100) : 0;
                  return (
                    <div key={status}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                        <StatusPill label={status} colorMap={VISIT_STATUS_COLOR} />
                        <span style={{ fontSize:12, fontWeight:700, color:"#64748b" }}>{count} ({pctVal}%)</span>
                      </div>
                      <div style={{ height:5, background:"#f1f5f9", borderRadius:999, overflow:"hidden" }}>
                        <div style={{ width:`${pctVal}%`, height:"100%", background:color, borderRadius:999, transition:"width .6s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        </div>

        {/* ── bottom row ── */}
        <div className="equal-col" style={{ animation: "fadeUp .6s ease" }}>

          {/* recent bookings */}
          <SectionCard title="Recent bookings">
            {loading ? (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[1,2,3].map(i=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"center"}}>
                    <Skeleton h={36} w={36} radius={999} />
                    <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
                      <Skeleton h={12} w="60%" /><Skeleton h={10} w="40%" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentBookings.length === 0 ? (
              <p style={{ fontSize:13, color:"#94a3b8", textAlign:"center", padding:"20px 0" }}>No bookings yet.</p>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {recentBookings.map((b, i) => (
                  <div key={b.id} style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"11px 0",
                    borderBottom: i < recentBookings.length-1 ? "1px solid #f1f5f9" : "none",
                  }}>
                    <Avatar name={b.customer_name} size={36} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:"#0f172a", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                        {b.customer_name}
                      </div>
                      <div style={{ fontSize:11, color:"#94a3b8" }}>{b.apartment_name}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <StatusPill label={b.visit_status || b.request_status} colorMap={{ ...VISIT_STATUS_COLOR, ...REQUEST_STATUS_COLOR }} />
                      <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>
                        {b.amount_paid && Number(b.amount_paid) > 0 ? fmt(b.amount_paid) : "—"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          {/* top vendors */}
          <SectionCard title="Top vendors by apartments">
            {loading ? (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {[1,2,3,4].map(i=>(
                  <div key={i} style={{display:"flex",gap:10,alignItems:"center"}}>
                    <Skeleton h={36} w={36} radius={999} />
                    <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
                      <Skeleton h={12} w="55%" /><Skeleton h={8} w="80%" />
                    </div>
                  </div>
                ))}
              </div>
            ) : topVendors.length === 0 ? (
              <p style={{ fontSize:13, color:"#94a3b8", textAlign:"center", padding:"20px 0" }}>No vendor data.</p>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {topVendors.map((v, i) => {
                  const recovery = Number(v.total_paid) + Number(v.total_pending) > 0
                    ? Math.round(Number(v.total_paid) / (Number(v.total_paid) + Number(v.total_pending)) * 100) : 0;
                  return (
                    <div key={v.id} style={{
                      display:"flex", alignItems:"center", gap:12,
                      padding:"11px 0",
                      borderBottom: i < topVendors.length-1 ? "1px solid #f1f5f9" : "none",
                    }}>
                      <Avatar name={v.name} size={36} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>{v.name}</div>
                        <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:4 }}>
                          <div style={{ flex:1, height:4, background:"#f1f5f9", borderRadius:999, overflow:"hidden" }}>
                            <div style={{ width:`${recovery}%`, height:"100%", background: recovery>=70?"#22c55e":recovery>=40?"#f59e0b":"#ef4444", borderRadius:999 }} />
                          </div>
                          <span style={{ fontSize:11, color:"#64748b", fontWeight:600, flexShrink:0 }}>{recovery}%</span>
                        </div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:"#22c55e" }}>{fmt(v.total_paid)}</div>
                        <div style={{ fontSize:11, color:"#94a3b8" }}>{v.total_apartments} apts</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
