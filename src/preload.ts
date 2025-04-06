const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('expenseService', {
    getAllExpenses: () => ipcRenderer.invoke('getAllExpenses'),
    // @ts-ignore
    update: (data) => {
        return ipcRenderer.invoke('updateExpense', data);
    },
    // @ts-ignore
    create: (data) => {
        return ipcRenderer.invoke('create', data);
    },
});

contextBridge.exposeInMainWorld('categoryService', {
    getAllCategories: () => ipcRenderer.invoke('getAllCategories'),
});

contextBridge.exposeInMainWorld('statisticService', {
    getSumByExpense: () => ipcRenderer.invoke('getSumByExpense'),
    getSumByCategory: () => ipcRenderer.invoke('getSumByCategory'),
});
