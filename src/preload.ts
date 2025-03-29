const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('expenseService', {
    getAllExpenses: () => ipcRenderer.invoke('getAllExpenses'),
});
