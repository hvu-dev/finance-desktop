export type Category = {
    id: number;
    value: string;
};

export type Expense = {
    id: number;
    title: string;
    amount: number;
    dateSpent: Date;
    categories: Category[];
};
