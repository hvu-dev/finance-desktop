import { Expense } from '../dtos/expense';
import { DatabaseRepository } from '../repository/database';

const mockData: Expense[] = [
    {
        id: 1,
        title: 'Buy milk',
        amount: 30000,
        dateSpent: new Date(),
        category: { id: 1, value: 'Food', name: '' },
    },
];

type ExpenseRow = {
    rowid: number;
    title: string;
    amount: number;
    dateSpent: string;
    note: string;
    categoryId: number;
    categoryValue: string;
    categoryName: string;
};

export class ExpenseService {
    constructor(private databaseRepository: DatabaseRepository) {}

    getAll(filterString?: string): Expense[] {
        const rows: ExpenseRow[] = this.databaseRepository
            .prepare(
                `
            SELECT e.rowid, e.title, e.amount, e.dateSpent, e.note, e.categoryId, c.value as categoryValue, c.name as categoryName
            FROM expenses as e 
            INNER JOIN categories as c 
            ON c.rowid = e.categoryId;
        `
            )
            .all();

        let data: Expense[] = [];
        for (const row of rows) {
            data.push({
                id: row.rowid,
                title: row.title,
                amount: row.amount,
                dateSpent: new Date(),
                category: {
                    id: row.categoryId,
                    name: row.categoryName,
                    value: row.categoryValue,
                },
            });
        }

        return data;
    }
}
