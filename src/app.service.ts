import { Injectable } from '@nestjs/common';
import { message } from './interfaces/message';

@Injectable()
export class AppService {
  db: any;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sqlite3 = require('sqlite3').verbose();
    this.db = new sqlite3.Database('database.db');
  }

  getMessages(callback): void {
    this.db.all('SELECT * FROM messages', (err, res) => {
      if (err) throw err;
      callback(res);
    });
  }

  addMessage(message: message) {
    this.db.run(
      'INSERT INTO messages(author,message) VALUES (?,?)',
      message.author,
      message.message,
    );
  }

  deleteMessages(): void {
    this.db.run('DELETE FROM messages');
  }
}
