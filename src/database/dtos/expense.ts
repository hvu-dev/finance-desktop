import { Category } from './category';
import { PaginationParams } from './common';

export type ExpenseDBRow = {
    id: number;
    title: string;
    amount: number;
    spentDate: string;
    note: string;
    categoryId: number;
    categoryValue: string;
    categoryName: string;
};

export type Expense = {
    id: number;
    title: string;
    amount: number;
    spentDate: Date;
    note: string;
    category: Category;
};

export type CreateExpenseDto = {
    id: number;
    title: string;
    amount: number;
    spentDate: string;
    note: string;
    categoryId: number;
};

export type UpdateExpenseDto = {
    id: number;
    title: string;
    amount: number;
    spentDate: string;
    note: string;
    categoryId: number;
};

export type ExpenseGetFilterParams = {} & PaginationParams;
