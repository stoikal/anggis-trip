import { type SQLiteDatabase } from 'expo-sqlite';

export const CATEGORIES = {
  FOOD: "Food",
  ACCOMODATION: "Accommodation",
  TRANSPORT: "Transport",
  ACTIVITIES: "Activities",
  ESSENTIALS: "Essentials",
  OTHER: "Other",
}

const expenses = [
  ["2024-11-22", "Contoh", CATEGORIES.FOOD, 1500],
];

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  try {
    let res = await db.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version'
    );

    if (res == null) throw new Error();

    let { user_version: currentDbVersion } = res;

    if (currentDbVersion >= DATABASE_VERSION) {
      return;
    }

    if (currentDbVersion === 0) {
      // await db.execAsync('DROP TABLE expenses')
      await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS expenses (
          id INTEGER PRIMARY KEY NOT NULL,
          date TEXT,
          name TEXT NOT NULL,
          category TEXT,
          amount INTEGER
        );
      `);
      

      for (let expense of expenses) {
        await db.runAsync('INSERT INTO expenses (date, name, category, amount) VALUES (?, ?, ?, ?)', ...expense);
      }
    }
    // if (currentDbVersion === 1) {
    //   Add more migrations
    // }
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  } catch (error) {
    console.log('===~error~===', '👀', error);
  }
}
