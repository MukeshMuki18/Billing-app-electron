// document.getElementById('signout').addEventListener('click',async(e)=>{
//     window.location="index.html";
//     })
    
    
    
    function renderItem(Items) {
      console.log("inside render Item function");
        const tableBody = document.getElementById('Items-table-body');
        tableBody.innerHTML = '';
        Items.forEach((item) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${item.item}</td>
            <td>${item.description}</td>
            <td>${item.unit}</td>
            <td>${item.rate}</td>
            
          `;
          tableBody.appendChild(row);
        });
      }
      
      function fetchAndRenderItems(filter) {
        console.log('Fetching Item with filter:', filter);
        window.api.getItems(filter).then((items) => {
          console.log('Received customers:', items);
          renderItem(items);
        }).catch((error) => {
          console.error('Error fetching customer data:', error);
        });
      }
      
      document.getElementById('filter-button').addEventListener('click', () => {
        const filterInput = document.getElementById('filter-input').value;
        fetchAndRenderItems(filterInput);
      });
      
      // Initial load without filter
      fetchAndRenderItems();
    