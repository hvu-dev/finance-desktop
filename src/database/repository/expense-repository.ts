import { DatabaseRepository } from './database';

export class ExpenseRepository {
    private MAIN_TABLE = 'expenses';

    constructor(private database: DatabaseRepository) {}

    getAll() {
        this.database.execute(`SELECT * FROM ${this.MAIN_TABLE}`);
    }

    getById() {}

    create() {}

    update() {}
}
