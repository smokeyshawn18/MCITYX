'use client';

import { useState, useEffect, useRef } from 'react';
import { SignInButton, useUser } from '@clerk/nextjs';
import { XCircle, Shirt, ArrowDownToLine } from 'lucide-react';
import { Button } from './ui/button';
import { downloadLineupImage } from '@/utils/downloadLineup';


const MAX_PLAYERS = 11;


const desktopPositions = {
  GK: { x: 50, y: 92 },
  RB: { x: 85, y: 75 },
  RCB: { x: 65, y: 75 },
  LCB: { x: 35, y: 75 },
  LB: { x: 15, y: 75 },
  RDM: { x: 60, y: 60 },
  LDM: { x: 40, y: 60 },
  RAM: { x: 70, y: 40 },
  CAM: { x: 50, y: 40 },
  LAM: { x: 30, y: 40 },
  ST: { x: 50, y: 20 }
};

const mobilePositions = {
  GK: { x: 50, y: 90 },
  RB: { x: 80, y: 78 },
  RCB: { x: 65, y: 78 },
  LCB: { x: 35, y: 78 },
  LB: { x: 20, y: 78 },
  RDM: { x: 60, y: 65 },
  LDM: { x: 40, y: 65 },
  RAM: { x: 70, y: 45 },
  CAM: { x: 50, y: 45 },
  LAM: { x: 30, y: 45 },
  ST: { x: 50, y: 25 }
};
  const defaultPlayers = [
  { id: 1, number: 31, name: 'Ederson', position: 'GK', x: 50, y: 92 },
  { id: 2, number: 27, name: 'M. Nunes', position: 'RB', x: 85, y: 75 },
  { id: 3, number: 3, name: 'Dias (C)', position: 'RCB', x: 65, y: 75 },
  { id: 4, number: 25, name: 'Akanji', position: 'LCB', x: 35, y: 75 },
  { id: 5, number: 24, name: 'Gvardiol', position: 'LB', x: 15, y: 75 },
  { id: 6, number: 20, name: 'Silva', position: 'RDM', x: 60, y: 60 },
  { id: 7, number: 19, name: 'Gundogan', position: 'LDM', x: 40, y: 60 },
  { id: 8, number: 7, name: 'Marmoush', position: 'RAM', x: 70, y: 40 },
  { id: 9, number: 47, name: 'Foden', position: 'CAM', x: 50, y: 40 },
  { id: 10, number: 11, name: 'Doku', position: 'LAM', x: 30, y: 40 },
  { id: 11, number: 9, name: 'Haaland', position: 'ST', x: 50, y: 20 }
];


