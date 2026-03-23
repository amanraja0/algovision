export const getMergeSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return animations;

  const auxArray = [...array];
  mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
  return animations;
};

function mergeSortHelper(mainArray, start, end, auxArray, animations) {
  if (start === end) return;

  const mid = Math.floor((start + end) / 2);

  mergeSortHelper(auxArray, start, mid, mainArray, animations);
  mergeSortHelper(auxArray, mid + 1, end, mainArray, animations);

  merge(mainArray, start, mid, end, auxArray, animations);
}

function merge(mainArray, start, mid, end, auxArray, animations) {
  let i = start;
  let j = mid + 1;
  let k = start;

  while (i <= mid && j <= end) {
    // Compare
    animations.push({
      type: "compare",
      indices: [i, j],
    });

    if (auxArray[i] <= auxArray[j]) {
      // Overwrite
      animations.push({
        type: "overwrite",
        index: k,
        value: auxArray[i],
      });
      mainArray[k++] = auxArray[i++];
    } else {
      animations.push({
        type: "overwrite",
        index: k,
        value: auxArray[j],
      });
      mainArray[k++] = auxArray[j++];
    }
  }

  while (i <= mid) {
    animations.push({
      type: "overwrite",
      index: k,
      value: auxArray[i],
    });
    mainArray[k++] = auxArray[i++];
  }

  while (j <= end) {
    animations.push({
      type: "overwrite",
      index: k,
      value: auxArray[j],
    });
    mainArray[k++] = auxArray[j++];
  }
}