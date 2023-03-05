import { createNewLinesFromTextWithSpace } from './createNewLine';

const createSessionText = (blocks: any[]) => {
  let newSessionText = '\n'; // The first string should be a new line to skip the title

  blocks.forEach((block: any, index: number) => {
    if (index === 0) {
      return;
    }

    const lines = (block.comment || '').split('\n');
    let newComment = '';

    // TODO refactor this part and think about a better way to
    // remove @skip. Right now, @skip and @hide are being
    // preocessed in two separate places. This is very messy.
    const skipped = lines.find((line: string) => {
      const indexOf = line.trim().indexOf('@skip');
      const hasSkipped = indexOf > -1 && indexOf < 4;

      if (hasSkipped) {
        return true;
      }

      newComment += `${line}\n`;

      return false;
    });

    block.comment = newComment;

    if (skipped) {
      newSessionText += block.text;
    } else {
      newSessionText += createNewLinesFromTextWithSpace(block.text);
    }
  });

  return newSessionText;
};

export default createSessionText;
