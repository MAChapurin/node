export const calc = {
  add(a, b) {
    return Number(a) + Number(b);
  },
  mult(a, b) {
    return Number(a) * Number(b);
  },
  minus(a, b) {
    return Number(a) - Number(b);
  },
  divide(a, b) {
    if (Number(b) === 0) {
      throw new Error('На ноль делить нельзя');
    }
    return Number(a) / Number(b);
  },
};
