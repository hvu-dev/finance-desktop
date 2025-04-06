import { CategorySum } from '../dtos/statistic';
import { DatabaseRepository } from '../repository/database';

export class StatisticService {
    constructor(private databaseRepository: DatabaseRepository) {}

    public getSumByCategory(): CategorySum[] {
        return this.databaseRepository
            .prepare(
                `SELECT c.id, c.value, c.name, SUM(e.amount) as total
                FROM expenses as e
                INNER JOIN categories as c ON c.id = e.categoryId
                GROUP BY c.value
                ORDER BY total DESC;`
            )
            .all();
    }

    public getSumByExpense(): number {
        return this.databaseRepository
            .prepare(
                `SELECT SUM(e.amount)
                FROM expenses as e;`
            )
            .pluck()
            .get();
    }
}
