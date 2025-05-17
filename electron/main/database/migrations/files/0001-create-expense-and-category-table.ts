import { DatabaseRepository } from '@data/repository/database';
import { Migration } from '@data/migrations/migrator';

export class Migration0001 implements Migration {
    upgrade(databaseRepository: DatabaseRepository): void {
        databaseRepository.execute(
            `CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY,
                value TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL UNIQUE,
                color TEXT NULL UNIQUE
            );`
        );

        databaseRepository.execute(
            `CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                amount NUMERIC NOT NULL,
                spentDate TEXT NOT NULL,
                note TEXT NULL,
                categoryId INTEGER NOT NULL,
                FOREIGN KEY (categoryId) REFERENCES categories (id) ON DELETE CASCADE ON UPDATE NO ACTION
            );`
        );
    }
    downgrade(databaseRepository: DatabaseRepository): void {
        databaseRepository.execute(
            `DROP TABLE expenses;
            DROP TABLE categories;`
        );
    }
}
