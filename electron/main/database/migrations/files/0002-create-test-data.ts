import { DatabaseRepository } from '@data/repository/database';
import { DEFAULT_CATEGORIES } from '@data/migrations/const';
import { Migration } from '@data/migrations/migrator';

export class Migration0002 implements Migration {
    public createCategories(databaseRepository: DatabaseRepository): void {
        const categoryInsertStmt = databaseRepository.prepare(
            'INSERT OR IGNORE INTO categories (value, name) VALUES (@value, @name)'
        );
        for (const category of DEFAULT_CATEGORIES) {
            categoryInsertStmt.run(category);
        }
    }

    public createExpenses(databaseRepository: DatabaseRepository): void {
        const expenseInsertStmt = databaseRepository.prepare(
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

    upgrade(databaseRepository: DatabaseRepository): void {
        this.createCategories(databaseRepository);
        if (process.env['DEBUG']) {
            this.createExpenses(databaseRepository);
        }
    }

    downgrade(databaseRepository: DatabaseRepository): void {
        databaseRepository.execute(
            `DELETE FROM expenses;
            DELETE FROM categories;`
        );
    }
}
