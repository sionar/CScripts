export const shuffle = array => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  };
  return array;
};

export const convertToJson = (characters) => {
  let output = [];
  let value; 
  characters.forEach(character => {
    value = character.name.toLowerCase().replace(/'/g, '').replace(/ /g, '_');
    output.push({id: value})
  });
  output = JSON.stringify(output);
  return output;
}