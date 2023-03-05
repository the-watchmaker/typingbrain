export interface IWrong {
  line: number;
  from: number;
  to: number;
  wrong: string;
  right: string;
}

function getWrongParts(sessionText: string, hintText: string) {
  const wrongs: IWrong[] = [];

  const sessionLines = (sessionText || '').split('\n');
  const hintLines = (hintText || '').split('\n');

  let lineOffset = 0;

  sessionLines.forEach((sessionLine, line) => {
    const hintLine = hintLines[line];
    if (typeof hintLine === 'undefined') {
      return;
    }

    if (line === 0) {
      lineOffset += sessionLine.length + 1;
      return;
    }

    if (sessionLine.length > 1 && sessionLine !== hintLine) {
      // find the existing characters within sessionLine that are not the same as hintLine
      // and push them to wrongs in ranges with from and to index
      let from = 0;
      let to = 0;
      let wrong = '';

      for (let i = 0; i < sessionLine.length; i += 1) {
        if (sessionLine[i] === hintLine[i]) {
          if (wrong.length > 0 && to >= from) {
            wrongs.push({
              line,
              from: lineOffset + from,
              to: lineOffset + to + 1,
              wrong,
              right: hintLine.slice(lineOffset + from, lineOffset + to + 1),
            });
            wrong = '';
          }
        } else {
          if (wrong.length === 0) {
            from = i;
          }
          wrong += sessionLine[i];
          to = i;
        }
      }

      if (wrong.length > 0 && to >= from) {
        wrongs.push({
          line,
          from: lineOffset + from,
          to: lineOffset + to + 1,
          wrong,
          right: hintLine.slice(lineOffset + from, lineOffset + to + 1),
        });
      }
    }

    lineOffset += sessionLine.length + 1;
  });

  return wrongs;
}

export default getWrongParts;
