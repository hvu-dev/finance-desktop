const Database = require('better-sqlite3');

export class DatabaseRepository {
    private connection = new Database('./data.db', {});

    close() {
        this.connection.close();
    }

    execute(statement: string) {
        this.connection.exec(statement);
    }
}
