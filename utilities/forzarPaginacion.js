const forcePagination = (pag, num, pagination) => {
  const total = pag.length / num;
  const roundedTotal = Math.round(total);
  const numbs = [];
  const result = [];

  for (let i = 1; numbs.length < roundedTotal; i++) {
    numbs.push(i);
  }

  pag
    ? pag.forEach((el, i) => {
        if (pagination === 1) {
          if (i < num) {
            result.push(el);
          }
        } else if (i < Number.parseInt(pagination) * num) {
          if ((Number.parseInt(pagination) - 1) * num <= i) {
            result.push(el);
          }
        }
      })
    : null;

  return {
    last: roundedTotal,
    numbs,
    result,
  };
};

export default forcePagination;
