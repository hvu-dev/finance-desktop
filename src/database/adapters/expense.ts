import { Expense, ExpenseDBRow } from '../dtos/expense';
import { Adapter } from './base';

export class ExpenseAdapter implements Adapter<ExpenseDBRow[], Expense[]> {
    adapt(data: ExpenseDBRow[]): Expense[] {
        let adaptedData: Expense[] = [];
        for (const row of data) {
            adaptedData.push({
                id: row.id,
                title: row.title,
                amount: row.amount,
                spentDate: new Date(row.spentDate),
                note: row.note,
                category: {
                    id: row.categoryId,
                    name: row.categoryName,
                    value: row.categoryValue,
                },
            });
        }

        return adaptedData;
    }
}
