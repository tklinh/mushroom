import { useState } from "react";

const fmt = (n) => new Intl.NumberFormat("vi-VN").format(Math.round(n));

const SECTIONS = ["Tổng quan", "Chi phí đầu tư", "Dòng tiền", "Phân tích rủi ro"];

// ---- Dữ liệu mặc định (tính trên 1ha, nhân diện tích) ----
const COST_DATA = {
  "🌱 Chi phí một lần (Năm 1)": [
    { item: "Cây giống MD2 (57.000 cây × 2.500đ)", perHa: 142_500_000, note: "Giống nuôi cấy mô trong nước ~2.000–3.000đ/chồi" },
    { item: "Làm đất, lên luống, rãnh thoát nước", perHa: 15_000_000, note: "Máy cày, cuốc, san đất" },
    { item: "Màng phủ nông nghiệp đục lỗ", perHa: 12_000_000, note: "~12 triệu/ha, bền 2–3 vụ" },
    { item: "Hệ thống tưới nhỏ giọt / phun mưa", perHa: 25_000_000, note: "Đường ống, béc phun, máy bơm" },
    { item: "Phân bón lót (hữu cơ + lân)", perHa: 8_000_000, note: "500–700 kg vôi + phân hữu cơ" },
    { item: "Thuốc xử lý đất & chồi giống", perHa: 3_000_000, note: "Supracide, Aliette..." },
    { item: "Nhân công trồng", perHa: 10_000_000, note: "~15–20 công/ha" },
  ],
  "🔄 Chi phí chăm sóc định kỳ (18 tháng/vụ)": [
    { item: "Phân bón thúc (N-P-K, hữu cơ)", perHa: 35_000_000, note: "Bón 4–6 lần/chu kỳ" },
    { item: "Thuốc BVTV (rệp sáp, nấm bệnh)", perHa: 12_000_000, note: "Phun 5–6 tuần/lần" },
    { item: "Nhân công chăm sóc & làm cỏ", perHa: 20_000_000, note: "Giảm 70% nhờ màng phủ" },
    { item: "Tưới nước & điện năng", perHa: 8_000_000, note: "Tưới 10 ngày/lần mùa khô" },
    { item: "Xử lý ra hoa (Ethephon/khí Ethylene)", perHa: 5_000_000, note: "Rải vụ chủ động" },
  ],
  "📦 Chi phí thu hoạch & sau thu hoạch": [
    { item: "Nhân công thu hoạch", perHa: 8_000_000, note: "~50 tấn × 150.000đ/tấn" },
    { item: "Phân loại, đóng gói (thùng carton)", perHa: 15_000_000, note: "Tiêu chuẩn xuất khẩu tươi" },
    { item: "Kho lạnh / vận chuyển lạnh", perHa: 10_000_000, note: "7–8°C, xe lạnh đến cảng/KCN" },
    { item: "Chi phí kiểm định chất lượng, truy xuất", perHa: 5_000_000, note: "Lấy mẫu, hồ sơ nhật ký" },
  ],
  "🏆 Chi phí chứng nhận GlobalGAP (một lần)": [
    { item: "Tư vấn & đào tạo quy trình GlobalGAP", perHa: 5_000_000, note: "Chia đều cho toàn trang trại" },
    { item: "Lệ phí chứng nhận GlobalGAP", perHa: 8_000_000, note: "~40–80 triệu/trang trại, chia theo ha" },
    { item: "Đầu tư nhà vệ sinh, kho phân bón đạt chuẩn", perHa: 5_000_000, note: "Yêu cầu bắt buộc của GlobalGAP" },
  ],
};

const REVENUE_SCENARIOS = [
  {
    name: "🔴 Thấp (không đạt chuẩn XK)",
    yield: 40,
    price: 8_000,
    ratio1: 0.6,
    color: "#ef4444",
  },
  {
    name: "🟡 Trung bình (VietGAP)",
    yield: 50,
    price: 12_000,
    ratio1: 0.75,
    color: "#f59e0b",
  },
  {
    name: "🟢 Tốt (GlobalGAP – XK tươi)",
    yield: 60,
    price: 20_000,
    ratio1: 0.85,
    color: "#10b981",
  },
  {
    name: "🌟 Xuất sắc (GlobalGAP – Nhật/Hàn)",
    yield: 75,
    price: 22_000,
    ratio1: 0.90,
    color: "#6366f1",
  },
];

