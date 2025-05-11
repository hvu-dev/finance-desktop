import { DatabaseRepository } from '../../repository/database';
import { DEFAULT_INCOME_CATEGORIES, DEFAULT_INCOME_PERIODS } from '../const';
import { Migration } from '../migrator';

export class Migration0003 implements Migration {
    private createIncomeCategories(databaseRepository: DatabaseRepository) {
        const categoryInsertStmt = databaseRepository.prepare(
            `INSERT OR IGNORE INTO incomeCategories (value, name, incomePeriodId)
            VALUES (@value, @name, @incomePeriodId)`
        );
        for (const category of DEFAULT_INCOME_CATEGORIES) {
            categoryInsertStmt.run(category);
        }
    }

    private createIncomePeriods(databaseRepository: DatabaseRepository) {
        const periodInsertStmt = databaseRepository.prepare(
            `INSERT OR IGNORE INTO incomePeriods (id, value, name) 
            VALUES (@id, @value, @name)`
        );
        for (const period of DEFAULT_INCOME_PERIODS) {
            periodInsertStmt.run(period);
        }
    }

    /**
     * Create new incomes tables and create initial data
     *
     * Note:
     * receivedDate is intended for non-regular income.
     * period is intended for regular income.
     */
    upgrade(databaseRepository: DatabaseRepository): void {
        databaseRepository.execute(
            `CREATE TABLE IF NOT EXISTS incomePeriods (
            id INTEGER PRIMARY KEY,
            value INTEGER NOT NULL,
            name TEXT NOT NULL UNIQUE);`
        );

        databaseRepository.execute(
            `CREATE TABLE IF NOT EXISTS incomeCategories (
            id INTEGER PRIMARY KEY,
            value TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL UNIQUE,
            incomePeriodId INTEGER NOT NULL,
            FOREIGN KEY (incomePeriodId) REFERENCES incomePeriods (id) ON DELETE CASCADE ON UPDATE NO ACTION);`
        );

        databaseRepository.execute(
            `CREATE TABLE IF NOT EXISTS incomes (
            id INTEGER PRIMARY KEY,
            amount NUMERIC NOT NULL,
            receivedDate TEXT NULL,
            isActive INTEGER NOT NULL DEFAULT 1,
            note TEXT NULL,
            incomeCategoryId INTEGER NOT NULL,
            FOREIGN KEY (incomeCategoryId) REFERENCES incomeCategories (id) ON DELETE CASCADE ON UPDATE NO ACTION);`
        );

        this.createIncomePeriods(databaseRepository);
        this.createIncomeCategories(databaseRepository);
    }

    downgrade(databaseRepository: DatabaseRepository): void {
        databaseRepository.execute(
            `DROP TABLE incomes;
            DROP TABLE incomeCategories;
            DROP TABLE incomePeriods;`
        );
    }
}
