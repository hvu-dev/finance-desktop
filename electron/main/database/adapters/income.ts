import dayjs from 'dayjs';
import {
    Income,
    IncomeCategory,
    IncomeCategoryDBRow,
    IncomeDBRow,
} from '@data/dtos/income';
import { Adapter } from '@data/adapters/base';

export class IncomeAdapter implements Adapter<IncomeDBRow, Income> {
    adapt(data: IncomeDBRow): Income {
        return {
            id: data.id,
            amount: data.amount,
            receivedDate:
                data.receivedDate && dayjs(data.receivedDate).toDate(),
            note: data.note,
            category: {
                id: data.incomeCategoryId,
                name: data.incomeCategoryName,
                value: data.incomeCategoryValue,
                period: {
                    id: data.incomePeriodId,
                    name: data.incomePeriodName,
                    value: Number.parseInt(data.incomePeriodValue),
                },
            },
        };
    }

    adaptMultiple(data: IncomeDBRow[]): Income[] {
        let adaptedData: Income[] = [];
        for (const income of data) {
            adaptedData.push(this.adapt(income));
        }
        return adaptedData;
    }
}

export class IncomeCategoryAdapter
    implements Adapter<IncomeCategoryDBRow, IncomeCategory>
{
    adapt(data: IncomeCategoryDBRow): IncomeCategory {
        return {
            id: data.id,
            name: data.name,
            value: data.value,
            period: {
                id: data.incomePeriodId,
                name: data.incomePeriodName,
                value: Number.parseInt(data.incomePeriodValue),
            },
        };
    }

    adaptMultiple(data: IncomeCategoryDBRow[]): IncomeCategory[] {
        let adaptedData: IncomeCategory[] = [];
        for (const row of data) {
            adaptedData.push(this.adapt(row));
        }
        return adaptedData;
    }
}
