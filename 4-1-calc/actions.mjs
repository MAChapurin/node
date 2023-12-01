export const calc = {
  add: (a, b) => a + b,
  mult: (a, b) => a * b,
  minus: (a, b) => a - b,
  divide: (a, b) => {
    if (Number(b) === 0) {
      throw new Error('На ноль делить нельзя');
    }
    return a / b;
  },
};
