// app/lineup/[id]/page.js
import LineupEditor from '@/components/LineupEditor';

export default function EditLineup({ params }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Edit Lineup</h1>
        <LineupEditor lineupId={params.id} />
      </div>
    </div>
  );
}
