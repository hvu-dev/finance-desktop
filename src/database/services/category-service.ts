import { Adapter } from '../adapters/base';
import { Category, CategoryDBRow } from '../dtos/category';
import { DatabaseRepository } from '../repository/database';

export class CategoryService {
    constructor(
        private databaseRepository: DatabaseRepository,
        private adapter: Adapter<CategoryDBRow, Category>
    ) {}

    getAll(filterString?: string): Category[] {
        const data: CategoryDBRow[] = this.databaseRepository
            .prepare(
                `SELECT c.id, c.value, c.name
                FROM categories as c;`
            )
            .all();
        return this.adapter.adaptMultiple(data);
    }
}
