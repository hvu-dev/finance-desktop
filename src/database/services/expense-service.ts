import { Adapter } from '../adapters/base';
import { Expense, ExpenseDBRow } from '../dtos/expense';
import { DatabaseRepository } from '../repository/database';

export class ExpenseService {
    constructor(
        private databaseRepository: DatabaseRepository,
        private adapter: Adapter<ExpenseDBRow[], Expense[]>
    ) {}

    getAll(filterString?: string): Expense[] {
        const data: ExpenseDBRow[] = this.databaseRepository
            .prepare(
                `
            SELECT e.id, e.title, e.amount, e.spentDate, e.note, e.categoryId, c.value as categoryValue, c.name as categoryName
            FROM expenses as e 
            INNER JOIN categories as c 
            ON c.rowid = e.categoryId;
        `
            )
            .all();

        return this.adapter.adapt(data);
    }
}
