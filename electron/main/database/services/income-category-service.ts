import { IncomeCategory, IncomeCategoryDBRow } from '@data/dtos/income';
import { Adapter } from '@data/adapters/base';
import { DatabaseRepository } from '@data/repository/database';

export class IncomeCategoryService {
    constructor(
        private databaseRepository: DatabaseRepository,
        private adapter: Adapter<IncomeCategoryDBRow, IncomeCategory>
    ) {}

    getAllIncomeCategories(): IncomeCategory[] {
        const categories = this.databaseRepository
            .prepare(
                `SELECT c.id, c.value, c.name, p.id as incomePeriodId, p.value as incomePeriodValue, p.name as incomePeriodName
                FROM incomeCategories as c
                INNER JOIN incomePeriods as p ON c.incomePeriodId = p.id`
            )
            .all();

        return this.adapter.adaptMultiple(categories);
    }
}
