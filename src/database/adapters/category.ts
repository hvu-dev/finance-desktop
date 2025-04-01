import { Category, CategoryDBRow } from '../dtos/category';
import { Adapter } from './base';

export class CategoryAdapter implements Adapter<CategoryDBRow[], Category[]> {
    adapt(data: CategoryDBRow[]): Category[] {
        let adaptedData: Category[] = [];
        for (const row of data) {
            adaptedData.push({
                id: row.id,
                name: row.name,
                value: row.value,
            });
        }
        return adaptedData;
    }
}
