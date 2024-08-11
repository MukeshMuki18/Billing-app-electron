function renderCustomers(customers) {
  console.log("inside render customer function");
    const tableBody = document.getElementById('customer-table-body');
    tableBody.innerHTML = '';
    customers.forEach((customer) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${customer.custname}</td>
        <td>${customer.gstno}</td>
        <td>${customer.address}</td>
        <td>${customer.city}</td>
        <td>${customer.phoneno}</td>
        <td>${customer.pincode}</td>
        
      `;
      tableBody.appendChild(row);
    });
  }
  
  function fetchAndRenderCustomers(filter) {
    console.log('Fetching customers with filter:', filter);
    window.api.getCustomers(filter).then((customers) => {
      console.log('Received customers:', customers);
      renderCustomers(customers);
    }).catch((error) => {
      console.error('Error fetching customer data:', error);
    });
  }
  
  document.getElementById('filter-button').addEventListener('click', () => {
    const filterInput = document.getElementById('filter-input').value;
    fetchAndRenderCustomers(filterInput);
  });
  
  // Initial load without filter
  fetchAndRenderCustomers();
