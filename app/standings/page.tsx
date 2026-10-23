
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type TeamStanding = {
  id: string;
  name: string;
  played: number;
  wins: number;
  losses: number;
  draws: number;
  points: number;
};

export default function StandingsPage() {
  const [teams, setTeams] = useState<TeamStanding[]>([]);
  const [seasonName, setSeasonName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStandings() {
      try {
        setError("");

        const { data: season, error: seasonError } =
          await supabase
            .from("seasons")
            .select("id, name")
            .eq("is_active", true)
            .maybeSingle();

        if (seasonError) throw seasonError;

        if (!season) {
          setSeasonName("No active season");
          setTeams([]);
          return;
        }

        setSeasonName(season.name);

        const { data: entries, error: entriesError } =
          await supabase
            .from("season_teams")
            .select("team_id")
            .eq("season_id", season.id);

        if (entriesError) throw entriesError;

        const teamIds = (entries ?? []).map(
          (entry) => entry.team_id
        );

        if (teamIds.length === 0) {
          setTeams([]);
          return;
        }

        const { data: teamData, error: teamError } =
          await supabase
            .from("teams")
            .select("id, name")
            .in("id", teamIds);

        if (teamError) throw teamError;

        const { data: matches, error: matchesError } =
          await supabase
            .from("matches")
            .select(
              "home_team_id, away_team_id, home_score, away_score"
            )
            .eq("season_id", season.id)
            .eq("status", "completed");

        if (matchesError) throw matchesError;

        const standings: TeamStanding[] = (teamData ?? []).map(
          (team) => ({
            id: team.id,
            name: team.name,
            played: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            points: 0,
          })
        );

        for (const match of matches ?? []) {
          if (
            match.home_score === null ||
            match.away_score === null
          ) {
            continue;
          }

          const home = standings.find(
            (team) => team.id === match.home_team_id
          );
          const away = standings.find(
            (team) => team.id === match.away_team_id
          );

          if (!home || !away) continue;

          home.played++;
          away.played++;

          if (match.home_score > match.away_score) {
            home.wins++;
            home.points += 3;
            away.losses++;
          } else if (match.away_score > match.home_score) {
            away.wins++;
            away.points += 3;
            home.losses++;
          } else {
            home.draws++;
            away.draws++;
            home.points++;
            away.points++;
          }
        }

        standings.sort(
          (a, b) =>
            b.points - a.points ||
            b.wins - a.wins ||
            a.name.localeCompare(b.name)
        );

        setTeams(standings);
      } catch (err: unknown) {
        console.error("Standings error:", err);

        const message =
          err instanceof Error
            ? err.message
            : JSON.stringify(err);

        setError(message || "Unknown error loading standings.");
      } finally {
        setLoading(false);
      }
    }

    loadStandings();
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        padding: "35px 6%",
      }}
    >
      <a
        href="/"
        style={{
          color: "#d4af37",
          textDecoration: "none",
          fontSize: "13px",
        }}
      >
        ← BACK TO RFP
      </a>

      <p
        style={{
          color: "#d4af37",
          letterSpacing: "4px",
          fontSize: "11px",
          marginTop: "45px",
        }}
      >
        RISE FUTURE PROSPECTS
      </p>

      <h1
        style={{
          fontSize: "clamp(36px, 7vw, 64px)",
          marginBottom: "8px",
        }}
      >
        LEAGUE <span style={{ color: "#d4af37" }}>STANDINGS</span>
      </h1>

      <p style={{ color: "#999" }}>
        {seasonName || "Loading season..."}
      </p>

      {loading ? (
        <p style={{ color: "#aaa", marginTop: "40px" }}>
          Loading standings...
        </p>
      ) : error ? (
        <div
          style={{
            marginTop: "40px",
            padding: "18px",
            border: "1px solid #663333",
            background: "#190b0b",
            color: "#ff9999",
            overflowWrap: "anywhere",
          }}
        >
          <strong>Could not load standings:</strong>
          <p>{error}</p>
          <p style={{ fontSize: "12px", color: "#cc8888" }}>
            Check the Supabase connection and database permissions.
          </p>
        </div>
      ) : teams.length === 0 ? (
        <p style={{ color: "#aaa", marginTop: "40px" }}>
          {seasonName === "No active season"
            ? "No active season yet. Add a season in Supabase to get started."
            : "No teams have been added to this season yet."}
        </p>
      ) : (
        <div
          style={{
            overflowX: "auto",
            marginTop: "35px",
            border: "1px solid #302919",
          }}
        >
          <table
            style={{
              width: "100%",
              minWidth: "520px",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead style={{ background: "#17140d" }}>
              <tr>
                {["RANK", "TEAM", "P", "W", "L", "D", "PTS"].map(
                  (heading) => (
                    <th
                      key={heading}
                      style={{
                        padding: "16px 12px",
                        color: "#d4af37",
                        fontSize: "11px",
                        letterSpacing: "1px",
                      }}
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {teams.map((team, index) => (
                <tr
                  key={team.id}
                  style={{
                    borderTop: "1px solid #282418",
                    background:
                      index === 0 ? "#151209" : "transparent",
                  }}
                >
                  <td
                    style={{
                      padding: "17px 12px",
                      color: "#d4af37",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  <td style={{ padding: "17px 12px", fontWeight: 700 }}>
                    {team.name}
                  </td>

                  <td style={{ padding: "17px 12px" }}>{team.played}</td>
                  <td style={{ padding: "17px 12px" }}>{team.wins}</td>
                  <td style={{ padding: "17px 12px" }}>{team.losses}</td>
                  <td style={{ padding: "17px 12px" }}>{team.draws}</td>

                  <td
                    style={{
                      padding: "17px 12px",
                      color: "#d4af37",
                      fontWeight: 800,
                    }}
                  >
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p
        style={{
          color: "#666",
          fontSize: "12px",
          marginTop: "25px",
        }}
      >
        Points: 3 for a win, 1 for a draw.
      </p>
    </main>
  );
}
