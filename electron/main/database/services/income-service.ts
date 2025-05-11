import { Adapter } from '../adapters/base';
import { DatabaseRepository } from '../repository/database';
import { Income, IncomeDBRow } from '../dtos/income';

export class IncomeService {
    constructor(
        private databaseRepository: DatabaseRepository,
        private adapter: Adapter<IncomeDBRow, Income>
    ) {}

    public getAll(): Income[] {
        // const data: IncomeDBRow[] = this.databaseRepository
        //     .prepare(
        //         `SELECT i.id, i.source, i.receivedDate, i.amount, i.note, t.id as typeId, t.name as typeName, t.value as typeValue
        //         FROM incomes as i
        //         INNER JOIN incomeTypes as t ON i.typeId = t.id;`
        //     )
        //     .all();
        const d: IncomeDBRow[] = [
            {
                id: 1,
                receivedDate: '2023-05-06T00:00:00.000Z',
                amount: 200000,
                note: '',
                typeId: 1,
                typeName: 'salary',
                typeValue: 'salary',
            },
        ];
        return this.adapter.adaptMultiple(d);
    }
}
