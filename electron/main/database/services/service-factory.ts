import path from 'path';

import { CategoryAdapter } from '@data/adapters/category';
import { ExpenseAdapter } from '@data/adapters/expense';
import { IncomeAdapter } from '@data/adapters/income';

import { CategoryService } from '@data/services/category-service';
import { DatabaseRepository } from '@data/repository/database';
import { ExpenseService } from '@data/services/expense-service';
import { IncomeService } from '@data/services/income-service';
import { StatisticService } from '@data/services/statistic-service';

import DatabaseMigrator from '@data/migrations/migrator';
import {
    Migration0001,
    Migration0002,
    Migration0003,
} from '@data/migrations/index';

class ServiceFactory {
    private app: Electron.App;
    private databaseRepository: DatabaseRepository;

    constructor(app: Electron.App) {
        this.app = app;
        this.databaseRepository = new DatabaseRepository(
            path.join(this.app.getPath('userData'), 'data.db')
        );
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

    public createMigrationService(): DatabaseMigrator {
        const migrator = new DatabaseMigrator(this.databaseRepository);
        migrator.addMigration(new Migration0001());
        migrator.addMigration(new Migration0002());
        migrator.addMigration(new Migration0003());
        return migrator;
    }

    public createIncomeService(): IncomeService {
        return new IncomeService(this.databaseRepository, new IncomeAdapter());
    }
}

export default ServiceFactory;
