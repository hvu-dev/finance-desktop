import { CategoryAdapter } from '../adapters/category';
import { ExpenseAdapter } from '../adapters/expense';
import { DatabaseRepository } from '../repository/database';
import { CategoryService } from './category-service';
import { ExpenseService } from './expense-service';

class ServiceFactory {
    private databaseRepository: DatabaseRepository;

    constructor() {
        this.databaseRepository = new DatabaseRepository();
    }

    public createExpenseService() {
        return new ExpenseService(
            this.databaseRepository,
            new ExpenseAdapter()
        );
    }

    public createCategoryService() {
        return new CategoryService(
            this.databaseRepository,
            new CategoryAdapter()
        );
    }
}

export default ServiceFactory;
