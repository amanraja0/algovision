export const getQuickSortAnimations = (array) => {
  const animations = [];
  const arr = [...array];

  quickSort(arr, 0, arr.length - 1, animations);

  return animations;
};

function quickSort(arr, low, high, animations) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high, animations);
    quickSort(arr, low, pivotIndex - 1, animations);
    quickSort(arr, pivotIndex + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    // Compare
    animations.push({
      type: "compare",
      indices: [j, high],
    });

    if (arr[j] < pivot) {
      i++;

      // Swap
      animations.push({
        type: "swap",
        indices: [i, j],
      });

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Final pivot swap
  animations.push({
    type: "swap",
    indices: [i + 1, high],
  });

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  return i + 1;
}