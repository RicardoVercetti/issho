export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        Tailwind Test
      </h1>
      <div className="p-4 bg-green-100 border border-green-400 rounded">
        <p className="text-green-800">
          If you see colored boxes, Tailwind is working!
        </p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Test Button
        </button>
      </div>
    </div>
  )
}