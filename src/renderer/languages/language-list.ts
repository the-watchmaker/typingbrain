import { javascript } from '@codemirror/lang-javascript';

import {
  LanguageSupport,
  StreamLanguage,
  StreamParser,
} from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { rust } from '@codemirror/legacy-modes/mode/rust';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { mySQL } from '@codemirror/legacy-modes/mode/sql';
import { css } from '@codemirror/legacy-modes/mode/css';
import { sass } from '@codemirror/legacy-modes/mode/sass';
import { python } from '@codemirror/legacy-modes/mode/python';
import { commonLisp } from '@codemirror/legacy-modes/mode/commonlisp';
import { swift } from '@codemirror/legacy-modes/mode/swift';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { r } from '@codemirror/legacy-modes/mode/r';
import { fortran } from '@codemirror/legacy-modes/mode/fortran';
import { erlang } from '@codemirror/legacy-modes/mode/erlang';
import { dockerFile } from '@codemirror/legacy-modes/mode/dockerfile';
import { cobol } from '@codemirror/legacy-modes/mode/cobol';
import { nginx } from '@codemirror/legacy-modes/mode/nginx';
import {
  c,
  cpp,
  java,
  csharp,
  kotlin,
  dart,
  objectiveC,
} from '@codemirror/legacy-modes/mode/clike';

export type TLanguage = {
  name: string;
  code: string;
  extension: LanguageSupport | StreamLanguage<any> | StreamParser<any> | null;
};

export const languageList: { [code: string]: TLanguage } = {
  text: {
    name: 'Text',
    code: 'text',
    extension: null,
  },
  javascript: {
    name: 'JavaScript',
    code: 'javascript',
    extension: javascript({ jsx: false, typescript: false }),
  },
  jsx: {
    name: 'jsx',
    code: 'jsx',
    extension: javascript({ jsx: true, typescript: false }),
  },
  tsx: {
    name: 'tsx',
    code: 'tsx',
    extension: javascript({ jsx: true, typescript: true }),
  },
  typescript: {
    name: 'TypeScript',
    code: 'typescript',
    extension: javascript({ jsx: false, typescript: true }),
  },
  go: {
    name: 'Go',
    code: 'go',
    extension: StreamLanguage.define(go),
  },
  python: {
    name: 'Python',
    code: 'python',
    extension: StreamLanguage.define(python),
  },
  dockerfile: {
    name: 'DockerFile',
    code: 'dockerfile',
    extension: StreamLanguage.define(dockerFile),
  },
  yaml: {
    name: 'YAML',
    code: 'yaml',
    extension: StreamLanguage.define(yaml),
  },
  lua: {
    name: 'Lua',
    code: 'lua',
    extension: StreamLanguage.define(lua),
  },
  swift: {
    name: 'Swift',
    code: 'swift',
    extension: StreamLanguage.define(swift),
  },
  shell: {
    name: 'Shell',
    code: 'shell',
    extension: StreamLanguage.define(shell),
  },
  r: {
    name: 'R',
    code: 'r',
    extension: StreamLanguage.define(r),
  },
  rust: {
    name: 'Rust',
    code: 'rust',
    extension: StreamLanguage.define(rust),
  },
  ruby: {
    name: 'Ruby',
    code: 'ruby',
    extension: StreamLanguage.define(ruby),
  },
  c: {
    name: 'C',
    code: 'c',
    extension: StreamLanguage.define(c),
  },
  cpp: {
    name: 'C++',
    code: 'cpp',
    extension: StreamLanguage.define(cpp),
  },
  java: {
    name: 'Java',
    code: 'java',
    extension: StreamLanguage.define(java),
  },
  csharp: {
    name: 'C#',
    code: 'charp',
    extension: StreamLanguage.define(csharp),
  },
  kotlin: {
    name: 'Kotlin',
    code: 'kotlin',
    extension: StreamLanguage.define(kotlin),
  },
  dart: {
    name: 'Dart',
    code: 'dart',
    extension: StreamLanguage.define(dart),
  },
  objectivec: {
    name: 'objectiveC',
    code: 'objectivec',
    extension: StreamLanguage.define(objectiveC),
  },
  css: {
    name: 'CSS',
    code: 'css',
    extension: StreamLanguage.define(css),
  },
  mysql: {
    name: 'MySQL',
    code: 'mysql',
    extension: StreamLanguage.define(mySQL),
  },
  sass: {
    name: 'SASS',
    code: 'sass',
    extension: StreamLanguage.define(sass),
  },
  lisp: {
    name: 'Lisp',
    code: 'lisp',
    extension: StreamLanguage.define(commonLisp),
  },
  cobol: {
    name: 'Cobol',
    code: 'cobol',
    extension: StreamLanguage.define(cobol),
  },
  erlang: {
    name: 'Erlang',
    code: 'erlang',
    extension: StreamLanguage.define(erlang),
  },
  fortran: {
    name: 'Fortran',
    code: 'fortran',
    extension: StreamLanguage.define(fortran),
  },
  nginx: {
    name: 'Nginx',
    code: 'nginx',
    extension: nginx,
  },
};

export const languageOptions = Object.values(languageList).map((language) => ({
  label: language.name,
  value: language.code,
}));
