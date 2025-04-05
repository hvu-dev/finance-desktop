import dayjs from 'dayjs';
import { Expense, ExpenseDBRow } from '../dtos/expense';
import { Adapter } from './base';

export class ExpenseAdapter implements Adapter<ExpenseDBRow, Expense> {
    adapt(data: ExpenseDBRow): Expense {
        return {
            id: data.id,
            title: data.title,
            amount: data.amount,
            spentDate: dayjs(data.spentDate, 'DD/MM/YYYY').toDate(),
            note: data.note,
            category: {
                id: data.categoryId,
                name: data.categoryName,
                value: data.categoryValue,
            },
        };
    }

    adaptMultiple(data: ExpenseDBRow[]): Expense[] {
        let adaptedData: Expense[] = [];
        for (const row of data) {
            adaptedData.push(this.adapt(row));
        }

        return adaptedData;
    }
}
