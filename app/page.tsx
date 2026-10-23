
const sections = [
  {
    number: "01",
    title: "STANDINGS",
    description: "See who's leading the league.",
    href: "#standings",
  },
  {
    number: "02",
    title: "MATCHES",
    description: "Upcoming games and final scores.",
    href: "#matches",
  },
  {
    number: "03",
    title: "PLAYERS",
    description: "Discover the top competitors.",
    href: "#players",
  },
  {
    number: "04",
    title: "TEAMS",
    description: "Explore teams and their rosters.",
    href: "#teams",
  },
];

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#080808",
      color: "#f5f5f5",
      fontFamily: "Arial, sans-serif",
    }}>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        padding: "22px 7%",
        borderBottom: "1px solid #282418",
      }}>
        <a href="#" style={{
          color: "#d4af37",
          fontWeight: 900,
          fontSize: "25px",
          letterSpacing: "4px",
          textDecoration: "none",
        }}>
          RFP
        </a>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          fontSize: "12px",
          letterSpacing: "1px",
        }}>
          <a href="#standings" style={navStyle}>STANDINGS</a>
          <a href="#matches" style={navStyle}>MATCHES</a>
          <a href="#players" style={navStyle}>PLAYERS</a>
          <a href="#teams" style={navStyle}>TEAMS</a>
        </div>
      </nav>

      <section style={{
        padding: "100px 7% 110px",
        borderBottom: "1px solid #282418",
      }}>
        <p style={{
          color: "#d4af37",
          letterSpacing: "4px",
          fontSize: "12px",
          fontWeight: 700,
        }}>
          RISE FUTURE PROSPECTS
        </p>

        <h1 style={{
          fontSize: "clamp(42px, 8vw, 86px)",
          lineHeight: 1.03,
          letterSpacing: "-3px",
          margin: "24px 0",
        }}>
          THE FUTURE IS
          <br />
          <span style={{ color: "#d4af37" }}>
            COMPETITIVE.
          </span>
        </h1>

        <p style={{
          color: "#aaa",
          maxWidth: "480px",
          lineHeight: 1.8,
          fontSize: "16px",
        }}>
          One league. The best teams. A place to prove yourself.
          Welcome to the home of RFP competition.
        </p>

        <a href="#standings" style={{
          display: "inline-block",
          marginTop: "24px",
          padding: "15px 24px",
          background: "#d4af37",
          color: "#080808",
          fontWeight: 800,
          fontSize: "12px",
          letterSpacing: "2px",
          textDecoration: "none",
        }}>
          EXPLORE THE LEAGUE →
        </a>
      </section>

      <section style={{
        padding: "60px 7%",
      }}>
        <p style={{
          color: "#d4af37",
          fontSize: "11px",
          letterSpacing: "3px",
        }}>
          YOUR LEAGUE. YOUR LEGACY.
        </p>

        <h2 style={{
          fontSize: "32px",
          marginTop: "10px",
        }}>
          LEAGUE CENTER
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "14px",
          marginTop: "30px",
        }}>
          {sections.map((section) => (
            <a
              key={section.number}
              id={section.title.toLowerCase()}
              href={section.href}
              style={{
                display: "block",
                padding: "25px",
                minHeight: "115px",
                background: "#111111",
                border: "1px solid #302919",
                color: "#f5f5f5",
                textDecoration: "none",
              }}
            >
              <p style={{
                color: "#d4af37",
                fontSize: "12px",
                letterSpacing: "2px",
              }}>
                {section.number}
              </p>

              <h3 style={{
                fontSize: "20px",
                letterSpacing: "1px",
              }}>
                {section.title}
              </h3>

              <p style={{
                color: "#999",
                fontSize: "13px",
                lineHeight: 1.6,
              }}>
                {section.description}
              </p>
            </a>
          ))}
        </div>

        <div style={{
          marginTop: "45px",
          padding: "25px",
          borderLeft: "3px solid #d4af37",
          background: "#101010",
        }}>
          <h3 style={{ marginTop: 0 }}>SEASON CENTRAL</h3>
          <p style={{
            color: "#aaa",
            lineHeight: 1.7,
            fontSize: "14px",
          }}>
            Follow the competition, track team progress, and
            find out who will become the next RFP champion.
          </p>
        </div>
      </section>

      <footer style={{
        padding: "25px 7%",
        borderTop: "1px solid #282418",
        color: "#777",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
      }}>
        <span>RFP © 2026 — RISE FUTURE PROSPECTS</span>
        <span>COMPETE. CLIMB. BECOME A CHAMPION.</span>
      </footer>
    </main>
  );
}

const navStyle = {
  color: "#cccccc",
  textDecoration: "none",
};
