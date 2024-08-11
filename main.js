const { app, BrowserWindow, ipcMain,dialog } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
// const path = require('path');
const { create } = require('electron-html-to');
const fs = require('fs');
// const htmlDocx = require('html-docx-js');
const puppeteer = require('puppeteer');
// const pdf = require('html-pdf');
var CONFIG=require('./config.json');
const { promises } = require('dns');
const saltRounds = 10;
const db = new sqlite3.Database('./users.db');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('show-dialog', async (event, options) => {
  return dialog.showMessageBox(options);
});


ipcMain.handle('login', async (event, { username, password }) => {
    console.log('Received login request:', { username, password });

    return new Promise((resolve, reject) => {
        if (!username || !password) {
            console.log('Username or password missing');
            resolve({ success: false, message: 'Username and password are required' });
            return;
        }

        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                console.log('Database error:', err);
                resolve({ success: false, message: 'Database error' });
            } else if (row) {
                console.log('User found:', row);
                bcrypt.compare(password, row.password, (err, result) => {
                    if (err) {
                        console.log('Error comparing passwords:', err);
                        resolve({ success: false, message: 'Error comparing passwords' });
                    } else if (result) {
                        console.log('Login successful');
                        resolve({ success: true });
                    } else {
                        console.log('Invalid username or password');
                        resolve({ success: false, message: 'Invalid username or password' });
                    }
                });
            } else {
                console.log('User not found');
                resolve({ success: false, message: 'Invalid username or password' });
            }
        });
    });
});

function insertUser(username, password) {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            console.error('Database error:', err);
        } else if (row) {
            console.log('Username already exists:', username);
        } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                } else {
                    console.log('Hashed password:', hash);
                    db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], function(err) {
                        if (err) {
                            console.error('Error inserting user:', err);
                        } else {
                            console.log('User inserted with ID:', this.lastID);
                        }
                    });
                }
            });
        }
    });
}

function insertcustomer(custname,address,city,pincode,phoneno,gstno) {
        db.get('SELECT * FROM customers WHERE custname = ?', [custname], (err, row) => {
            
            if (err) {
                console.error('Database error:', err);
            } else if (row) {
                console.log('Customer already exists:', custname);
            } 
            else{
                custname=custname.toUpperCase();
                address=address.toUpperCase();
                city=city.toUpperCase();
                gstno=gstno.toUpperCase();
                db.run("INSERT INTO customers (custname ,address,city,pincode,phoneno, gstno) VALUES (?,?,?,?,?,?)",[custname,address,city,pincode,phoneno,gstno]);
                console.log("customer "+custname+" stored successfully");
            }
        });
    }
    function insertItems(description,unit,rate) {
      db.get('SELECT * FROM items WHERE description = ?', [description], (err, row) => {
          
          if (err) {
              console.error('Database error:', err);
          } else if (row) {
              console.log('Item already exists:', description);
          } 
          else{
              // item=item.toUpperCase();
              description=description.toUpperCase();
              unit=unit.toUpperCase();
              // gstno=gstno.toUpperCase();
              db.run("INSERT INTO items (description,unit,rate) VALUES (?,?,?)",[description,unit,rate]);
              console.log("Item "+description+" stored successfully");
          }
      });
  }
  function insertBills(custname,buyerOrderNumber,grtotal) {
            custname=custname.toUpperCase();
            var currentDate = new Date()
            var day = currentDate.getDate()
            var month = currentDate.getMonth() + 1
            var year = currentDate.getFullYear()
            var date= day + "/" + month + "/" + year;
            db.run("INSERT INTO bills (custname,grtotal,InvoiceDate,buyer_order_number) VALUES (?,?,?,?)",[custname,grtotal,date,buyerOrderNumber]);
            console.log("bill stored successfully");
        }

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)");

    // Insert a user with hashed password
    const username = 'admin';
    const password = 'admin';
    insertUser(username, password);

    db.run("CREATE TABLE IF NOT EXISTS customers (custname TEXT PRIMARY KEY, address TEXT,city TEXT, pincode TEXT,phoneno TEXT, gstno TEXT)");
    // insertcustomer("Customer1","address1","city1","pincode1","phone1","gstno");
    db.run("CREATE TABLE IF NOT EXISTS items (item INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT,unit TEXT, rate REAL)");
    db.run("CREATE TABLE IF NOT EXISTS bills (invoiceNumber INTEGER PRIMARY KEY AUTOINCREMENT, custname TEXT, buyer_order_number TEXT,InvoiceDate TEXT,grtotal REAL)");
    let  i=1;
    while(i<20){
        insertcustomer("CUSTOMER"+i,"ADDRESS"+i,"CITY"+i,"PINCODE"+i,"PHONE"+i,"GSTNO"+i);
        insertItems("DESCRIPTION"+i,"UNIT"+i,1.2);
        // insertBills("CUSTOMER"+i,"GT/PO/00293/23933","1202.22");
        i++;
    }

});


