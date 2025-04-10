const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('expenseService', {
    // @ts-ignore
    getAllExpenses: (data) => {
        return ipcRenderer.invoke('getAllExpenses', data);
    },
    // @ts-ignore
    update: (data) => {
        return ipcRenderer.invoke('updateExpense', data);
    },
    // @ts-ignore
    create: (data) => {
        return ipcRenderer.invoke('create', data);
    },
    countAllExpenses: () => ipcRenderer.invoke('countAllExpenses'),
});

contextBridge.exposeInMainWorld('categoryService', {
    getAllCategories: () => ipcRenderer.invoke('getAllCategories'),
});

contextBridge.exposeInMainWorld('statisticService', {
    getSumByExpense: () => ipcRenderer.invoke('getSumByExpense'),
    getSumByCategory: () => ipcRenderer.invoke('getSumByCategory'),
});
