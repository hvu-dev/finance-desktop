export type Category = {
    id: number;
    value: string;
    name: string;
};

export type Expense = {
    id: number;
    title: string;
    amount: number;
    dateSpent: Date;
    category: Category;
};
