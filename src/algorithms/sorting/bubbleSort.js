export const getBubbleSortAnimations = (array) => {
  const animations = [];
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      
      // Compare
      animations.push({
        type: "compare",
        indices: [j, j + 1],
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        animations.push({
          type: "swap",
          indices: [j, j + 1],
        });

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return animations;
};