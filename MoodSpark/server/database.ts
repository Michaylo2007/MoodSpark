import { Kysely, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

export interface MoodEntry {
  id: string;
  mood: string;
  timestamp: number;
}

export interface DatabaseSchema {
  moods: MoodEntry;
}

const dbPath = path.join(process.env.DATA_DIRECTORY || './data', 'database.sqlite');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqliteDb = new Database(dbPath);
sqliteDb.pragma('journal_mode = delete');

export const db = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({ database: sqliteDb }),
  log: ['query', 'error']
});

export async function initializeDatabase() {
  try {
    console.log('Checking database schema...');
    
    // Check if moods table exists
    const tables = sqliteDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='moods'").all();
    
    if (tables.length === 0) {
      console.log('Creating moods table...');
      await db.schema
        .createTable('moods')
        .addColumn('id', 'text', (col) => col.primaryKey())
        .addColumn('mood', 'text', (col) => col.notNull())
        .addColumn('timestamp', 'integer', (col) => col.notNull())
        .execute();
      
      console.log('Database initialized successfully');
    } else {
      console.log('Database tables already exist');
    }
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}