export default function App() {
  const [area, setArea] = useState(7);
  const [activeSection, setActiveSection] = useState("Tổng quan");
  const [scenario, setScenario] = useState(2);

  // Tính chi phí
  const allCosts = Object.values(COST_DATA).flat();
  const totalPerHa = allCosts.reduce((s, c) => s + c.perHa, 0);
  const totalFarm = totalPerHa * area;

  const oneTimeCosts = [...COST_DATA["🌱 Chi phí một lần (Năm 1)"], ...COST_DATA["🏆 Chi phí chứng nhận GlobalGAP (một lần)"]];
  const ongoingCosts = [...COST_DATA["🔄 Chi phí chăm sóc định kỳ (18 tháng/vụ)"], ...COST_DATA["📦 Chi phí thu hoạch & sau thu hoạch"]];
  const oneTimeTotalHa = oneTimeCosts.reduce((s, c) => s + c.perHa, 0);
  const ongoingTotalHa = ongoingCosts.reduce((s, c) => s + c.perHa, 0);

  // Doanh thu
  const sc = REVENUE_SCENARIOS[scenario];
  const revenuePerHa = sc.yield * 1000 * sc.price;
  const revenueFarm = revenuePerHa * area;
  const profitPerHa = revenuePerHa - totalPerHa;
  const profitFarm = profitPerHa * area;
  const roi = (profitFarm / totalFarm * 100).toFixed(1);
  const payback = (totalFarm / profitFarm).toFixed(1);

  // Dòng tiền theo năm (trang trại)
  const cashflow = [
    { year: "Năm 1 (Đầu tư + trồng)", invest: -(oneTimeTotalHa * area), operate: -(ongoingTotalHa * area * 0.5), revenue: 0 },
    { year: "Năm 2 (Thu hoạch vụ 1)", invest: 0, operate: -(ongoingTotalHa * area), revenue: revenueFarm * 0.9 },
    { year: "Năm 3 (Vụ 2 + chồi con)", invest: -(5_000_000 * area), operate: -(ongoingTotalHa * area), revenue: revenueFarm * 1.0 },
    { year: "Năm 4 (Ổn định)", invest: 0, operate: -(ongoingTotalHa * area), revenue: revenueFarm * 1.05 },
    { year: "Năm 5 (Đỉnh cao)", invest: 0, operate: -(ongoingTotalHa * area), revenue: revenueFarm * 1.1 },
  ];

  let cumulative = 0;
  const cfWithCum = cashflow.map(r => {
    const net = r.invest + r.operate + r.revenue;
    cumulative += net;
    return { ...r, net, cumulative };
  });

  const risks = [
    { risk: "Giá xuất khẩu biến động", level: "Cao", impact: "Mất 30–50% lợi nhuận", mitigation: "Ký hợp đồng bao tiêu dài hạn (Nafoods, DOVECO, Westfood) trước khi trồng" },
    { risk: "Không đạt chứng nhận GlobalGAP", level: "Trung bình", impact: "Giá giảm 40–60%", mitigation: "Mời kỹ sư tư vấn ngay từ đầu, ghi nhật ký đồng ruộng đầy đủ" },
    { risk: "Bệnh thối nõn (Phytophthora)", level: "Trung bình", impact: "Mất 10–30% sản lượng", mitigation: "Dùng giống nuôi cấy mô sạch bệnh, xử lý đất & chồi trước trồng" },
    { risk: "Rệp sáp lây lan", level: "Cao", impact: "Hỏng cả lô hàng XK", mitigation: "Phun định kỳ 5–6 tuần/lần, kiểm tra trước đóng gói" },
    { risk: "Thời tiết lạnh miền Bắc", level: "Trung bình", impact: "Cây chậm lớn, chất lượng kém", mitigation: "Trồng tháng 3–4 hoặc 8–9, tránh trồng tháng 11–2" },
    { risk: "Chi phí giống cao (nhập khẩu)", level: "Cao", impact: "Áp lực vốn lớn", mitigation: "Ưu tiên giống nuôi cấy mô trong nước (2.000–3.000đ/chồi)" },
    { risk: "Thiếu lao động lành nghề", level: "Thấp", impact: "Chất lượng canh tác giảm", mitigation: "Đào tạo công nhân, ứng dụng cơ giới hóa" },
    { risk: "Logistics / kho lạnh xa cảng", level: "Trung bình", impact: "Tăng chi phí, mất chất lượng", mitigation: "Liên kết với doanh nghiệp có kho lạnh, đặt tại Thanh Hóa/Nghệ An" },
  ];

  const levelColor = { "Cao": "bg-red-100 text-red-700", "Trung bình": "bg-yellow-100 text-yellow-700", "Thấp": "bg-green-100 text-green-700" };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "0 auto", padding: 16, background: "#f8fafc" }}>
      <div style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", borderRadius: 16, padding: "24px 28px", color: "white", marginBottom: 20 }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>🍍 Dự toán Trang trại Dứa MD2</div>
        <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>Miền Bắc (Thanh Hóa / Nghệ An) · Xuất khẩu tươi · Chuẩn GlobalGAP</div>
        <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Diện tích trang trại:</label>
          {[5, 6, 7, 8, 9, 10].map(v => (
            <button key={v} onClick={() => setArea(v)}
              style={{ padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
                background: area === v ? "white" : "rgba(255,255,255,0.2)", color: area === v ? "#16a34a" : "white" }}>
              {v} ha
            </button>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {SECTIONS.map(s => (
          <button key={s} onClick={() => setActiveSection(s)}
            style={{ padding: "8px 18px", borderRadius: 24, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14,
              background: activeSection === s ? "#16a34a" : "white", color: activeSection === s ? "white" : "#374151",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
            {s}
          </button>
        ))}
      </div>

      {/* ===== TỔNG QUAN ===== */}
      {activeSection === "Tổng quan" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 12, marginBottom: 20 }}>
            {[
              { label: "Tổng đầu tư", value: fmt(totalFarm), unit: "đồng", color: "#ef4444" },
              { label: "Đầu tư/ha", value: fmt(totalPerHa), unit: "đồng/ha", color: "#f59e0b" },
              { label: "Doanh thu/vụ (dự kiến)", value: fmt(revenueFarm), unit: "đồng", color: "#10b981" },
              { label: "Lợi nhuận/vụ", value: fmt(profitFarm), unit: "đồng", color: "#6366f1" },
              { label: "ROI vụ đầu", value: `${roi}%`, unit: "", color: "#0ea5e9" },
              { label: "Hoàn vốn", value: `${payback} vụ`, unit: "≈ " + Math.round(parseFloat(payback) * 18 / 12) + " năm", color: "#8b5cf6" },
            ].map((c, i) => (
              <div key={i} style={{ background: "white", borderRadius: 12, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", borderTop: `4px solid ${c.color}` }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: c.color }}>{c.value}</div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>{c.unit}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 15 }}>📊 Chọn kịch bản doanh thu</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
              {REVENUE_SCENARIOS.map((s, i) => (
                <div key={i} onClick={() => setScenario(i)} style={{ padding: 12, borderRadius: 10, border: `2px solid ${scenario === i ? s.color : "#e5e7eb"}`,
                  background: scenario === i ? `${s.color}10` : "white", cursor: "pointer" }}>
                  <div style={{ fontWeight: 700, color: s.color, fontSize: 13 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "#374151", marginTop: 4 }}>NS: {s.yield} tấn/ha · Giá: {fmt(s.price)}đ/kg</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Tỷ lệ loại 1: {(s.ratio1 * 100).toFixed(0)}%</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fefce8", borderRadius: 12, padding: 16, borderLeft: "4px solid #f59e0b", fontSize: 13, color: "#78350f" }}>
            <b>⚡ Điểm mấu chốt:</b> Giá dứa đạt chuẩn GlobalGAP xuất khẩu (~20.000đ/kg) cao gấp 2–3 lần canh tác truyền thống (~7.000–8.000đ/kg). Toàn bộ chiến lược kinh tế phụ thuộc vào việc đạt và duy trì chứng nhận này.
          </div>
        </div>
      )}

      {/* ===== CHI PHÍ ===== */}
      {activeSection === "Chi phí đầu tư" && (
        <div>
          {Object.entries(COST_DATA).map(([section, items]) => (
            <div key={section} style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>{section}</div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    <th style={{ textAlign: "left", padding: "8px 10px", color: "#6b7280", fontWeight: 600 }}>Hạng mục</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", color: "#6b7280", fontWeight: 600 }}>Đơn giá/ha</th>
                    <th style={{ textAlign: "right", padding: "8px 10px", color: "#6b7280", fontWeight: 600 }}>{area} ha</th>
                    <th style={{ textAlign: "left", padding: "8px 10px", color: "#6b7280", fontWeight: 600 }}>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((r, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #f3f4f6" }}>
                      <td style={{ padding: "8px 10px" }}>{r.item}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 600 }}>{fmt(r.perHa)}</td>
                      <td style={{ padding: "8px 10px", textAlign: "right", color: "#16a34a", fontWeight: 700 }}>{fmt(r.perHa * area)}</td>
                      <td style={{ padding: "8px 10px", color: "#6b7280", fontSize: 12 }}>{r.note}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "2px solid #e5e7eb", background: "#f9fafb" }}>
                    <td style={{ padding: "8px 10px", fontWeight: 700 }}>Tổng nhóm</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700 }}>{fmt(items.reduce((s,c)=>s+c.perHa,0))}</td>
                    <td style={{ padding: "8px 10px", textAlign: "right", fontWeight: 700, color: "#dc2626" }}>{fmt(items.reduce((s,c)=>s+c.perHa,0)*area)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          <div style={{ background: "#16a34a", color: "white", borderRadius: 12, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>💰 TỔNG CHI PHÍ TOÀN TRANG TRẠI ({area} ha)</span>
            <span style={{ fontSize: 22, fontWeight: 900 }}>{fmt(totalFarm)} đồng</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280", textAlign: "right" }}>
            Tương đương: <b>{fmt(totalPerHa)}</b> đồng/ha · Nguồn tham chiếu: Hiệp hội Rau quả VN (120–130 triệu/ha cơ bản + GlobalGAP)
          </div>
        </div>
      )}

      {/* ===== DÒNG TIỀN ===== */}
      {activeSection === "Dòng tiền" && (
        <div>
          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>📈 Dòng tiền dự kiến – {area} ha</div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 16 }}>Kịch bản: <b style={{ color: REVENUE_SCENARIOS[scenario].color }}>{REVENUE_SCENARIOS[scenario].name}</b></div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th style={{ textAlign: "left", padding: "10px", color: "#6b7280", fontWeight: 600 }}>Giai đoạn</th>
                  <th style={{ textAlign: "right", padding: "10px", color: "#6b7280", fontWeight: 600 }}>Đầu tư ban đầu</th>
                  <th style={{ textAlign: "right", padding: "10px", color: "#6b7280", fontWeight: 600 }}>Chi phí vận hành</th>
                  <th style={{ textAlign: "right", padding: "10px", color: "#6b7280", fontWeight: 600 }}>Doanh thu</th>
                  <th style={{ textAlign: "right", padding: "10px", color: "#6b7280", fontWeight: 600 }}>Dòng tiền ròng</th>
                  <th style={{ textAlign: "right", padding: "10px", color: "#6b7280", fontWeight: 600 }}>Lũy kế</th>
                </tr>
              </thead>
              <tbody>
                {cfWithCum.map((r, i) => (
                  <tr key={i} style={{ borderTop: "1px solid #f3f4f6", background: r.cumulative >= 0 ? "#f0fdf4" : "white" }}>
                    <td style={{ padding: "10px", fontWeight: 600 }}>{r.year}</td>
                    <td style={{ padding: "10px", textAlign: "right", color: "#ef4444" }}>{r.invest < 0 ? `-${fmt(-r.invest)}` : "—"}</td>
                    <td style={{ padding: "10px", textAlign: "right", color: "#f59e0b" }}>{fmt(-r.operate)}</td>
                    <td style={{ padding: "10px", textAlign: "right", color: "#16a34a", fontWeight: 700 }}>{r.revenue > 0 ? fmt(r.revenue) : "—"}</td>
                    <td style={{ padding: "10px", textAlign: "right", fontWeight: 700, color: r.net >= 0 ? "#16a34a" : "#ef4444" }}>
                      {r.net >= 0 ? "+" : ""}{fmt(r.net)}
                    </td>
                    <td style={{ padding: "10px", textAlign: "right", fontWeight: 700, color: r.cumulative >= 0 ? "#16a34a" : "#6b7280" }}>
                      {r.cumulative >= 0 ? "+" : ""}{fmt(r.cumulative)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#f0fdf4", borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, color: "#16a34a", marginBottom: 8 }}>✅ Điểm hoà vốn</div>
              <div style={{ fontSize: 13, color: "#374151" }}>Dự kiến hoàn vốn sau <b>vụ 2 (năm 3–4)</b> với kịch bản GlobalGAP tốt. Thu nhập ổn định từ năm thứ 3 trở đi.</div>
            </div>
            <div style={{ background: "#fff7ed", borderRadius: 12, padding: 16 }}>
              <div style={{ fontWeight: 700, color: "#ea580c", marginBottom: 8 }}>⚡ Nhu cầu vốn lưu động</div>
              <div style={{ fontSize: 13, color: "#374151" }}>Cần dự phòng <b>{fmt(totalFarm * 0.2)}</b> đồng (~20%) làm vốn lưu động cho 18 tháng trước thu hoạch vụ 1.</div>
            </div>
          </div>

          <div style={{ background: "white", borderRadius: 12, padding: 16, marginTop: 12, fontSize: 13 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 Nguồn vốn gợi ý</div>
            <div style={{ color: "#374151", lineHeight: 1.7 }}>
              • <b>Vốn tự có:</b> Nên chiếm 40–50% tổng đầu tư<br/>
              • <b>Vay ngân hàng:</b> Agribank/NHCSXH có gói vay nông nghiệp ưu đãi 6–7%/năm<br/>
              • <b>Hỗ trợ địa phương:</b> Nghệ An/Thanh Hóa có chính sách hỗ trợ chuyển đổi cây trồng<br/>
              • <b>Liên kết doanh nghiệp:</b> Một số DN (Nafoods, DOVECO) hỗ trợ giống trả chậm khi ký hợp đồng bao tiêu
            </div>
          </div>
        </div>
      )}

      {/* ===== RỦI RO ===== */}
      {activeSection === "Phân tích rủi ro" && (
        <div>
          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>⚠️ Ma trận rủi ro – Trang trại {area} ha Miền Bắc</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, fontSize: 12, flexWrap: "wrap" }}>
              {[["Cao","bg-red-100 text-red-700"],["Trung bình","bg-yellow-100 text-yellow-700"],["Thấp","bg-green-100 text-green-700"]].map(([l,c])=>(
                <span key={l} className={c} style={{ padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{l}</span>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {risks.map((r, i) => (
                <div key={i} style={{ borderRadius: 10, border: "1px solid #e5e7eb", padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{r.risk}</div>
                    <span style={{ padding: "2px 10px", borderRadius: 20, fontWeight: 700, fontSize: 12,
                      background: r.level === "Cao" ? "#fee2e2" : r.level === "Trung bình" ? "#fef9c3" : "#dcfce7",
                      color: r.level === "Cao" ? "#b91c1c" : r.level === "Trung bình" ? "#92400e" : "#15803d" }}>
                      {r.level}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#ef4444", marginTop: 4 }}>📉 Tác động: {r.impact}</div>
                  <div style={{ fontSize: 13, color: "#16a34a", marginTop: 4 }}>🛡️ Giải pháp: {r.mitigation}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#eff6ff", borderRadius: 12, padding: 16, marginTop: 16, borderLeft: "4px solid #3b82f6" }}>
            <div style={{ fontWeight: 700, color: "#1d4ed8", marginBottom: 8 }}>🎯 Lộ trình giảm rủi ro khuyến nghị</div>
            <div style={{ fontSize: 13, color: "#1e3a5f", lineHeight: 1.8 }}>
              <b>Trước khi trồng:</b> Ký hợp đồng bao tiêu → Mua giống nuôi cấy mô → Xét nghiệm đất<br/>
              <b>Tháng 1–6:</b> Áp dụng nhật ký đồng ruộng ngay từ đầu → Mời kỹ sư GlobalGAP tư vấn<br/>
              <b>Tháng 6–12:</b> Kiểm tra rệp sáp định kỳ → Xử lý ra hoa chủ động<br/>
              <b>Tháng 12–18:</b> Đánh giá nội bộ GlobalGAP → Đăng ký chứng nhận chính thức<br/>
              <b>Sau thu hoạch:</b> Duy trì hệ thống lạnh → Tái trồng từ chồi con đã có sẵn
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", color: "#9ca3af", fontSize: 11, marginTop: 20 }}>
        Số liệu tham chiếu: Hiệp hội Rau quả VN · FAVRI · HTX AE TA Nghệ An · VnEconomy 2025. Chỉ mang tính ước tính – thực tế có thể thay đổi theo vùng và thời điểm.
      </div>
    </div>
  );
}
