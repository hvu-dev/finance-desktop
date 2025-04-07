import { CategoryAdapter } from '../adapters/category';
import { ExpenseAdapter } from '../adapters/expense';
import { DatabaseRepository } from '../repository/database';
import { CategoryService } from './category-service';
import { ExpenseService } from './expense-service';
import { StatisticService } from './statistic-service';

class ServiceFactory {
    private databaseRepository: DatabaseRepository;

    constructor() {
        this.databaseRepository = new DatabaseRepository();
    }

    public createExpenseService(): ExpenseService {
        return new ExpenseService(
            this.databaseRepository,
            new ExpenseAdapter()
        );
    }

    public createCategoryService(): CategoryService {
        return new CategoryService(
            this.databaseRepository,
            new CategoryAdapter()
        );
    }

    public createStatisticService(): StatisticService {
        return new StatisticService(this.databaseRepository);
    }
}

export default ServiceFactory;
