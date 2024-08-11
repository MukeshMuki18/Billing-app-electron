const saveButton = document.getElementById('save-button');
const addButton = document.getElementById('add-item-button');
const itemInput = document.getElementById('item-name');
const itemDescription = document.getElementById('item-description');
const itemUnit = document.getElementById('item-unit');
const ItemRate = document.getElementById('item-rate');

const newUserInput = document.getElementById('new-item-name');
const newitemDescription = document.getElementById('new-item-description');
const newitemUnit = document.getElementById('new-item-unit');
const newItemRate = document.getElementById('new-item-rate');


// Function to show validation messages
function showValidationMessage(input, message) {
  const messageElement = document.createElement('div');
  messageElement.className = 'validation-message';
  messageElement.innerText = message;
  input.parentNode.appendChild(messageElement);
}

// Function to remove validation messages
function removeValidationMessage(input) {
  const messageElement = input.parentNode.querySelector('.validation-message');
  if (messageElement) {
    messageElement.remove();
  }
}

// Function to validate input fields
function validateInputs() {
  // Validate existing user inputs
  if (!document.getElementById('item-form').classList.contains('hidden')) {
    // removeValidationMessage(itemInput);
    removeValidationMessage(itemDescription);
    removeValidationMessage(itemUnit);
    removeValidationMessage(ItemRate);
    console.log("inside updating item");
    
    // if (itemInput.value.trim() === '') {
    //   showValidationMessage(itemInput, 'Name cannot be empty');
    // }
    if (itemDescription.value.trim() === '') {
      showValidationMessage(itemDescription, 'Item Description cannot be empty');
    }else if(itemDescription.value.length < 5) {
      showValidationMessage(itemDescription, 'Item Description should more than 5 Characters');
    }

    if(itemUnit.value.trim()==''){
      showValidationMessage(itemUnit, 'itemUnit cannot be empty');
    }
    if(ItemRate.value.trim()==''){
      showValidationMessage(ItemRate, 'ItemRate cannot be empty');
    }

    saveButton.disabled = itemDescription.value.length < 5 || itemDescription.value.trim() === ''|| itemUnit.value.trim===''||ItemRate.value.trim==='';
  }
}
function validateInputs1(){
  // Validate new user inputs
  console.log("at line 57");
  console.log(newUserInput+" "+newitemDescription);
  // if (newUserInput && newitemDescription && newitemUnit && newItemRate) {
  if(!document.getElementById('add-item-form').classList.contains('hidden')){
    // removeValidationMessage(newUserInput);
    removeValidationMessage(newitemDescription);
    removeValidationMessage(newitemUnit);
    removeValidationMessage(newItemRate);
    console.log("inside new user validation");
    // if (newUserInput.value.trim() === '') {
    //   showValidationMessage(newUserInput, 'Name cannot be empty');
    // }
    
    if (newitemDescription.value.trim() === '') {
      showValidationMessage(newitemDescription, 'Item Description cannot be empty');
    }else if(newitemDescription.value.length < 5) {
      showValidationMessage(newitemDescription, 'Item Description should more than 5 Characters');
    }

    if (newitemUnit.value.trim() === '') {
      showValidationMessage(newitemUnit, 'itemUnit cannot be empty');
    }
    if (newItemRate.value.trim() === '') {
      showValidationMessage(newItemRate, 'ItemRate cannot be empty');
    }
    console.log("new user Item Description input value"+newitemDescription.value.trim())
    addButton.disabled =  newitemDescription.value.length < 5|| newitemDescription.value.trim() === ''|| newitemUnit.value.trim() === '' || newItemRate.value.trim()==='';
  }
}

