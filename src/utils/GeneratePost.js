const GeneratePost = text => {
  const key = new Date().getMilliseconds();
  const link = `${text + key}`;

  const sets = ['set1', 'set2', 'set3', 'set4', 'set5'];
  const randomSet = sets[Math.floor(Math.random() * sets.length)];

  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const currentDate = `${day}${month}${year}${hours}${minutes}${seconds}`;

  return {
    id: text,
    imgSource: `https://robohash.org/${link}.png?set=${randomSet}`.replace(
      /\s+/g,
      '',
    ),
    cardTitle: text,
    cardTag: currentDate,
  };
};

const genPost = GeneratePost();

export {GeneratePost, genPost};
