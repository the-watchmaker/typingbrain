/* eslint-disable no-multi-assign */
exports.ada = { LINE_REGEX: /^--.*/, strip: [/--\s?/] };
exports.apl = { LINE_REGEX: /^⍝.*/, strip: [/⍝\s?/] };

exports.applescript = {
  BLOCK_OPEN_REGEX: /^\(\*/,
  BLOCK_CLOSE_REGEX: /^\*\)/,
  strip: [/\(\s?/, /\s?\)/],
};

exports.csharp = {
  LINE_REGEX: /^\/\/.*/,
  strip: [/\/\/\s?/],
};

exports.haskell = {
  BLOCK_OPEN_REGEX: /^\{-/,
  BLOCK_CLOSE_REGEX: /^-\}/,
  LINE_REGEX: /^--.*/,
  strip: [/--\s?/, /\{-\s?/, /\s?-\}/],
};

exports.html = {
  BLOCK_OPEN_REGEX: /^\n*<!--(?!-?>)/,
  BLOCK_CLOSE_REGEX: /^(?<!(?:<!-))-->/,
  BLOCK_CLOSE_LOOSE_REGEX: /^(?<!(?:<!-))--\s*>/,
  BLOCK_CLOSE_STRICT_NEWLINE_REGEX: /^(?<!(?:<!-))-->(\s*\n+|\n*)/,
  BLOCK_CLOSE_STRICT_LOOSE_REGEX: /^(?<!(?:<!-))--\s*>(\s*\n+|\n*)/,
  strip: [/(<!--\s?|<!--\s?|\s?-->)/],
};

exports.javascript =
  exports.go =
  exports.rust =
  exports.coffeescript =
    {
      BLOCK_OPEN_REGEX: /^\/\*\*?(!?)/,
      BLOCK_CLOSE_REGEX: /^\*\/(\n?)/,
      LINE_REGEX: /^\/\/(!?).*/,
      strip: [/\/\*\s?/, /\s?\*\/\s?/, /\/\/\s?/],
    };

exports.lua = {
  BLOCK_OPEN_REGEX: /^--\[\[/,
  BLOCK_CLOSE_REGEX: /^\]\]/,
  LINE_REGEX: /^--.*/,
  strip: [/--\s?\[\[/, /\s?\]\]/, /--\s?/],
};

exports.matlab = {
  BLOCK_OPEN_REGEX: /^%{/,
  BLOCK_CLOSE_REGEX: /^%}/,
  LINE_REGEX: /^%.*/,
  strip: [/%\s?\{\s?/, /\s?\}\s?/, /%\s?/],
};

exports.perl = {
  LINE_REGEX: /^#.*/,
  strip: [/#\s?/],
};

exports.php = {
  ...exports.javascript,
  LINE_REGEX: /^(#|\/\/).*?(?=\?>|\n)/,
  strip: [/\/\*\s?/, /\s?\*\/\s?/, /\/\/\s?/],
};

exports.python = {
  BLOCK_OPEN_REGEX: /^"""/,
  BLOCK_CLOSE_REGEX: /^"""/,
  LINE_REGEX: /^#.*/,
  strip: [/"""\s?/, /\s?"""/, /#\s?/],
};

exports.ruby = {
  BLOCK_OPEN_REGEX: /^=begin/,
  BLOCK_CLOSE_REGEX: /^=end/,
  LINE_REGEX: /^#.*/,
  strip: [/=\s?begin\s?/, /\s?end\s?/, /#\s?/],
};

exports.shell = {
  LINE_REGEX: /^#.*/,
  strip: [/#\s?/],
};

exports.shebang = exports.hashbang = {
  LINE_REGEX: /^#!.*/,
  strip: [/#\s?/],
};

exports.c = exports.javascript;
exports.csharp = exports.javascript;
exports.css = exports.javascript;
exports.java = exports.javascript;
exports.js = exports.javascript;
exports.less = exports.javascript;
exports.pascal = exports.applescript;
exports.ocaml = exports.applescript;
exports.sass = exports.javascript;
exports.sql = exports.ada;
exports.swift = exports.javascript;
exports.ts = exports.javascript;
exports.typscript = exports.javascript;
exports.xml = exports.html;
