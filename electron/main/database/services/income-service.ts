import { Adapter } from '@data/adapters/base';
import { DatabaseRepository } from '@data/repository/database';
import { Income, IncomeDBRow } from '@data/dtos/income';

export class IncomeService {
    constructor(
        private databaseRepository: DatabaseRepository,
        private adapter: Adapter<IncomeDBRow, Income>
    ) {}

    public getAll(): Income[] {
        const data: IncomeDBRow[] = this.databaseRepository
            .prepare(
                `SELECT i.id, i.receivedDate, i.amount, i.note,
                c.id as incomeCategoryId, c.name as incomeCategoryName, c.value as incomeCategoryValue,
                p.id as incomePeriodId, p.name as incomePeriodName, p.value as incomePeriodValue
                FROM incomes as i
                INNER JOIN incomeCategories as c ON i.incomeCategoryId = c.id
                INNER JOIN incomePeriods as p ON c.incomePeriodId = p.id;`
            )
            .all();
        return this.adapter.adaptMultiple(data);
    }
}
