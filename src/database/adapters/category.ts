import { Category, CategoryDBRow } from '../dtos/category';
import { Adapter } from './base';

export class CategoryAdapter implements Adapter<CategoryDBRow, Category> {
    adapt(data: CategoryDBRow): Category {
        return {
            id: data.id,
            name: data.name,
            value: data.value,
        };
    }

    adaptMultiple(data: CategoryDBRow[]): Category[] {
        let adaptedData: Category[] = [];
        for (const row of data) {
            adaptedData.push(this.adapt(row));
        }
        return adaptedData;
    }
}
