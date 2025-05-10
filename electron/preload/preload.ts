const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('expenseService', {
    countAllExpenses: () => ipcRenderer.invoke('countAllExpenses'),
    // @ts-ignore
    create: (data) => {
        return ipcRenderer.invoke('create', data);
    },
    // @ts-ignore
    delete: (data) => {
        return ipcRenderer.invoke('delete', data);
    },
    // @ts-ignore
    getAllExpenses: (data) => {
        return ipcRenderer.invoke('getAllExpenses', data);
    },
    // @ts-ignore
    update: (data) => {
        return ipcRenderer.invoke('updateExpense', data);
    },
});

contextBridge.exposeInMainWorld('categoryService', {
    getAllCategories: () => ipcRenderer.invoke('getAllCategories'),
});

contextBridge.exposeInMainWorld('settingService', {
    getSettings: () => ipcRenderer.invoke('getSettings'),
});

contextBridge.exposeInMainWorld('statisticService', {
    getSumByExpense: () => ipcRenderer.invoke('getSumByExpense'),
    getSumByCategory: () => ipcRenderer.invoke('getSumByCategory'),
    // @ts-ignore
    getSumExpenseByPeriod: (data) => {
        return ipcRenderer.invoke('getSumExpenseByPeriod', data);
    },
});
