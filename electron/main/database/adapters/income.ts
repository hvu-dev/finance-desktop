import dayjs from 'dayjs';
import { Income, IncomeDBRow } from '../dtos/income';
import { Adapter } from './base';

export class IncomeAdapter implements Adapter<IncomeDBRow, Income> {
    adapt(data: IncomeDBRow): Income {
        return {
            id: data.id,
            amount: data.amount,
            receivedDate: data.receivedDate && dayjs(data.receivedDate).toDate(),
            note: data.note,
            category: {
                id: data.incomeCategoryId,
                name: data.incomeCategoryName,
                value: data.incomeCategoryValue,
                period: {
                    id: data.incomePeriodId,
                    name: data.incomePeriodName,
                    value: data.incomePeriodValue,
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
