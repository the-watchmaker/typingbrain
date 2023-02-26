/* eslint-disable lines-between-class-members */
/* eslint-disable max-classes-per-file */
class Node {
  constructor(node) {
    this.type = node.type;
    if (node.value) this.value = node.value;
    if (node.match) this.match = node.match;
    this.newline = node.newline || '';
    this.line = node.line;
  }
  get protected() {
    return Boolean(this.match) && this.match[1] === '!';
  }
}

class Block extends Node {
  constructor(node) {
    super(node);
    this.nodes = node.nodes || [];
    this.line = node.line;
  }
  push(node) {
    this.nodes.push(node);
  }
  get protected() {
    return this.nodes.length > 0 && this.nodes[0].protected === true;
  }
}

module.exports = { Node, Block };