function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function LineupEditor({ lineupId = null }) {



  const { user, isSignedIn } = useUser();
  const isMobile = useIsMobile();

  const [lineupName, setLineupName] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerNumber, setNewPlayerNumber] = useState('');

  const fieldRef = useRef(null);
  const editPanelRef = useRef(null);

   const handleDownloadClick = () => {
    downloadLineupImage(fieldRef.current);
  };

  useEffect(() => {
    if (lineupId) loadLineup();
    else {
      setPlayers(defaultPlayers);
      setLineupName('');
    }
  }, [lineupId]);

  useEffect(() => {
    if (selectedPlayerId !== null && isMobile && editPanelRef.current) {
      setTimeout(() => {
        editPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 200);
    }
  }, [selectedPlayerId, isMobile]);

  async function loadLineup() {
    setLoading(true);
    try {
      const res = await fetch(`/api/lineups/${lineupId}`);
      if (res.ok) {
        const data = await res.json();
        setLineupName(data.name || '');
        setPlayers(
          data.players.map((p, i) => ({
            id: i + 1,
            number: p.number || 0,
            name: p.name || '',
            position: p.position || 'CM',
            x: p.x || 50,
            y: p.y || 50
          }))
        );
      }
    } catch (e) {
      console.error(e);
      alert('Failed to load lineup');
    } finally {
      setLoading(false);
    }
  }

  async function saveLineup() {
    if (!isSignedIn) return alert('You must be signed in to save.');
    if (!lineupName.trim()) return alert('Please enter a lineup name.');
    if (players.length === 0) return alert('Add at least one player.');
    if (players.some((p) => !p.name.trim() || !p.number)) {
      return alert('Please fill all player names and jersey numbers.');
    }

    setLoading(true);
    try {
      const res = await fetch('/api/lineups', {
        method: lineupId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: lineupId,
          user_id: user.id,
          name: lineupName,
          players
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save lineup');
      }

      alert('Lineup saved successfully!');
      window.location.href = '/profile';
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function onDragStart(e, id) {
    e.dataTransfer.setData('text/plain', id);
  }
  function onDragOver(e) {
    e.preventDefault();
  }
  function onDrop(e) {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData('text/plain'));
    if (!fieldRef.current) return;
    const rect = fieldRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    updatePlayerPosition(id, x, y);
  }
  function onTouchMove(e, id) {
    if (!fieldRef.current) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = fieldRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    updatePlayerPosition(id, x, y);
  }

  function updatePlayerPosition(id, x, y) {
    setPlayers((p) =>
      p.map((pl) =>
        pl.id === id
          ? { ...pl, x: Math.min(95, Math.max(5, x)), y: Math.min(95, Math.max(5, y)) }
          : pl
      )
    );
  }

  function updatePlayerField(id, field, value) {
    const positions = isMobile ? mobilePositions : desktopPositions;
    setPlayers((p) =>
      p.map((pl) =>
        pl.id === id
          ? {
              ...pl,
              [field]: field === 'position' ? value : value.trim(),
              ...(field === 'position' ? positions[value] : {})
            }
          : pl
      )
    );
  }

  function addNewPlayer() {
    if (players.length >= MAX_PLAYERS) {
      return alert(`Maximum of ${MAX_PLAYERS} players allowed.`);
    }
    if (!newPlayerName.trim()) return alert('Enter player name');
    const num = parseInt(newPlayerNumber);
    if (!num || num < 1 || num > 99) return alert('Enter valid jersey number (1-99)');
    if (players.some((p) => p.number === num)) return alert('Jersey number already taken');

    const newId = players.length ? Math.max(...players.map((p) => p.id)) + 1 : 1;
    setPlayers((p) => [
      ...p,
      {
        id: newId,
        name: newPlayerName.trim(),
        number: num,
        position: 'CM',
        x: 50,
        y: 50
      }
    ]);
    setNewPlayerName('');
    setNewPlayerNumber('');
  }

  function removePlayer(id) {
    setPlayers((p) => p.filter((pl) => pl.id !== id));
    if (selectedPlayerId === id) setSelectedPlayerId(null);
  }

  function resetLineup() {
    if (confirm('Reset lineup to default players? This will remove all changes.')) {
      setPlayers(defaultPlayers);
      setSelectedPlayerId(null);
      setLineupName('');
    }
  }

  const selectedPlayer = players.find((p) => p.id === selectedPlayerId);

  if (!isSignedIn) {
    return (
      <div className="p-6 text-center text-black font-bold ">
        <p className='mb-4'> Please sign in to create or edit lineups.</p>
       

        <Button className="bg-black text-white font-bold uppercase ">
           <SignInButton mode='modal'/>
        </Button>
       
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row max-w-7xl mx-auto p-2 sm:p-6 gap-4 sm:gap-8">
      {/* Left: Football Field */}
      <div
        ref={fieldRef}
        className="relative bg-green-800 rounded-lg border-4 border-green-700 aspect-[3/4] flex-shrink-0 w-full lg:w-3/5 max-w-4xl mx-auto shadow-lg overflow-hidden"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <FieldMarkings />
        {players.map((player) => (
          <div
            key={player.id}
            draggable
            onDragStart={(e) => onDragStart(e, player.id)}
            onTouchMove={(e) => onTouchMove(e, player.id)}
            className={`absolute cursor-grab select-none transform -translate-x-1/2 -translate-y-1/2 text-center transition
              ${selectedPlayerId === player.id ? 'ring-4 ring-yellow-400' : ''}
            `}
            style={{
              left: `${player.x}%`,
              top: `${player.y}%`,
              zIndex: selectedPlayerId === player.id ? 10 : 1
            }}
            onClick={() => setSelectedPlayerId(player.id)}
            title={`${player.name} (#${player.number}) - ${player.position}`}
            tabIndex={0}
            aria-label={`Edit ${player.name} (#${player.number})`}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedPlayerId(player.id);
            }}
          >
            <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 rounded-full bg-[#3c87c5] border-4 border-white flex items-center justify-center font-bold text-base xs:text-lg sm:text-xl shadow-lg hover:bg-sky-700 transition">
              {player.number}
            </div>
            <div className="mt-1 text-xs xs:text-sm sm:text-base font-semibold text-white truncate max-w-[60px] xs:max-w-[80px] sm:max-w-[100px]">
              <span title={player.name}>{player.name}</span>
            </div>
          </div>
        ))}
      </div>

   
      {/* Right: Edit Panel */}
      <div
        className="flex-grow max-w-lg mx-auto lg:mx-0 flex flex-col gap-6"
        ref={editPanelRef}
      >
            <button
  onClick={handleDownloadClick}
  className="mt-6 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center gap-2"
>
  <ArrowDownToLine className="w-5 h-5" />
  Download Lineup Field
</button>

        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Edit Lineup
        </h2>

        <label className="block mb-3">
          <span className="text-gray-300">Lineup Name</span>
          <input
            type="text"
            value={lineupName}
            onChange={(e) => setLineupName(e.target.value)}
            placeholder="Enter lineup name"
            className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </label>

        {/* Save & Reset Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={saveLineup}
            disabled={loading}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
            type="button"
            aria-label="Save lineup"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={resetLineup}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 font-semibold transition"
            type="button"
            aria-label="Reset lineup"
          >
            Reset
          </button>
        </div>

        {selectedPlayerId === null && (
          <p className="text-gray-400 italic mb-4">Tap a player on the field to edit details.</p>
        )}

        {selectedPlayerId !== null && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">
                Editing: {players.find((p) => p.id === selectedPlayerId)?.name || ''}
              </h3>
              <button
                onClick={() => setSelectedPlayerId(null)}
                className="text-gray-400 hover:text-white"
                title="Close editor"
                type="button"
                aria-label="Close player editor"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            {players
              .filter((p) => p.id === selectedPlayerId)
              .map((player) => (
                <div key={player.id} className="space-y-3">
                  <label className="block">
                    <span className="text-gray-300">Player Name</span>
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => updatePlayerField(player.id, 'name', e.target.value)}
                      className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      maxLength={30}
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-300">Jersey Number</span>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={player.number}
                      onChange={(e) => updatePlayerField(player.id, 'number', e.target.value)}
                      className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-300">Position</span>
                    <select
                      value={player.position}
                      onChange={(e) => updatePlayerField(player.id, 'position', e.target.value)}
                      className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {Object.keys(desktopPositions).map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Remove player ${player.name} (#${player.number}) from lineup?`
                        )
                      ) {
                        removePlayer(player.id);
                      }
                    }}
                    className="mt-2 w-full py-2 bg-red-600 rounded-md hover:bg-red-700 transition font-semibold"
                    type="button"
                  >
                    Remove Player
                  </button>
                </div>
              ))}
          </>
        )}

        {/* Add New Player Form */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2">
            <Shirt className="w-6 h-6 text-green-400" />
            Add New Player
          </h3>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Player Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              maxLength={30}
            />
            <input
              type="number"
              placeholder="Jersey Number"
              min={1}
              max={99}
              value={newPlayerNumber}
              onChange={(e) => setNewPlayerNumber(e.target.value)}
              className="rounded-md bg-gray-700 border border-gray-600 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={addNewPlayer}
              disabled={players.length >= MAX_PLAYERS}
              className={`rounded-md text-white font-semibold px-4 py-2 transition ${
                players.length >= MAX_PLAYERS
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer'
              }`}
              type="button"
              title={
                players.length >= MAX_PLAYERS
                  ? `Maximum ${MAX_PLAYERS} players reached`
                  : 'Add Player'
              }
            >
              Add Player
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldMarkings() {
  return (
    <>
      <div className="absolute inset-0 border-4 border-white rounded-lg"></div>
      <div className="absolute top-1/2 left-1/2 w-20 h-20 xs:w-28 xs:h-28 sm:w-36 sm:h-36 border-4 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-white"></div>
      <div className="absolute top-0 left-1/2 w-28 h-10 xs:w-36 xs:h-14 sm:w-48 sm:h-20 border-4 border-white rounded-b-lg transform -translate-x-1/2"></div>
      <div className="absolute bottom-0 left-1/2 w-28 h-10 xs:w-36 xs:h-14 sm:w-48 sm:h-20 border-4 border-white rounded-t-lg transform -translate-x-1/2"></div>
      <div className="absolute top-0 left-1/2 w-12 h-4 xs:w-16 xs:h-6 sm:w-20 sm:h-8 border-4 border-white rounded-b-md transform -translate-x-1/2"></div>
      <div className="absolute bottom-0 left-1/2 w-12 h-4 xs:w-16 xs:h-6 sm:w-20 sm:h-8 border-4 border-white rounded-t-md transform -translate-x-1/2"></div>
    </>
  );
}