// const cust = new sqlite3.Database('customers.db');
ipcMain.handle('get-customers', async (event, filter) => {
    
    console.log('Received request to get customers with filter:', filter);
    return new Promise((resolve, reject) => {
      const query = filter ? `SELECT * FROM customers WHERE custname LIKE ?` : `SELECT * FROM customers`;
      const params = filter ? [`%${filter}%`] : [];
      db.all(query, params, (err, rows) => {
        if (err) {
          console.error('Database query error: ', err);
          reject(err);
        } else {
          console.log('Query result: ', rows);
          resolve(rows);
        }
      });
    });
  });



  ipcMain.handle('search-customer', (event, username) => {
    console.log('Searching customer with username:', username);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM customers WHERE custname = ?`;
      db.get(query, [username], (err, row) => {
        if (err) {
          console.error('Database search error: ', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });

  ipcMain.handle('delete-customer', (event, username) => {
    console.log('deleting customer with username:', username);
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM customers WHERE custname = ?`;
      db.get(query, [username], (err, row) => {
        if (err) {
          console.error('Database search error: ', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });
  
  ipcMain.handle('delete-item', (event, item) => {
    console.log('deleting customer with username:', item);
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM items WHERE description = ?`;
      db.get(query, [item], (err, row) => {
        if (err) {
          console.error('Database search error: ', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });
  
  ipcMain.handle("delete-invoice",(event,invoice)=>{
    return new Promise((resolve,reject)=>{
      const query = `DELETE FROM bills WHERE invoiceNumber = ?`;
      db.get(query, [invoice], (err, row) => {
        if (err) {
          console.error('Database search error: ', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });
  ipcMain.handle('update-customer', (event, user) => {
    console.log('Updating customer:', user);
    return new Promise((resolve, reject) => {
      const query = `UPDATE customers SET gstno = ?, address = ?, pincode = ?, phoneno =  ?,city = ? WHERE custname = ?`;
      db.run(query, [user.gstno,user.address,user.pincode,user.phoneno, user.city, user.name], function(err) {
        if (err) {
          console.error('Database update error: ', err);
          reject(err);
        } else {
          resolve({ changes: this.changes });
          // resolve('Database Update  Successfully');
        }
      });
    });

    
    // insertcustomer(user.name,user.address,user.city,user.pincode,user.phoneno,user.gstno)
    // resolve({ changes: this.changes });
    
  });
  
  ipcMain.handle('get-from-address', () => {
    // console.log('Updating customer:', user);
    console.log(CONFIG.branchAddress);
    return CONFIG.branchAddress;
  });
  ipcMain.handle('read-config', async () => {
    const configPath = path.join(__dirname, 'config.json');
    try {
        const data = fs.readFileSync(configPath, 'utf8');
        const config = JSON.parse(data);
        return config;
    } catch (err) {
        console.error('Error reading or parsing config.json:', err);
        throw err;
    }
});
  ipcMain.handle('add-customer', (event, user) => {
    console.log('Adding new customer:', user);
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO customers (custname ,address,city,pincode,phoneno, gstno) VALUES (?,?,?,?,?,?)`;
      // insertcustomer(user.name,user.address,user.city,user.pincode,user.phoneno,user.gstno,function(err){
      db.run(query, [user.name,user.address,user.city,user.pincode,user.phoneno,user.gstno], function(err) {
        if (err) {
          console.error('Database insert error: ', err);
          // alert("User Already present");
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  });

  ipcMain.handle('add-bill', (event, bill) => {
    console.log('Adding new bill:', bill);
    return new Promise((resolve, reject) => {
      custname=bill.customerName.toUpperCase();
      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var date= day + "/" + month + "/" + year;
      console.log(bill.grTotal);
      

      const query = `SELECT COUNT(*) AS count FROM bills WHERE invoiceNumber = ?`;

      db.get(query, [bill.invoiceNumber], (err, row) => {
        if (err) {
            console.error('Error checking invoice number:', err);
            reject(err);
            return;
        }

        if (row.count > 0) {
            // Invoice number exists, update the row
            const updateQuery = `UPDATE bills SET custname = ?, grtotal = ? InvoiceDate=?,buyer_order_number=? WHERE invoiceNumber = ?`;
            db.run(updateQuery, [bill.customerName, bill.grTotal,date,bill.buyerOrderNumber, bill.invoiceNumber], function(err) {
                if (err) {
                    console.error('Error updating bill:', err);

                } else {
                    console.log(`Bill with invoice number ${bill.invoiceNumber} updated successfully.`);
                    resolve(bill.invoiceNumber);
                }
            });
        } else {
            // Invoice number does not exist, insert a new row
            const insertQuery = `INSERT INTO bills (custname, grtotal,InvoiceDate,buyer_order_number) VALUES (?, ?, ?, ?)`;
            db.run(insertQuery, [bill.customerName, bill.grTotal,date,bill.buyerOrderNumber], function(err) {
                if (err) {
                    console.error('Error inserting new bill:', err);
                } else {
                    console.log(`New bill inserted successfully with invoice number ${this.lastID}.`);
                    resolve(this.lastID);
                }
            });
        }
    });
  })})


  ipcMain.handle('get-items', async (event, filter) => {
    console.log('Received request to get customers with filter:', filter);
    return new Promise((resolve, reject) => {
      const query = filter ? `SELECT * FROM items WHERE description LIKE ?` : `SELECT * FROM items`;
      const params = filter ? [`%${filter}%`] : [];
      db.all(query, params, (err, rows) => {
        if (err) {
          console.error('Database query error: ', err);
          reject(err);
        } else {
          console.log('Query result: ', rows);
          resolve(rows);
        }
      });
    });
  });

  ipcMain.handle('get-bills', async (event, filter) => {
    console.log('Received request to get bills with filter:', filter);
    return new Promise((resolve, reject) => {
      const query = filter ? `SELECT * FROM bills WHERE custname LIKE ?` : `SELECT * FROM bills`;
      const params = filter ? [`%${filter}%`] : [];
      db.all(query, params, (err, rows) => {
        if (err) {
          console.error('Database query error: ', err);
          reject(err);
        } else {
          console.log('Query result: ', rows);
          resolve(rows);
        }
      });
    });
  });



  ipcMain.handle('search-item', (event, description) => {
    console.log('Searching item with item name:', description);
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM items WHERE description = ?`;
      db.get(query, [description], (err, row) => {
        if (err) {
          console.error('Database search error: ', err);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  });
  
  ipcMain.handle('update-item', (event, item) => {
    console.log('Updating item:', item);
    return new Promise((resolve, reject) => {
      const queery= `UPDATE items SET unit = ?, rate = ? WHERE description = ?`;
      const query = `UPDATE items SET unit = ?, rate = ? WHERE description = ?`;
      console.log(item.itemUnit+ " "+ item.itemRate+" "+item.itemDescription);
      db.run(query, [item.itemUnit,item.itemRate,item.itemDescription], function(err) {
        if (err) {
          console.error('Database update error: ', err);
          reject(err);
        } else {
          console.log(this.changes);
          resolve({ changes: this.changes });
        }
      });
    });
   
  });

  ipcMain.handle('add-item', (event, item) => {
    console.log('Adding new item:', item);
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO items (description,unit,rate) VALUES (?,?,?)`;
      // insertcustomer(user.name,user.address,user.city,user.pincode,user.phoneno,user.gstno,function(err){
      console.log(item.itemDescription+" "+item.itemUnit+" "+item.itemRate);
      db.run(query, [item.itemDescription,item.itemUnit,item.itemRate], function(err) {
        if (err) {
          console.error('Database insert error: ', err);
          // alert("User Already present");
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  });


  ipcMain.handle('get-customer-names', async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT custname FROM customers', [], (err, rows) => {
            if (err) {
                reject(err);
            }
            const customerNames = rows.map(row => row.custname);
            resolve(customerNames);
        });
    });
});

ipcMain.handle('get-item-names', async () => {
  return new Promise((resolve, reject) => {
      db.all('SELECT description FROM items', [], (err, rows) => {
          if (err) {
              reject(err);
          }
          const itemNames = rows.map(row => row.description);
          resolve(itemNames);
      });
  });
});

ipcMain.handle('get-item-rate', async (event, itemName) => {
  return new Promise((resolve, reject) => {
      db.get('SELECT rate FROM items WHERE description = ?', [itemName], (err, row) => {
          if (err) {
              reject(err);
          } else {
              console.log(row);
              resolve(row ? row.rate : null);
          }
      });
  });
});

// const pdfConverter = create({
//   converterPath: create.electronPath
// });

// ipcMain.handle('generate-pdf', async (event, htmlContent) => {
//   return new Promise((resolve, reject) => {
//       pdf.create(htmlContent).toFile('bill.pdf', (err, res) => {
//           if (err) {
//               return reject(err);
//           }
//           resolve(res.filename);
//       });
//   });
// });

ipcMain.handle('generate-pdf', async (event, htmlContent) => {
  try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      const currentDate = new Date().toLocaleDateString();
      const currentDate1 = new Date();
      const dateTime = currentDate1.toISOString().replace(/[:\-T.]/g, '').slice(0, 14);
      const configPath = path.join(__dirname, 'config.json');
      const data = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(data);
      const baseDir = config.InvoiceFolder
      const monthFolder = `${currentDate1.getFullYear()}-${String(currentDate1.getMonth() + 1).padStart(2, '0')}`;
      const monthDir = path.join(baseDir, monthFolder);
      
       if (!fs.existsSync(monthDir)) {
        fs.mkdirSync(monthDir, { recursive: true });
    }
     
      const fileName = `bill_${dateTime}.pdf`;
      const fullpath=`${monthDir}/${fileName}`;
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
          path: fullpath,
          format: 'A4',
          printBackground: true,
            margin: {
                top: '20mm',
                right: '15mm',
                bottom: '20mm',
                left: '15mm'
            },
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="font-size:10px; text-align:center; width:100%; margin-top:10px;">
                    <span style="float:right;">Date: ${currentDate}</span>
                </div>`,
                footerTemplate: `
                <div style="font-size:10px; text-align:center; width:100%; margin-bottom:10px;">
                    <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
                </div>`
      });

      await browser.close();

      return fullpath;
  } catch (error) {
      throw new Error('Failed to generate PDF: ' + error.message);
  }
});
// ipcMain.handle('generate-word', async (event, htmlContent) => {
//   return new Promise((resolve, reject) => {
//       const docxContent = htmlDocx.asBlob(htmlContent);
//       fs.writeFile('bill.docx', docxContent, (err) => {
//           if (err) {
//               reject(err);
//           } else {
//               resolve('bill.docx');
//           }
//       });
//   });
// });

// ipcMain.handle('generate-html', async (event, htmlContent) => {
//   return new Promise((resolve, reject) => {
//       fs.writeFile('Billing Copy.html', htmlContent, (err) => {
//           if (err) {
//               reject(err);
//           } else {
//               resolve('Billing Copy.html');
//           }
//       });
//   });
// });