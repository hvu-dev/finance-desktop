import { DatabaseRepository } from '@data/repository/database';

export interface Migration {
    upgrade(databaseRepository: DatabaseRepository): void;
    downgrade(databaseRepository: DatabaseRepository): void;
}

export default class DatabaseMigrator {
    private targetMigrations: Migration[] = [];

    constructor(private databaseRepository: DatabaseRepository) {}

    public addMigration(migration: Migration) {
        this.targetMigrations.push(migration);
    }

    public migrate(): void {
        for (const migration of this.targetMigrations) {
            migration.upgrade(this.databaseRepository);
        }
    }

    public downgrade(): void {
        for (const migration of this.targetMigrations) {
            migration.downgrade(this.databaseRepository);
        }
    }
}
