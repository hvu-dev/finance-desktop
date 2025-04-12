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

    /**
     *
     * @param period sum of expense by period (week - 7 days, month - 30 days, year - 365 days)
     */
    public getSumExpenseByPeriod(period = 'week') {
        let numberOfDays = 0;

        switch (period) {
            case 'month':
                numberOfDays = 30;
            case 'year':
                numberOfDays = 365;
            default:
                numberOfDays = 7;
        }

        return this.databaseRepository
            .prepare(
                `SELECT e.spentDate, SUM(e.amount) as total
                FROM expenses as e
                WHERE (JULIANDAY('now') - JULIANDAY(e.spentDate)) <= @numberOfDays
                GROUP BY spentDate;`
            )
            .all({ numberOfDays: numberOfDays });
    }
}
