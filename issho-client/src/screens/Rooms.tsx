// screens/RoomsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/config";

export function RoomsPage() {
  const [rooms, setRooms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newRoomName, setNewRoomName] = useState("");
  const [addingRoom, setAddingRoom] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const fetchRooms = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/all_rooms`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rooms");
        return res.json();
      })
      .then((newRooms) => {
        // Only update if rooms actually changed
        setRooms((prevRooms) => {
          if (JSON.stringify(prevRooms) === JSON.stringify(newRooms)) {
            return prevRooms;
          }
          return newRooms;
        });
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRooms();
    const intervalId = setInterval(fetchRooms, 3000); // 3000ms = 3 seconds
    return () => clearInterval(intervalId);
  }, []);

  const handleAddRoom = () => {
    if (!newRoomName.trim()) return;
    setAddingRoom(true);
    setAddError(null);

    fetch(`${API_BASE_URL}/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room_name: newRoomName.trim() }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.error || "Failed to create room");
          });
        }
        return res.json();
      })
      .then(() => {
        setNewRoomName("");
        fetchRooms(); // Refresh list
      })
      .catch((err) => {
        setAddError(err.message || "Something went wrong");
      })
      .finally(() => {
        setAddingRoom(false);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-600 mb-4">All Rooms</h2>

      {/* Add Room UI */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter room name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
          />
          <button
            onClick={handleAddRoom}
            disabled={addingRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {addingRoom ? "Adding..." : "Add Room"}
          </button>
        </div>
        {addError && <p className="text-red-500 mt-2">{addError}</p>}
      </div>

      {loading && rooms.length === 0 && (
        <p className="text-gray-500">Loading rooms...</p>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Link to={`/room/${room}`} key={room}>
            <div className="border border-gray-300 rounded-md p-4 bg-white shadow hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <h3 className="text-lg font-semibold text-gray-700">{room}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
