
export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#080808",
      color: "white",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "40px 20px"
    }}>
      <h2 style={{
        color: "#D4AF37",
        letterSpacing: "6px"
      }}>
        RFP
      </h2>

      <p style={{
        color: "#AAAAAA",
        letterSpacing: "3px"
      }}>
        RISE FUTURE PROSPECTS
      </p>

      <section style={{ marginTop: "120px" }}>
        <h1 style={{
          fontSize: "clamp(36px, 7vw, 72px)"
        }}>
          THE FUTURE IS
          <br />
          <span style={{ color: "#D4AF37" }}>
            COMPETITIVE.
          </span>
        </h1>

        <p style={{ color: "#AAAAAA" }}>
          Compete. Climb. Become a champion.
        </p>
      </section>

      <footer style={{
        marginTop: "150px",
        color: "#666666"
      }}>
        RFP © 2026 — RISE FUTURE PROSPECTS
      </footer>
    </main>
  );
}
