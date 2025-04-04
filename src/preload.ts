const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('expenseService', {
    getAllExpenses: () => ipcRenderer.invoke('getAllExpenses'),
    // @ts-ignore
    update: (data) => {
        return ipcRenderer.invoke('updateExpense', data);
    },
});

contextBridge.exposeInMainWorld('categoryService', {
    getAllCategories: () => ipcRenderer.invoke('getAllCategories'),
});
