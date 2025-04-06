import { DEFAULT_CATEGORIES } from './const';

const Database = require('better-sqlite3');

export class DatabaseRepository {
    private db = new Database('./data.db', {});
    constructor() {
        this.db.pragma('journal_mode = WAL');
        this.migrateTables();
        this.backfillData();
    }

    public close() {
        this.db.close();
    }

    private createCategories() {
        const categoryInsertStmt = this.db.prepare(
            'INSERT OR IGNORE INTO categories (value, name) VALUES (@value, @name)'
        );
        for (const category of DEFAULT_CATEGORIES) {
            categoryInsertStmt.run(category);
        }
    }

    private createExpenses() {
        const expenseInsertStmt = this.db.prepare(
            `INSERT INTO expenses (title, amount, spentDate, note, categoryId) 
            VALUES (@title, @amount, @spentDate, @note, @categoryId)`
        );
        for (const expense of [
            {
                title: 'breakfast',
                amount: 30000,
                spentDate: new Date('2022-03-01').toISOString(),
                note: 'Banh my with homies',
                categoryId: 1,
            },
            {
                title: 'coffee',
                amount: 20000,
                spentDate: new Date('2022-04-05').toISOString(),
                note: null,
                categoryId: 2,
            },
            {
                title: 'books',
                amount: 300000,
                spentDate: new Date('2023-05-06').toISOString(),
                note: 'Theory of Computation',
                categoryId: 3,
            },
            {
                title: 'accommodation',
                amount: 1000000,
                spentDate: new Date('2024-05-08').toISOString(),
                note: null,
                categoryId: 4,
            },
            {
                title: 'bus travel',
                amount: 30000,
                spentDate: new Date('2025-03-09').toISOString(),
                note: 'to Loughborough to hangout with my girlfriend',
                categoryId: 5,
            },
        ]) {
            expenseInsertStmt.run(expense);
        }
    }

    private backfillData() {
        this.createCategories();

        if ((process.env.IS_DEV || 'false').toLowerCase() === 'true') {
            this.createExpenses();
        }
    }

    public execute(statement: string) {
        return this.prepare(statement).run();
    }

    public prepare(statement: string) {
        return this.db.prepare(statement);
    }

    public migrateTables() {
        this.execute(`
            CREATE TABLE IF NOT EXISTS categories(
                id INTEGER PRIMARY KEY,
                value TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL UNIQUE
            );
        `);
        this.execute(`
            CREATE TABLE IF NOT EXISTS expenses(
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                amount NUMERIC NOT NULL,
                spentDate TEXT NOT NULL,
                note TEXT NULL,
                categoryId INTEGER NOT NULL,
                FOREIGN KEY (categoryId)
                    REFERENCES categories (id)
                        ON DELETE CASCADE 
                        ON UPDATE NO ACTION
            );
        `);
    }
}
