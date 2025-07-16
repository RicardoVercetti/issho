// screens/RoomsPage.tsx
import { useEffect, useState } from 'react';

export function RoomsPage() {
  const [rooms, setRooms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/all_rooms')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch rooms');
        return res.json();
      })
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Available Rooms</h2>

      {loading && <p className="text-gray-500">Loading rooms...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room}
            className="border border-gray-300 rounded-md p-4 bg-white shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-700">{room}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}