import { DatabaseRepository } from '../repository/database';
import { ExpenseRepository } from '../repository/expense-repository';
import { ExpenseService } from './expense-service';

class ServiceFactory {
    private databaseRepository: DatabaseRepository;

    constructor() {
        this.databaseRepository = new DatabaseRepository();
    }

    public createExpenseService() {
        return new ExpenseService(
            new ExpenseRepository(this.databaseRepository)
        );
    }
}

export default ServiceFactory;
