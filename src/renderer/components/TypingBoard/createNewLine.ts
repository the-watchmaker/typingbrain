export const createNewLines = (n: number) => {
  let text = '';
  for (let i = 0; i < n; i += 1) {
    text += '\n';
  }
  return text;
};

export const createNewLinesFromText = (text: string) => {
  const lines = text.split('\n');
  const newLines = createNewLines(lines.length - 1);
  return newLines;
};

const regex = /^\s+/;

export const createNewLinesFromTextWithSpace = (text: string) => {
  const lines = (text || '').split('\n');
  let newLines = '';

  lines.forEach((line: string, index: number) => {
    const match = line.match(regex);
    const emptySpace = match ? match[0] : '';

    newLines += `${emptySpace}${index === lines.length - 1 ? '' : '\n'}`;
  });

  return newLines;
};
