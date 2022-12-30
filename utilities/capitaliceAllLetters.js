const capitaliceAllLetters = (item) => {
  let realTitle = [];

  item.split("").map((title, i, titleAll) => {
    if (i - 1 === -1) {
      realTitle = [];
      realTitle.push(title.toUpperCase());
    } else if (titleAll[i - 1] === " ") {
      realTitle.push(title.toUpperCase());
    } else {
      realTitle.push(title);
    }
  });

  return realTitle;
};

export default capitaliceAllLetters;
