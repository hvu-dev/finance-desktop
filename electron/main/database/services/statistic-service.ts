import { CategorySum, DayExpenseSum } from '../dtos/statistic';
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

    /**
     * Get expense summary by each period
     * @param period sum of expense by period
     */
    public getSumExpenseByPeriod(numberOfDays: number = 30): DayExpenseSum[] {
        return this.databaseRepository
            .prepare(
                `WITH RECURSIVE dates(d) AS (
                VALUES(date('now', @numberOfDays))
                UNION ALL
                SELECT date(d, '+1 day')
                FROM dates
                WHERE d < date('now')
            )
            SELECT d as spentDate, COALESCE(SUM(e.amount), 0) as total FROM dates
            LEFT JOIN expenses as e ON date(e.spentDate) = d
            GROUP BY d;`
            )
            .all({ numberOfDays: `-${numberOfDays - 1} day` });
    }
}
