// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electron', {
//     invoke: (channel, data) => ipcRenderer.invoke(channel, data)
// });


const { contextBridge, ipcRenderer } = require('electron');
// const {dialog} = require('electron').remote;

contextBridge.exposeInMainWorld('api', {
  getCustomers: (filter) => {
    console.log('Invoking get-customers with filter:', filter);
    return ipcRenderer.invoke('get-customers', filter);
  },
  searchCustomer: (username) => {
    return ipcRenderer.invoke('search-customer', username);
  },
  updateCustomer: (user) => {
    return ipcRenderer.invoke('update-customer', user);
  },
  addCustomer: (user) => {
    return ipcRenderer.invoke('add-customer', user);
  },
  addBill:(bill)=>{
    return ipcRenderer.invoke('add-bill',bill);
  },
  deleteCustomer: (user) => {
    return ipcRenderer.invoke('delete-customer', user);
  },
  deleteItem:(item)=>{
    return ipcRenderer.invoke("delete-item",item);
  },
  deleteInvoice:(invoice)=>{
    return ipcRenderer.invoke("delete-invoice",invoice);
  },
  getItems: (filter) => {
    console.log('Invoking Items with filter:', filter);
    return ipcRenderer.invoke('get-items', filter);
  },
  searchItems: (item) => {
    return ipcRenderer.invoke('search-item', item);
  },
  updateItems: (item) => {
    return ipcRenderer.invoke('update-item', item);
  },
  addItem: (item) => {
    return ipcRenderer.invoke('add-item', item);
  },
  getBills:(item)=>{
    return ipcRenderer.invoke('get-bills',item);
  },
  getFromAddress:()=>{
    return ipcRenderer.invoke('get-from-address');
  },
  readConfig: () => ipcRenderer.invoke('read-config'),
  showDialog: (options) => {
    return ipcRenderer.invoke('show-dialog', options);
  },
  loginUser: (username, password)=>{
    return ipcRenderer.invoke('login',{ username, password });
  },
  getCustomerNames: () => ipcRenderer.invoke('get-customer-names'),
  getItemNames:()=>ipcRenderer.invoke('get-item-names'),
  getItemRate: (itemName) => ipcRenderer.invoke('get-item-rate', itemName),
  generatePDF: (htmlContent) => ipcRenderer.invoke('generate-pdf', htmlContent)
  // generateWord: (htmlContent) => ipcRenderer.invoke('generate-word', htmlContent),
  // generateHTML: (htmlContent) => ipcRenderer.invoke('generate-html', htmlContent)

});

