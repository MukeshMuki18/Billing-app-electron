const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
    db.run("INSERT INTO users (username, password) VALUES (?, ?)", ['admin', 'admin']);
});

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

module.exports = db1;
