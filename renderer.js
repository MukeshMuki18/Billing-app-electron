let FromAddress;
let CGST,IGST,SGST,HSNCODE;
document.addEventListener('DOMContentLoaded', async () => {
  const customerSelect = document.getElementById('customer-name');
  const itemSelect = document.getElementById('item-name');
  const quantityInput = document.getElementById('quantity');
  const addButton = document.getElementById('add-button');
  const itemTable = document.getElementById('item-table-body');
  // const itemTable1= document.getElementById('item-table-body1');
  const totalCell = document.getElementById('total');
  const cgst=document.getElementById('cgst');
  const igst=document.getElementById('igst');
  const sgst=document.getElementById('sgst');
  const hsncode=document.getElementById("hsncode");




  let totalAmount = 0;
let slno=0;
  // Fetch and populate customer names
  try {
      const customerNames = await window.api.getCustomerNames();
      customerNames.forEach(name => {
          const option = document.createElement('option');
          option.value = name;
          option.textContent = name;
          customerSelect.appendChild(option);
      });
  } catch (error) {
      console.error('Error fetching customer names:', error);
  }
  
  window.api.readConfig().then(config => {
    FromAddress = config.branchAddress;
    CGST=config.cgst;
    IGST=config.igst;
    SGST=config.sgst; 
    HSNCODE=config.hsncode;
    console.log('From Address is:', FromAddress);
    console.log('From Address is:', HSNCODE);
    cgst.value=CGST;
console.log("Assigning value for cgst as "+CGST);
igst.value=IGST;
sgst.value=SGST;
hsncode.value=HSNCODE;
}).catch(err => {
    console.error('Failed to load config:', err);
});

window.api.getBills('').then((bills) => {
  console.log('Received Bills:', bills);
  console.log("last invoice number", bills[bills.length-1]);
document.getElementById('invoiceNumber').value=(bills[bills.length-1].invoiceNumber)+1;
}).catch(err => {
  console.error('Failed to load config:', err);
});

  try {
    const ItemNames = await window.api.getItemNames();
    ItemNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        itemSelect.appendChild(option);
    });
} catch (error) {
    console.error('Error fetching customer names:', error);
}

  addButton.addEventListener('click', async () => {
      const itemName = itemSelect.value;
      const quantity = parseInt(quantityInput.value, 10);

      if (!itemName || isNaN(quantity) || quantity <= 0) {
          // alert('Please select an item and enter a valid quantity');
          await window.api.showDialog({
            type: 'info',
            message: 'Please select an item and enter a valid quantity'
          });
          return;
      }

      try {
          const itemRate = await window.api.getItemRate(itemName);
          if (itemRate === null) {
              alert('Item not found');
              return;
          }

          let amount = (itemRate * quantity);
          amount=Math.round( amount * 1e2 ) / 1e2;
          // amount=amount.toFixed(2);
          totalAmount += amount;
                    

          // Add the new row to the table
          slno+=1;
          const row = document.createElement('tr');
          const row1=document.createElement('tr');
          row.innerHTML = `
              <td><button class="delete-row">Delete</button></td>
              <td>${slno}</td>
              <td>${itemName}</td>
              <td>${hsncode.value}</td>
              <td>${quantity}</td>
              <td>${itemRate}</td>
              <td>${amount}</td>
          `;
          itemTable.appendChild(row);
        

          row.querySelector('.delete-row').addEventListener('click', () => {
            row.remove();  // Remove the row from the table
            row1.remove;
            slno-=1;
            updateTotal(); // Recalculate the total after removing the row
            
            updateSerialNumber();
        });
updateSerialNumber();        
function updateSerialNumber(){
  const tableBody = document.getElementById('item-table-body');
  slno=1;
  tableBody.querySelectorAll('tr').forEach(row => {
    row.children[1].textContent=slno;
   row.children[1].value=slno;
   slno=slno+1;
});

}

        updateTotal();
        function updateTotal() {
          const tableBody = document.getElementById('item-table-body');
          let totalAmount = 0;
          // Loop through all rows to calculate the total
          tableBody.querySelectorAll('tr').forEach(row => {
              const quantity = parseInt(row.children[4].textContent);
              console.log(quantity);
              const price = parseFloat(row.children[5].textContent);
              totalAmount += quantity * price;
              console.log(totalAmount);
          });
          
          // Update the total in the UI
          let sgstamount=((totalAmount.toFixed(2)*sgst.value)/100).toFixed(2);
          let cgstamount=((totalAmount.toFixed(2)*cgst.value)/100).toFixed(2);
          let igstamount=((totalAmount.toFixed(2)*igst.value)/100).toFixed(2);
          let grTotal=(parseFloat(totalAmount.toFixed(2))+parseFloat(sgstamount)+parseFloat(cgstamount)+parseFloat(igstamount)).toFixed(2);
          document.getElementById("total").textContent=totalAmount.toFixed(2);
          document.getElementById("sgstCell").textContent=sgstamount;
          document.getElementById("cgstCell").textContent=cgstamount;
          document.getElementById("igstCell").textContent=igstamount;
          document.getElementById("grtotal").textContent=grTotal;
          // Reset the input fields
          itemSelect.value = '';
          quantityInput.value = '';
          // omitFirstColumn();
      }
      
          // Update the total amount
          // totalCell.textContent = totalAmount.toFixed(2);
          // let sgstamount=((totalAmount.toFixed(2)*sgst.value)/100).toFixed(2);
          // let cgstamount=((totalAmount.toFixed(2)*cgst.value)/100).toFixed(2);
          // let igstamount=((totalAmount.toFixed(2)*igst.value)/100).toFixed(2);
          // let grTotal=(parseFloat(totalAmount.toFixed(2))+parseFloat(sgstamount)+parseFloat(cgstamount)+parseFloat(igstamount)).toFixed(2);
          // document.getElementById("sgstCell").textContent=sgstamount;
          // document.getElementById("cgstCell").textContent=cgstamount;
          // document.getElementById("igstCell").textContent=igst.value;
          // document.getElementById("grtotal").textContent=grTotal;
          // // Reset the input fields
          // itemSelect.value = '';
          // quantityInput.value = '';
      } catch (error) {
          console.error('Error fetching item rate:', error);
      }
  });

  function omitFirstColumn() {
      const originalTable = document.getElementById('item-table');
      const newTableBody = document.getElementById('item-table1').getElementsByTagName('tbody')[0];
      const newTableFooter= document.getElementById('item-table1').getElementsByTagName('tfoot')[0];

      const rows = originalTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
      const row1=originalTable.getElementsByTagName('tfoot')[0].getElementsByTagName('tr');
      for (let row of rows) {
          const newRow = document.createElement('tr');
  
          for (let i = 1; i < row.children.length; i++) { // Start from 1 to skip the first column
              const cell = row.children[i].cloneNode(true);
              newRow.appendChild(cell);
          }
  
          newTableBody.appendChild(newRow);
      }
      for (let row of row1) {
        const newRow = document.createElement('tr');

        for (let i = 1; i < row.children.length; i++) { // Start from 1 to skip the first column
            const cell = row.children[i].cloneNode(true);
            newRow.appendChild(cell);
        }

        newTableFooter.appendChild(newRow);
    }
      }

  const generateButton = document.getElementById('generate-button');

  generateButton.addEventListener('click', async () => {
    omitFirstColumn();
    const billHtml = generateBillHtml(); // Generate your bill HTML content here
    const bill={
    invoiceNumber:document.getElementById("invoiceNumber").value,
    grTotal:document.getElementById("grtotal").textContent,
    customerName:document.getElementById("search-input").value,
    buyerOrderNumber:document.getElementById("buyerOrderNumber").value
    }
    console.log("value of grand total"+bill.grTotal);
    window.api.addBill(bill).then(async result => {
      console.log('New bill added successfully:', result);
      await window.api.showDialog({
        type: 'info',
        message:'New bill added successfully'
      })
      // alert("New userr added successfully");
      document.getElementById('search-input').focus(); 
    }).catch(async error => {
      console.error('Error adding new user:', error);
      await window.api.showDialog({
        type: 'info',
        message: 'May be the bill is already present'
      })
    })


    try {
        const pdfPath = await window.api.generatePDF(billHtml);
        await window.api.showDialog({
          type:'info',
          message:`PDF saved at ${pdfPath}`
        })
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
});
document.getElementById('signout').addEventListener('click',async(e)=>{
window.location="index.html";
})


function generateBillHtml() {
  const itemTable = document.getElementById('item-table');
  const customerName = document.getElementById('search-input').value;
  let name="",gst="",address="",city="",pincode="",phoneno="";
  var currentDate = new Date()
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  var date= day + "/" + month + "/" + year;

  if(document.getElementById('user-name').value){
    name=document.getElementById('user-name').value;
    gst=document.getElementById('user-gst').value;
    address=document.getElementById('user-address').value;
    city=document.getElementById('user-city').value;
    pincode=document.getElementById('user-pincode').value;
    phoneno=document.getElementById('user-phoneno').value;
  }
  else{
    name=document.getElementById('new-user-name').value;
    gst=document.getElementById('new-user-gst').value;
    address=document.getElementById('new-user-address').value;
    city=document.getElementById('new-user-city').value;
    pincode=document.getElementById('new-user-pincode').value;
    phoneno=document.getElementById('new-user-phono').value;
  }
//   return `
//       <html>
//           <head>
//               <style>
              
// .total{

// border-collapse: collapse;
// width: auto;
//     margin-right: 0px;
//     margin-left: 700px;
// }
//  table {
//               width: 100%;
//               border-collapse: collapse;
//             }
//             th, td {
//               padding: 8px;
//               text-align: left;
//               border-bottom: 1px solid #ddd;
//             }
// .grid-container {
//   display: grid;
//   grid-template-columns: 2fr 1fr 1fr ;
//   grid-template-rows: 100px 100px 100px 100px 100px 100px;
//   background-color: #2196F3;
//   padding: 10px;
// }
// .grid-item {
//   background-color: rgba(255, 255, 255, 0.8);
//   border: 1px solid rgba(0, 0, 0, 0.8);
//   padding: 20px;
//   font-size: 12px;
//   text-align: center;
// }
// .from-address{
// font-size:12px;
// grid-row: span 1;
// }
// .nine{
// grid-column: span 2;
// }

// .invoice-details{
// display: grid;
// grid-template-columns: auto auto;
// grid-template-rows: 40px 40px 40px;
// grid-column: span 2;
// grid-row: span 2;
// font-size:10px;
// }
// .child-grid{
 
// margin:1px;
// padding:5px;
//  background-color: rgba(255, 255, 255, 0.8);
//   border: 1px rgba(0, 0, 0, 0.8);
//   text-align: left;
// }
  
//   .partysgst{
//   grid-column: span 2;
//   }
  
//   .to-address{
//   font-size:12px;
//   }
//   .billing-section{
//   grid-column:span 3;
//   grid-row: span 3;
  
//   }
  
//   .bottom{
//   display: grid;
// grid-template-columns: auto auto auto;
// grid-template-rows: 40px ;
// grid-column: span 3;
// grid-row: span 3;
// font-size:10px;
  
//   }
  
//   .bottom-child{
//   text-align: left;
//   font-size: 12px;


// }
//                   table {
//                       width: 100%;
//                       border-collapse: collapse;
//                   }
//                   table, th, td {
//                       border: 1px solid black;
//                   }
//                   th, td {
//                       padding: 10px;
//                       text-align: left;
//                   }
//               </style>
//           </head>
//           <body>
//           <div class="grid-container">
//   <div class="grid-item from-address">KG Press company<br>104.-b.s.v. thottam, sanganoor road,<br>Ganapathy, Coimbatore- 641001<br>GST:1829448344</div>
//   <div class="grid-item invoice-details">
//   <div class="child-grid">Invoice No</div>
//   <div class="child-grid">Dated</div>
//   <div class="child-grid">Delivery Note</div>
//   <div class="child-grid">Dated</div>
//   <div class="child-grid">Buyer Order No</div>
//   <div class="child-grid">Dated: <br><label>${date}<br></label></div>
//   <div class="child-grid partysgst">Party's GST NO: <label>${gst}</label></div>
// </div>
//   <div class="grid-item to-address">To M/S : <br>${address} ,<br>${city} ,<br>${pincode},<br>${phoneno}</div>  
//   <div class="grid-item billing-section">

//               ${itemTable.outerHTML}
//               </div>
//   <div class="grid-item bottom">
  
//   <div class="bottom-child">
//   Terms and Condition:<br>
//   Our responsibility ceases the moment the goods leave our premises.<br>Goods once soold will not be taken back.
//   <br>
//   All disputes are subject to Coimbatoore Jurisdiction only.
  
//   </div>
//   <div class="bottom-child">
//   Received the goods in good condition<br><br><br>
//   Receiver's Signature
//   </div>
//   <div class="bottom-child">
//   <b>For K.G. PRESS COMP'S<b><br><br><br>
//   Authorised Signature
  
//   </div>
  
//   </div>
  
// </div>

//           </body>
//       </html>
//   `;
return `<!DOCTYPE html>
<html>
<head>
<style>

.total{

border-collapse: collapse;
width: auto;
    margin-right: 0px;
    margin-left: 700px;
}
 table {
              table-layout: fixed; 
              width: 100%;
              border-collapse: collapse;
              font-size:10px;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
  .header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr ;
  grid-template-rows: 100px 100px ;
  padding: 10px;
  font-size:10px;
}
  .footer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ;
  grid-template-rows: 100px 100px 100px;
  padding: 15px;
  font-size:10px;
}
.grid-container {
  display: table;
  font-size:10px;
  min-height:0;
  min-width:0;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 10px;
  font-size: 10px;
  text-align: center;
}
.from-address{
font-size:10px;
grid-row: span 1;
}
.invoice-details{
display: grid;
grid-template-columns: auto auto;
grid-template-rows: 40px 40px 40px;
grid-column: span 2;
grid-row: span 2;
font-size:10px;
}
.child-grid{
margin:1px;
padding:10px;
  text-align: left;
}
  
  .partysgst{
  grid-column: span 2;
  }
  
  .to-address{
  font-size:10px;
  }
  .billing-section{
  grid-column:span 3;
  grid-row: span 3;
  
  }
  
  .bottom{
  display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: 50px;
grid-column: span 3;
grid-row: span 2;
font-size:10px;
 text-align:left; 
    margin:10px;
    padding:20px;
  }
  
  h2{
    text-align:center;
  }
  
</style>
</head>
<body>

  <h2>Tax Invoice</h2>
<div class="header">
  <div class="grid-item from-address">From :<br>${FromAddress.toUpperCase()}</div>
  <div class="grid-item invoice-details">
  <div class="child-grid">Invoice No<br><label>${document.getElementById("invoiceNumber").value}<br></label></div>
  <div class="child-grid">Dated<br><label>${date}<br></label></div>
  <div class="child-grid">Delivery Note</div>
  <div class="child-grid">Dated<br><label>${date}<br></label></div>
  <div class="child-grid">Buyer Order No<br><label>${document.getElementById("buyerOrderNumber").value}<br></label></div>
  <div class="child-grid">Dated: <br><label>${date}<br></label></div>
  <div class="child-grid partysgst">Party's GST NO: <label>${document.getElementById('user-gst').value}</label></div>
</div>
  <div class="grid-item to-address">To M/S :<br> ${document.getElementById('user-address').value},${document.getElementById('user-city').value} , ${document.getElementById('user-pincode').value}, ${document.getElementById("user-phoneno").value}</div>  
  </div>
  <div class="grid-container">
  
  <div class="grid-item billing-section">
   ${document.getElementById('item-table1').outerHTML}
    </div>
  </div>
  <div class="grid-item bottom">
  
  <div class="bottom-child">
  Terms and Condition:<br>
  Our responsibility ceases the moment the goods leave our premises.Goods once soold will not be taken back.

  All disputes are subject to Coimbatoore Jurisdiction only.
  
  </div>
  <div class="bottom-child">
  Received the goods in good condition<br><br><br>
  Receiver's Signature
  </div>
  <div class="bottom-child">
  <b>For K.G. PRESS COMP'S<b><br><br><br>
  Authorised Signature
  
  </div>
  
  </div>
  

</body>
</html>



`
}

});  
