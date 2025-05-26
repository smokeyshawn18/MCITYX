// app/api/lineups/route.js
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  try {
    const { data: lineups, error } = await supabase
      .from('lineups')
      .select(`
        *,
        lineup_players (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(lineups);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  try {
    const { name, players, user_id } = await request.json();

    // Insert lineup
    const { data: lineup, error: lineupError } = await supabase
      .from('lineups')
      .insert({ name, user_id })
      .select()
      .single();

    if (lineupError) {
      console.error('Error inserting lineup:', lineupError);
      return NextResponse.json({ error: lineupError.message }, { status: 500 });
    }

    // Insert players
    const playersToInsert = players.map((player) => ({
      lineup_id: lineup.id,
      position_number: player.number,
      player_name: player.name,
      position_x: player.x,
      position_y: player.y,
      position_role: player.position || 'CM' // if you added this field
    }));

    const { error: playersError } = await supabase
      .from('lineup_players')
      .insert(playersToInsert);

    if (playersError) {
      console.error('Error inserting players:', playersError);
      return NextResponse.json({ error: playersError.message }, { status: 500 });
    }

    return NextResponse.json(lineup);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(request) {
  try {
    const { id, name, formation, players, user_id } = await request.json();

    // Update lineup
    const { error: lineupError } = await supabase
      .from('lineups')
      .update({ name, formation, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user_id);

    if (lineupError) throw lineupError;

    // Delete existing players
    await supabase
      .from('lineup_players')
      .delete()
      .eq('lineup_id', id);

    // Insert updated players
    const playersToInsert = players.map(player => ({
      lineup_id: id,
      position_number: player.number,
      player_name: player.name,
      position_x: player.x,
      position_y: player.y
    }));

    const { error: playersError } = await supabase
      .from('lineup_players')
      .insert(playersToInsert);

    if (playersError) throw playersError;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
