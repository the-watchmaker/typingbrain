const createNewLines = (n: number) => {
  let text = '';
  for (let i = 0; i < n; i += 1) {
    text += '\n';
  }
  return text;
};

export default createNewLines;
