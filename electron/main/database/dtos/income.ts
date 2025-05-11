export type IncomeType = {
    id: number;
    name: string;
    value: string;
};

export type IncomeDBRow = {
    id: number;
    receivedDate: string;
    amount: number;
    note: string;
    typeId: number;
    typeName: string;
    typeValue: string;
};

export type Income = {
    id: number;
    receivedDate: Date;
    amount: number;
    note: string;
    type: IncomeType;
};
