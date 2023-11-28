module.exports = function computeSplitArr(arr, coresCount) {
  const SIZE = arr.length / coresCount;

  const res = arr.reduce(
    (accumulator, currentValue) => {
      if (accumulator[accumulator.length - 1].length == SIZE) {
        accumulator.push([]);
      }

      accumulator[accumulator.length - 1].push(currentValue)
      return accumulator;
    },
    [[]]
  );
  return res;
};
