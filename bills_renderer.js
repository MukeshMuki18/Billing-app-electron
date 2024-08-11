// document.getElementById('signout').addEventListener('click',async(e)=>{
//     window.location="index.html";
//     })
    
    
    
function renderBill(Bill) {
    console.log("inside render Item function");
      const tableBody = document.getElementById('Bills-table-body');
      tableBody.innerHTML = '';
      console.log(Bill.length);
      Bill.forEach((bill) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${bill.invoiceNumber}</td>
          <td>${bill.custname}</td>
          <td>${bill.buyer_order_number}
          <td>${bill.grtotal}</td>
          <td>${bill.InvoiceDate}</td>
          
        `;
        tableBody.appendChild(row);
      });
    }
    
    function fetchAndRenderBills(filter) {
      console.log('Fetching Bill with filter:', filter);
      window.api.getBills(filter).then((bills) => {
        console.log('Received Bills:', bills);
        renderBill(bills);
      }).catch((error) => {
        console.error('Error fetching bill data:', error);
      });
    }
    
    document.getElementById('filter-button').addEventListener('click', () => {
      const filterInput = document.getElementById('filter-input').value;
      fetchAndRenderBills(filterInput);
    });
    
    // Initial load without filter
    fetchAndRenderBills();
  