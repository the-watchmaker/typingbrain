/* eslint-disable no-useless-catch */
import { ipcMain } from 'electron';
import PracticeService from '../services/practiceService';

export default function practiceController() {
  const practiceService = new PracticeService();

  ipcMain.on('practice:create', async (event, body) => {
    try {
      const runResult = await practiceService.createPractice(body[0]);

      if (runResult?.changes) {
        const practice = await practiceService.readPractice(
          runResult?.lastInsertRowid as number
        );
        event.reply('practice:create', JSON.stringify(practice));
      }
    } catch (e) {
      throw e;
    }
  });

  ipcMain.on('practice:read', async (event, body) => {
    try {
      const practice = await practiceService.readPractice(body[0]);
      event.reply('practice:read', JSON.stringify(practice));
    } catch (e) {
      throw e;
    }
  });

  ipcMain.on('practice:update', async (event, body) => {
    try {
      const practice = await practiceService.updatePractice(body[0]);
      event.reply('practice:update', JSON.stringify(practice));
    } catch (e) {
      throw e;
    }
  });

  ipcMain.on('practice:list', async (event, body) => {
    try {
      const practiceList = await practiceService.listPractice(body[0]);
      event.reply('practice:list', JSON.stringify(practiceList));
    } catch (e) {
      throw e;
    }
  });

  ipcMain.on('practice:delete', async (event, body) => {
    try {
      const practiceList = await practiceService.deletePractice(body[0]);
      event.reply('practice:delete', JSON.stringify(practiceList));
    } catch (e) {
      throw e;
    }
  });
}
