import { useNavigate } from "react-router-dom";

const S = {
        header: { background: "#fff", borderBottom: "0.5px solid #e5e7eb", padding: "14px 32px", display: "flex", alignItems: "center", gap: 10 },
        logo: { fontSize: 18, fontWeight: 600, letterSpacing: "-0.3px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", cursor: "pointer" }
    }

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
        <div style={S.header}>
            <div style={S.logo} onClick={() => navigate("/")}>TextEditor</div>
            <div style={{ border: "1px solid black", fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>subtitle</div>
            <div style={{ border: "1px solid black", marginLeft: "auto", display: "flex", gap: 20, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <button>JA</button>
                    <span style={{ color: "#d1d5db", fontSize: 12 }}>|</span>
                    <button>EN</button>
                </div>
            </div>
        </div>
        </>
    )
}