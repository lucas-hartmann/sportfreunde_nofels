import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseServer } from "@/lib/supabaseServerClient";

export async function GET() {
  // Fetch matchdays with their matches from Supabase and map to the
  // structure expected by the client UI
  const { data, error } = await supabaseServer
    .from("matchdays")
    .select(
      `id, name,
       matches:matches(
         id, matchday_id,
         home_team, away_team,
         day, date, time, location, note,
         home_score, away_score
       )`
    )
    .order("id", { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  const formatted = (data || []).map((md) => ({
    id: md.id,
    name: md.name,
    matches: (md.matches || []).map((m: any) => ({
      id: m.id,
      home: m.home_team,
      away: m.away_team,
      day: m.day ?? null,
      date: m.date ?? null,
      time: m.time ?? null,
      location: m.location ?? null,
      note: m.note ?? null,
      score: {
        home: m.home_score ?? null,
        away: m.away_score ?? null,
      },
    })),
  }));

  return Response.json(formatted);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // Expecting the same shape as returned by GET: array of matchdays
  // with matches and their "score" object. We'll update scores in DB.
  const matchdays = (await req.json()) as Array<{
    id: number;
    matches: Array<{
      id?: number;
      home?: string;
      away?: string;
      day?: string | null;
      date?: string | null;
      time?: string | null;
      location?: string | null;
      note?: string | null;
      score?: { home: number | null; away: number | null };
    }>;
  }>;

  // Collect updates and perform per-row updates by id when available.
  for (const md of matchdays) {
    for (const match of md.matches || []) {
      const id = (match as any).id as number | undefined;
      const home_score = match.score?.home ?? null;
      const away_score = match.score?.away ?? null;

      if (typeof id === "number") {
        const { error } = await supabaseServer
          .from("matches")
          .update({ home_score, away_score })
          .eq("id", id);
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
          });
        }
        continue;
      }

      // Fallback: try to locate the match by natural key if no id present
      const { data: candidates, error: selErr } = await supabaseServer
        .from("matches")
        .select("id")
        .eq("matchday_id", md.id)
        .eq("home_team", match.home ?? null)
        .eq("away_team", match.away ?? null)
        .maybeSingle();

      if (selErr) {
        return new Response(JSON.stringify({ error: selErr.message }), {
          status: 500,
        });
      }

      if (candidates?.id) {
        const { error } = await supabaseServer
          .from("matches")
          .update({ home_score, away_score })
          .eq("id", candidates.id);
        if (error) {
          return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
          });
        }
      }
    }
  }

  return Response.json({ success: true });
}
