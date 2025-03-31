const Database = require('better-sqlite3');

export class DatabaseRepository {
    private db = new Database('./data.db', {});
    constructor() {
        this.db.pragma('journal_mode = WAL');
        try {
            this.migrateTables();
            this.backfillData();
        } catch (err) {}
    }

    public close() {
        this.db.close();
    }

    public backfillData() {
        const categoryInsert = this.db.prepare(
            'INSERT INTO categories (value, name) VALUES (@value, @name)'
        );
        for (const category of [
            { value: 'food', name: 'Food' },
            { value: 'drink', name: 'Drink' },
            { value: 'study', name: 'Study' },
        ]) {
            categoryInsert.run(category);
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
                value TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL UNIQUE
            );
        `);
        this.execute(`
            CREATE TABLE IF NOT EXISTS expenses(
                title TEXT NOT NULL,
                amount NUMERIC NOT NULL,
                dateSpent TEXT NOT NULL,
                note TEXT NULL,
                categoryId INTEGER NOT NULL,
                FOREIGN KEY (categoryId)
                    REFERENCES categories (rowid)
                        ON DELETE CASCADE 
                        ON UPDATE NO ACTION
            );
        `);
    }
}
