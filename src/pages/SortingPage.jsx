import { useEffect, useState, useRef } from "react";
import { useArray } from "../hooks/useArray";
import ArrayBars from "../components/visualizer/ArrayBars";
import Controls from "../components/visualizer/Controls";
import { getBubbleSortAnimations } from "../algorithms/sorting/bubbleSort";
import { getMergeSortAnimations } from "../algorithms/sorting/mergeSort";
import { getQuickSortAnimations } from "../algorithms/sorting/quickSort";

const SortingPage = () => {
  const { array, setArray, generateArray } = useArray(30);

  const [activeIndices, setActiveIndices] = useState([]);
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(30);
  const [sorted, setSorted] = useState(false);

  // 🔥 FIX: useRef for pause (important)
  const isPausedRef = useRef(false);

  useEffect(() => {
    generateArray();
  }, []);

  // Sync ref with state
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const getComplexity = () => {
    if (selectedAlgo === "bubble") return "Time: O(n²) | Space: O(1)";
    if (selectedAlgo === "merge") return "Time: O(n log n) | Space: O(n)";
    if (selectedAlgo === "quick")
      return "Time: O(n log n) avg | Space: O(log n)";
  };

  const handleStart = async () => {
    if (isSorting) return;

    setIsSorting(true);
    setSorted(false);

    let animations = [];

    if (selectedAlgo === "bubble") {
      animations = getBubbleSortAnimations(array);
    } else if (selectedAlgo === "merge") {
      animations = getMergeSortAnimations(array);
    } else if (selectedAlgo === "quick") {
      animations = getQuickSortAnimations(array);
    }

    const arr = [...array];

    for (let i = 0; i < animations.length; i++) {
      // 🔥 PAUSE LOOP (FIXED)
      while (isPausedRef.current) {
        await sleep(50);
      }

      const action = animations[i];

      if (action.type === "compare") {
        setActiveIndices(action.indices);
      }

      if (action.type === "swap") {
        const [a, b] = action.indices;
        [arr[a], arr[b]] = [arr[b], arr[a]];
        setArray([...arr]);
      }

      if (action.type === "overwrite") {
        arr[action.index] = action.value;
        setArray([...arr]);
      }

      await sleep(speed);
    }

    setActiveIndices([]);
    setSorted(true);
    setIsSorting(false);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold mb-2">Algorithm Visualizer</h1>

      <p className="text-gray-500 mb-2">
        Visualize sorting algorithms in real time
      </p>

      <p className="text-gray-600 mb-4">{getComplexity()}</p>

      <Controls
        onGenerate={generateArray}
        onStart={handleStart}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
        isSorting={isSorting}
        speed={speed}
        setSpeed={setSpeed}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      <ArrayBars array={array} activeIndices={activeIndices} sorted={sorted} />
    </div>
  );
};

export default SortingPage;
