import { DatabaseRepository } from '../repository/database';
import { ExpenseService } from './expense-service';

class ServiceFactory {
    private databaseRepository: DatabaseRepository;

    constructor() {
        this.databaseRepository = new DatabaseRepository();
    }

    public createExpenseService() {
        return new ExpenseService(this.databaseRepository);
    }
}

export default ServiceFactory;
