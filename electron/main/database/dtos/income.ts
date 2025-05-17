export type IncomePeriod = {
    id: number;
    name: string;
    value: string;
};

export type IncomeCategory = {
    id: number;
    name: string;
    value: string;
    period: IncomePeriod;
};

export type IncomeDBRow = {
    id: number;
    receivedDate: string;
    amount: number;
    note: string;
    incomeCategoryId: number;
    incomeCategoryName: string;
    incomeCategoryValue: string;
    incomePeriodId: number;
    incomePeriodName: string;
    incomePeriodValue: string;
};

export type Income = {
    id: number;
    receivedDate: Date;
    amount: number;
    note: string;
    category: IncomeCategory;
};
