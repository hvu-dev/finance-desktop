import { Expense } from '../dtos/expense';
import { ExpenseRepository } from '../repository/expense-repository';

const mockData: Expense[] = [
    {
        id: 1,
        title: 'Buy milk',
        amount: 30000,
        dateSpent: new Date(),
        categories: [{ id: 1, value: 'Food' }],
    },
];

export class ExpenseService {
    constructor(private expenseRepo: ExpenseRepository) {}

    getAll(filterString?: string): Expense[] {
        let data = [];
        for (let i = 1; i <= 10; i++) {
            data.push({
                id: i,
                title: 'Milk',
                amount: 5000 * i,
                dateSpent: new Date(),
                categories: [
                    { id: 1, value: 'Food' },
                    { id: 2, value: 'Books' },
                ],
            });
        }
        return data;
    }
}
