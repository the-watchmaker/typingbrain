import { IPractice } from 'main/models/models';

// const objectPerTimestamp: { [stamp: number]: IPractice } = {};

// TODO validate practice
export const createPracticeIpc = (practice: IPractice, cb: Function) => {
  const newStamp = Date.now();

  // objectPerTimestamp[newStamp] = practice;
  window.api.sendMessage('practice:create', [
    {
      ...practice,
    },
    newStamp,
  ]);

  window.api.once('practice:create', (arg) => {
    if (arg) {
      cb(JSON.parse(arg as string));
    }
  });
};

// TODO validate practice
export const updatePracticeIpc = (practice: IPractice, cb: Function) => {
  window.api.sendMessage('practice:update', [
    {
      ...practice,
    },
  ]);

  window.api.once('practice:update', (arg) => {
    // eslint-disable-next-line no-console
    if (arg) {
      const updatedPractice: IPractice = JSON.parse(arg as string);
      cb(updatedPractice);
    }
  });
};

// TODO create interface for search opts
export const getPracticeListIpc = (opts: any, cb: Function) => {
  // TODO validate practice
  window.api.sendMessage('practice:list', [
    {
      // TODO make it dynamic
      limit: 100,
    },
  ]);

  window.api.once('practice:list', (arg) => {
    let projects = [];

    if (typeof arg === 'string') {
      projects = JSON.parse(arg);
    }

    cb(projects);
  });
};

export const getPracticeIpc = (id: number, cb: Function) => {
  window.api.sendMessage('practice:read', [
    {
      id,
    },
  ]);

  window.api.once('practice:read', (arg) => {
    let project = {};

    if (typeof arg === 'string') {
      project = JSON.parse(arg);
    }

    cb(project);
  });
};

export const deletePracticeIpc = (id: number, cb: Function) => {
  window.api.sendMessage('practice:delete', [
    {
      id,
    },
  ]);

  window.api.once('practice:delete', (arg) => {
    cb(arg);
  });
};
