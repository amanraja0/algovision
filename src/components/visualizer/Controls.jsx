const Controls = ({
  onGenerate,
  onStart,
  selectedAlgo,
  setSelectedAlgo,
  isSorting,
  speed,
  setSpeed,
  isPaused,
  setIsPaused,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      {/* Generate */}
      <button
        onClick={onGenerate}
        disabled={isSorting}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        Generate Array
      </button>

      {/* Algorithm Select */}
      <select
        value={selectedAlgo}
        onChange={(e) => setSelectedAlgo(e.target.value)}
        disabled={isSorting}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="bubble">Bubble Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
      </select>

      {/* Start */}
      <button
        onClick={onStart}
        disabled={isSorting}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
      >
        Start Sorting
      </button>
      {/* Pause/Resume */}
      <button
        onClick={() => setIsPaused((prev) => !prev)}
        disabled={!isSorting}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg disabled:opacity-50"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>

      {/* Speed Control */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Speed</span>
        <input
          type="range"
          min="5"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          disabled={isSorting}
        />
      </div>
    </div>
  );
};

export default Controls;
