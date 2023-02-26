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

function createNewLinen(n: number) {
  let text = '';
  for (let i = 0; i < n; i += 1) {
    text += '\n';
  }
  return text;
}

function walk(node: any, currentBlock: any, inBlock: boolean = false) {
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
          if (previousChild?.type !== 'line') {
            currentBlock.text += '\n';
            line += 1;
          }

          break;
        case 'block':
        case 'line':
          if (child.type === 'block' && child.nodes?.length > 0) {
            const [blockInBlock] = walk(child, currentBlock, true);
            currentBlock.comment = blockInBlock.comment;
            currentBlock.previousType = 'line';
            break;
          }

          const comment = `${child.value.replace(/\/\/\s?/, '').trim()} \n\n`;

          if (
            currentBlock.previousType === 'text' &&
            child.line === currentBlock.textLine
          ) {
            currentBlock.comment += comment;
            currentBlock.previousType = 'inline';
            child.type = 'inline'; // We make clear distinction between inline and line comments

            line += BLOCK_LINE_GAP;
            currentBlock.lineTo = line;
            currentBlock.text += createNewLinen(BLOCK_LINE_GAP);
            blocks.push(currentBlock);
            currentBlock = { ...DEFAULT_BLOCK, lineFrom: line };
            break;
          }

          if (
            currentBlock.previousType === 'text' &&
            child.line !== currentBlock.textLine
          ) {
            line += BLOCK_LINE_GAP;
            currentBlock.lineTo = line;
            currentBlock.text += createNewLinen(BLOCK_LINE_GAP);
            blocks.push(currentBlock);
            currentBlock = { ...DEFAULT_BLOCK, comment, lineFrom: line };
            break;
          }

          currentBlock.comment += comment;
          break;
        case 'text':
          if (currentBlock.previousType === 'text' && child.hasInlineComment) {
            line += BLOCK_LINE_GAP;
            currentBlock.lineTo = line;
            currentBlock.text += createNewLinen(BLOCK_LINE_GAP);
            blocks.push(currentBlock);
            currentBlock = { ...DEFAULT_BLOCK, lineFrom: line };
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

  return blocks;
}

export default function parseText(rawText: string) {
  const { nodes } = strip.detail(rawText);

  const blocks = walk(nodes, { ...DEFAULT_BLOCK }, false);

  let text = '';
  blocks.forEach((block) => {
    const blockText = block.text;
    text += blockText;
  });

  return {
    text,
    nodes,
    blocks,
  };
}
