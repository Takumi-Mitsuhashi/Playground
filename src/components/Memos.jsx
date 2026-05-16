const S = {
    main: { maxWidth: 860, margin: "0 auto", padding: "32px 20px 80px" },
    card: { background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 14, padding: "24px 28px", marginBottom: 16 },

}

export default function Memos() {
    return (
        <>
          <div style={S.main}>
            <div style={S.card}>
                <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>日付：</div>
            </div>
          </div>
        </>
    )
}