// Event listener to validate inputs on input
if (itemDescription && ItemRate && itemUnit) {
  console.log("at line 83");
  // itemInput.addEventListener('input', validateInputs);
  itemDescription.addEventListener('input', validateInputs);
  ItemRate.addEventListener('input', validateInputs);
  itemUnit.addEventListener('input', validateInputs);
}
if (newitemDescription && newitemUnit && newItemRate) {
  console.log("at line 90");
  // newUserInput.addEventListener('input', validateInputs1);
  newitemDescription.addEventListener('input', validateInputs1);
  newitemUnit.addEventListener('input', validateInputs1);
  newItemRate.addEventListener('input', validateInputs1);
}

// Initial validation call
validateInputs();
validateInputs1();










document.getElementById('search-button').addEventListener('click', () => {
    let username = document.getElementById('search-input').value;
    username=username.toUpperCase();
    console.log(username);
    window.api.searchItems(username).then(user => {
      console.log(user + "    "+typeof(user));
      if (user !== undefined) {
        console.log("Inside updat user");
        document.getElementById('item-form').classList.remove('hidden');
        document.getElementById('add-item-form').classList.add('hidden');
        // document.getElementById('item-name').value = username;
        document.getElementById('item-description').value = username;
        document.getElementById('item-unit').value = user.unit;
        document.getElementById('item-rate').value = user.rate;
        validateInputs();

      } else {
        console.log("Inside new item");
        document.getElementById('item-form').classList.add('hidden');
        document.getElementById('add-item-form').classList.remove('hidden');
        document.getElementById('new-item-description').value = username;
        validateInputs1();
      }
    }).catch(error => {
      console.error('Error searching user:', error);
    });
  });


  
  document.getElementById('save-button').addEventListener('click', async () => {
    
    const item = {
      // name: document.getElementById('item-name').value.toUpperCase(),
      itemDescription: document.getElementById('item-description').value.toUpperCase(),
      itemRate: document.getElementById('item-rate').value.toUpperCase(),
      itemUnit: document.getElementById('item-unit').value.toUpperCase()
    };
    document.getElementById('save-button').disabled=true;
    
    await window.api.updateItems(item).then(async result => {
      console.log('User updated successfully:', result);
      // document.getElementById('item-name').value="",
      document.getElementById('item-description').value="",
      document.getElementById('item-rate').value="",
      document.getElementById('item-unit').value=""
      // alert('User updated successfully');
      // window.api.messageMain("send-alert","User updated successfully")
      // // dialog.showErrorBox('title here','type error message here');
      // console.log("Above line executed");
      await window.api.showDialog({
        type: 'info',
        message: 'Item updated successfully'
      });

    }).catch(async error => {
      console.error('Error updating user:', error);
      await window.api.showDialog({
        type: 'info',
        message: 'error in updating the user'
      })
      
    }).finally(()=>{
      document.getElementById('save-button').disabled=false;
      document.getElementById('search-input').focus();

    });
  });
  


  document.getElementById('add-item-button').addEventListener('click', () => {
    validateInputs();
    const item = {
      // name: document.getElementById('new-item-name').value.toUpperCase(),
      itemDescription: document.getElementById('new-item-description').value.toUpperCase(),
      itemRate: document.getElementById('new-item-rate').value.toUpperCase(),
      itemUnit: document.getElementById('new-item-unit').value.toUpperCase()
    };
    document.getElementById('add-item-button').disabled=true;
    window.api.addItem(item).then(async result => {
      console.log('New user added successfully:', result);
      // document.getElementById('new-item-name').value="";
      document.getElementById('new-item-description').value="";
      document.getElementById('new-item-rate').value="",
      document.getElementById('new-item-unit').value=""
      await window.api.showDialog({
        type: 'info',
        message:'New Item added successfully'
      })
      // alert("New userr added successfully");
      document.getElementById('search-input').focus(); 
    }).catch(async error => {
      console.error('Error adding new user:', error);
      await window.api.showDialog({
        type: 'info',
        message: 'May be the Item is already present'
      })
    }).finally(()=>{
      document.getElementById('add-item-button').disabled=false;
      document.getElementById('search-input').focus();

    });
  });
