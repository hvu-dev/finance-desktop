const Database = require('better-sqlite3');

export class DatabaseRepository {
    private db;

    constructor(private databaseName: string = './data.db') {
        this.db = new Database(databaseName, {});
        this.db.pragma('journal_mode = WAL');
    }

    public close() {
        this.db.close();
    }

    public execute(statement: string) {
        return this.db.exec(statement);
    }

    public prepare(statement: string) {
        return this.db.prepare(statement);
    }
}
