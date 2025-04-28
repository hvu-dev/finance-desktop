import path from 'path';

import { CategoryAdapter } from '../adapters/category';
import { ExpenseAdapter } from '../adapters/expense';
import DatabaseMigrator from '../migrations/migrator';
import { DatabaseRepository } from '../repository/database';
import { CategoryService } from './category-service';
import { ExpenseService } from './expense-service';
import { StatisticService } from './statistic-service';
import { Migration0001, Migration0002 } from '../migrations/index';
import { Migration0003 } from '../migrations/files/0003-create-setting-table';
import SettingService from './setting-service';
import { SettingAdapter } from '../adapters/setting';

class ServiceFactory {
    private app: Electron.App;
    private databaseRepository: DatabaseRepository;

    constructor(app: Electron.App) {
        this.app = app;
        this.databaseRepository = new DatabaseRepository(
            './data.db' || path.join(this.app.getPath('userData'), 'data.db')
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

    public createSettingService(): SettingService {
        return new SettingService(
            this.databaseRepository,
            new SettingAdapter()
        );
    }
}

export default ServiceFactory;
