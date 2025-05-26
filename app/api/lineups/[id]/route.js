import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request, { params }) {
  try {
    const { data: lineup, error } = await supabase
      .from('lineups')
      .select(`
        *,
        lineup_players (
          position_number,
          player_name,
          position_role,
          position_x,
          position_y
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) throw error;

    if (!lineup) return NextResponse.json({ error: 'Lineup not found' }, { status: 404 });

    // Transform data to match your component's expected shape
    const formattedLineup = {
      id: lineup.id,
      name: lineup.name,
      players: lineup.lineup_players.map((p) => ({
        number: p.position_number,
        name: p.player_name,
        position: p.position_role || 'CM',
        x: parseFloat(p.position_x),
        y: parseFloat(p.position_y)
      }))
    };

    return NextResponse.json(formattedLineup);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
