document.getElementById("delete-customer").addEventListener("click",async ()=>{
    const customerName=document.getElementById("search-input").value;
    
    await window.api.deleteCustomer(customerName).then(async result => {
        console.log('User deleted successfully:', result);
        document.getElementById('search-input').value="";
        await window.api.showDialog({
          type: 'info',
          message: 'Customer deleted successfully'
        });
        
        
      }).catch(async error => {
        console.error('Error updating user:', error);
        await window.api.showDialog({
          type: 'info',
          message: 'error in deleting the customer'
        })
        
      }).finally(()=>{
        // document.getElementById('delete-customer').disabled=true;
        document.getElementById('search-input').focus();
  
      });
    })


    document.getElementById("delete-item").addEventListener("click",async ()=>{
        const itemName=document.getElementById("item-input").value;
        await window.api.deleteItem(itemName).then(async result => {
            console.log('Item deleted successfully:', result);
            document.getElementById('item-input').value="";
            await window.api.showDialog({
              type: 'info',
              message: 'Item deleted successfully'
            });
            
            
          }).catch(async error => {
            console.error('Error updating user:', error);
            await window.api.showDialog({
              type: 'info',
              message: 'error in deleting the customer'
            })
            
          }).finally(()=>{
            // document.getElementById('delete-item').disabled=true;
            document.getElementById('item-input').focus();
      
          });
        })
    

        
    document.getElementById("delete-invoice").addEventListener("click",async ()=>{
        const invoiceNumber=document.getElementById("invoice-input").value;
        await window.api.deleteInvoice(invoiceNumber).then(async result => {
            console.log('Invoice deleted successfully:', result);
            document.getElementById('invoice-input').value="";
            await window.api.showDialog({
              type: 'info',
              message: 'Invoice deleted successfully'
            });
            
            
          }).catch(async error => {
            console.error('Error deleting invoice:', error);
            await window.api.showDialog({
              type: 'info',
              message: 'error in deleting the customer'
            })
            
          }).finally(()=>{
            // document.getElementById('delete-invoice').disabled=true;
            document.getElementById('item-invoice').focus();
      
          });
        })