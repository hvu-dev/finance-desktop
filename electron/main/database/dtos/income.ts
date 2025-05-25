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

export type IncomeCategoryDBRow = {
    id: number;
    value: string;
    name: string;
    incomePeriodId: number;
    incomePeriodName: string;
    incomePeriodValue: string;
};

export type IncomePeriod = {
    id: number;
    name: string;
    value: number;
};

export type IncomeCategory = {
    id: number;
    name: string;
    value: string;
    period: IncomePeriod;
};

export type Income = {
    id: number;
    receivedDate: Date;
    amount: number;
    note: string;
    category: IncomeCategory;
};
