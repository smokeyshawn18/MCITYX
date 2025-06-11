// app/api/lineups/[id]/route.js
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request, { params }) {
  try {
    const { data: lineup, error } = await supabase
      .from("lineups")
      .select(
        `
        *,
        lineup_players (
          position_number,
          player_name,
          position_role,
          position_x,
          position_y
        )
      `
      )
      .eq("id", params.id)
      .single();

    if (error) throw error;
    if (!lineup)
      return NextResponse.json({ error: "Lineup not found" }, { status: 404 });

    // Transform data to match your component's expected shape
    const formattedLineup = {
      id: lineup.id,
      name: lineup.name,
      players: lineup.lineup_players.map((p) => ({
        number: p.position_number,
        name: p.player_name,
        position: p.position_role || "CM",
        x: parseFloat(p.position_x),
        y: parseFloat(p.position_y),
      })),
    };

    return NextResponse.json(formattedLineup);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: "Lineup ID is required" },
        { status: 400 }
      );
    }

    // First, delete all related lineup_players (due to foreign key constraint)
    const { error: playersError } = await supabase
      .from("lineup_players")
      .delete()
      .eq("lineup_id", id);

    if (playersError) {
      console.error("Error deleting lineup players:", playersError);
      throw new Error("Failed to delete lineup players");
    }

    // Then delete the lineup itself
    const { data: deletedLineup, error: lineupError } = await supabase
      .from("lineups")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (lineupError) {
      console.error("Error deleting lineup:", lineupError);

      // Handle specific Supabase errors
      if (lineupError.code === "PGRST116") {
        return NextResponse.json(
          { error: "Lineup not found" },
          { status: 404 }
        );
      }

      throw lineupError;
    }

    if (!deletedLineup) {
      return NextResponse.json({ error: "Lineup not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Lineup deleted successfully",
      deletedId: deletedLineup.id,
    });
  } catch (error) {
    console.error("Delete lineup error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to delete lineup",
      },
      { status: 500 }
    );
  }
}
