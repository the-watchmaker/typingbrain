/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import strip from 'renderer/lib/strip-comments';

const BLOCK_LINE_GAP = 0;

const DEFAULT_BLOCK = {
  comment: '',
  text: '',
  textLine: null,
  previousType: null,
  lineFrom: 1,
};

function walk(
  node: any,
  currentBlock: any,
  lang: any,
  inBlock: boolean = false
) {
  const blocks: any[] = [];
  const commentLines: number[] = [];


  let line = 1;
  // TODO: Create interface
  let previousChild: any = null;

  node.nodes
    .filter((child: any) => {
      if (child.type === 'newline') {
        return true;
      }

      if (child.type === 'block') {
        if (commentLines.indexOf(child.line) === -1) {
          commentLines.push(child.line);
        }
        return true;
      }

      if (child.type === 'line' || child.type === 'text') {
        if (child.type === 'line' && commentLines.indexOf(child.line) === -1) {
          commentLines.push(child.line);
        }
        const text = child.value.replace(/(\r\n|\n|\r)/gm, '').trim();
        if (text.length === 0) {
          return false;
        }

        return true;
      }
      return false;
    })
    .forEach((child: any) => {
      if (child.type === 'text' && inBlock) {
        child.type = 'line';
      }

      if (child.type === 'text' && commentLines.indexOf(child.line) !== -1) {
        child.hasInlineComment = true;
      }

      switch (child.type) {
        case 'newline':
          if (previousChild?.type === 'newline') {
            currentBlock.text += `\n`;
            line += 1;
          }

          if (previousChild?.type === 'text') {
            currentBlock.text += `\n`;
            line += 1;
          }

          if (previousChild?.type === 'inline') {
            currentBlock.text += `\n`;
            line += 1;
          }

          break;
        case 'block':
        case 'line':
          if (child.type === 'block' && child.nodes?.length > 0) {
            if (currentBlock.previousType === 'text') {
              blocks.push(currentBlock);
              currentBlock = {
                ...DEFAULT_BLOCK,
                comment: '',
                lineFrom: line,
                createdAt: 'LB',
              };
            }

            const [blockInBlock] = walk(child, currentBlock, lang, true);
            currentBlock.comment = blockInBlock.comment;
            currentBlock.previousType = 'line';
            break;
          }

          // remove the comment header from comments
          const removed = lang.strip.reduce((val: string, regex: RegExp) => {
            return val.replace(regex as RegExp, '');
          }, child.value);

          const comment = `${removed.trim()} \n\n`;

          if (
            currentBlock.previousType === 'text' &&
            child.line === currentBlock.textLine
          ) {
            currentBlock.comment += comment;
            currentBlock.previousType = 'inline';
            child.type = 'inline'; // We make clear distinction between inline and line comments

            currentBlock.lineTo = line;
            currentBlock.endedAt = 'A';
            blocks.push(currentBlock);
            currentBlock = {
              ...DEFAULT_BLOCK,
              lineFrom: line + 1,
              createdAt: 'A',
            };
            break;
          }

          if (
            currentBlock.previousType === 'text' &&
            child.line !== currentBlock.textLine
          ) {
            currentBlock.lineTo = line - 1;
            currentBlock.endedAt = 'B';
            blocks.push(currentBlock);
            currentBlock = {
              ...DEFAULT_BLOCK,
              comment,
              lineFrom: line,
              createdAt: 'B',
            };
            break;
          }

          currentBlock.comment += comment;
          break;
        case 'text':
          if (currentBlock.previousType === 'text' && child.hasInlineComment) {
            currentBlock.lineTo = line - 1;
            currentBlock.endedAt = 'C';
            blocks.push(currentBlock);
            currentBlock = { ...DEFAULT_BLOCK, lineFrom: line, createdAt: 'C' };
          }

          currentBlock.text += `${child.value}`;
          currentBlock.previousType = 'text';
          currentBlock.textLine = child.line;
          currentBlock.lineTo = line;

          break;
        default:
      }

      previousChild = child;
    });

  line += BLOCK_LINE_GAP;
  currentBlock.lineTo = line;
  blocks.push(currentBlock);

  console.log(blocks);

  return blocks;
}

function getHiddenSelections(line: any, blockText: string, pos: number) {
  const hiddenSelection: { start: number; end: number; text: string }[] = [];
  let text = line.replace('@hide', '').trim();
  const textLength = text.length;
  text = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

  [...blockText.matchAll(new RegExp(text, 'g'))].forEach((a) => {
    const start = (a.index || 0) + pos;
    const end = start + textLength;
    hiddenSelection.push({ start, end, text });
  });
  return hiddenSelection;
}

export default function parseText(rawText: string, language: string) {
  const { nodes } = strip.detail(rawText, { language });

  const blocks = walk(nodes, { ...DEFAULT_BLOCK }, nodes.language, false);

  // TODO refactor
  //
  let text = '';
  let position = 0;
  let hiddenSelections: { start: number; end: number; text: string }[] = [];

  blocks.forEach((block) => {
    // create entire code by combining all block.text
    const blockText = block.text;
    text += blockText;

    // find out which comment lines have @hide
    // and create hidden selections then remove @hide from comment
    const commentLines = block.comment.split('\n');
    let newComment = '';
    commentLines.forEach((line: string) => {
      if (line.indexOf('@hide') === 0) {
        hiddenSelections = [
          ...hiddenSelections,
          ...getHiddenSelections(line, block.text, position),
        ];
      } else {
        newComment += `${line}\n`;
      }
    });

    block.comment = newComment;

    position += blockText.length;
  });

  console.log(nodes);

  return {
    text,
    nodes,
    blocks,
    hiddenSelections,
  };
}
