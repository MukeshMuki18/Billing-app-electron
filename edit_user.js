const saveButton = document.getElementById('save-button');
const addButton = document.getElementById('add-user-button');
const userNameInput = document.getElementById('user-name');
const gstNo = document.getElementById('user-gst');
const address = document.getElementById('user-address');
const pincode = document.getElementById('user-pincode');

const newUserInput = document.getElementById('new-user-name');
const newgstNo = document.getElementById('new-user-gst');
const newAddress = document.getElementById('new-user-address');
const newPincode = document.getElementById('new-user-pincode');

const hsncode= document.getElementById("hsncode");
const cgst= document.getElementById("cgst");
const igst= document.getElementById("igst");
const sgst= document.getElementById("sgst");
const invoiceNumber= document.getElementById("invoiceNumber");
const buyerOrderNumber= document.getElementById("buyerOrderNumber");
const generateButton=document.getElementById("generate-button");

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
  if (!document.getElementById('user-form').classList.contains('hidden')) {
    removeValidationMessage(userNameInput);
    removeValidationMessage(gstNo);
    removeValidationMessage(address);
    removeValidationMessage(pincode);

    removeValidationMessage(cgst);
    removeValidationMessage(igst);
    removeValidationMessage(sgst);
    removeValidationMessage(hsncode);
    removeValidationMessage(invoiceNumber);
    removeValidationMessage(buyerOrderNumber);
    console.log("inside updating user");
    
    if (userNameInput.value.trim() === '') {
      showValidationMessage(userNameInput, 'Name cannot be empty');
    }
    if (gstNo.value.trim() === '') {
      showValidationMessage(gstNo, 'GST cannot be empty');
    }else if(gstNo.value.length < 10) {
      showValidationMessage(gstNo, 'GST should more than 10 Characters');
    }

    if(address.value.trim()==''){
      showValidationMessage(address, 'Address cannot be empty');
    }else if(address.value.length <10){
      showValidationMessage(address, 'Address should more than 10 Characters');
    }
    if(pincode.value.trim()==''){
      showValidationMessage(pincode, 'Pincode cannot be empty');
    }else if(pincode.value.length<6){
      showValidationMessage(pincode, 'Pincode should minimum 6 digits');
    }


    if (cgst.value.trim() === '') {
      showValidationMessage(cgst, 'CGST cannot be empty');
    }
    if (hsncode.value.trim() === '') {
      showValidationMessage(hsncode, 'HSNCODE cannot be empty');
    }
    if (buyerOrderNumber.value.trim() === '') {
      showValidationMessage(buyerOrderNumber, 'buyer Order number cannot be empty');
    }
    
    if (igst.value.trim() === '') {
      showValidationMessage(igst, 'IGST cannot be empty');
    }

    if (sgst.value.trim() === '') {
      showValidationMessage(sgst, 'SGST cannot be empty');
    }
    if (invoiceNumber.value.trim() === '') {
      showValidationMessage(invoiceNumber, 'InvoiceNumber cannot be empty');
    }
generateButton.disabled =  buyerOrderNumber.value.trim() === '' ||hsncode.value.trim() === '' ||cgst.value.trim() === '' || igst.value.trim() === ''|| sgst.value.trim() === '' || invoiceNumber.value.trim()==='';
    saveButton.disabled = pincode.value.length<6||address.value.length <10||gstNo.value.length < 10 || userNameInput.value.trim() === '' || gstNo.value.trim() === ''|| address.value.trim===''||pincode.value.trim==='';
  }
}
function validateInputs1(){
  // Validate new user inputs
  console.log("at line 57");
  console.log(newUserInput+" "+newgstNo);
  // if (newUserInput && newgstNo && newAddress && newPincode) {
  if(!document.getElementById('add-user-form').classList.contains('hidden')){
    removeValidationMessage(newUserInput);
    removeValidationMessage(newgstNo);
    removeValidationMessage(newAddress);
    removeValidationMessage(newPincode);
    console.log("inside new user validation");
    if (newUserInput.value.trim() === '') {
      showValidationMessage(newUserInput, 'Name cannot be empty');
    }
    
    if (newgstNo.value.trim() === '') {
      showValidationMessage(newgstNo, 'GST cannot be empty');
    }else if(newgstNo.value.length < 10) {
      showValidationMessage(newgstNo, 'GST should more than 10 Characters');
    }

    if (newAddress.value.trim() === '') {
      showValidationMessage(newAddress, 'Address cannot be empty');
    }else if(newAddress.value.length <10){
      showValidationMessage(newAddress, 'Address should more than 10 Characters');
    }
    if (newPincode.value.trim() === '') {
      showValidationMessage(newPincode, 'Pincode cannot be empty');
    }else if(newPincode.value.length<6){
      showValidationMessage(newPincode, 'Pincode should minimum 6 digits');
    }
    console.log("new user gst input value"+newgstNo.value.trim())
    addButton.disabled =  newPincode.value.length<6||newAddress.value.length <10||newgstNo.value.length < 10 || newUserInput.value.trim() === '' || newgstNo.value.trim() === ''|| newAddress.value.trim() === '' || newPincode.value.trim()==='';
  }
}

// Event listener to validate inputs on input
if (userNameInput && gstNo && pincode && address) {
  console.log("at line 83");
  userNameInput.addEventListener('input', validateInputs);
  gstNo.addEventListener('input', validateInputs);
  pincode.addEventListener('input', validateInputs);
  address.addEventListener('input', validateInputs);


  hsncode.addEventListener('input',validateInputs);
    igst.addEventListener('input',validateInputs);
    cgst.addEventListener('input',validateInputs);
    sgst.addEventListener('input',validateInputs);
    buyerOrderNumber.addEventListener('input',validateInputs);
    invoiceNumber.addEventListener('input',validateInputs);
    console.log(hsncode+igst+cgst+buyerOrderNumber);
}
if (newUserInput && newgstNo && newAddress && newPincode) {
  console.log("at line 90");
  newUserInput.addEventListener('input', validateInputs1);
  newgstNo.addEventListener('input', validateInputs1);
  newAddress.addEventListener('input', validateInputs1);
  newPincode.addEventListener('input', validateInputs1);
}

// Initial validation call
validateInputs();
validateInputs1();










document.getElementById('search-button').addEventListener('click', () => {
    let username = document.getElementById('search-input').value;
    username=username.toUpperCase();
    console.log(username);
    window.api.searchCustomer(username).then(user => {
      console.log(user + "    "+typeof(user));
      if (user !== undefined) {
        console.log("Inside updat user");
        document.getElementById('user-form').classList.remove('hidden');
        document.getElementById('add-user-form').classList.add('hidden');
        document.getElementById('user-name').value = username;
        document.getElementById('user-gst').value = user.gstno;
        document.getElementById('user-address').value = user.address;
        document.getElementById('user-city').value = user.city;
        document.getElementById('user-pincode').value = user.pincode;
        document.getElementById('user-phoneno').value = user.phoneno;
        validateInputs();

      } else {
        console.log("Inside new user");
        document.getElementById('user-form').classList.add('hidden');
        document.getElementById('add-user-form').classList.remove('hidden');
        document.getElementById('new-user-name').value = username;
        validateInputs1();
      }
    }).catch(error => {
      console.error('Error searching user:', error);
    });
  });


  
  document.getElementById('save-button').addEventListener('click', async () => {
    
    const user = {
      name: document.getElementById('user-name').value.toUpperCase(),
      gstno: document.getElementById('user-gst').value.toUpperCase(),
      phoneno: document.getElementById('user-phoneno').value.toUpperCase(),
      city: document.getElementById('user-city').value.toUpperCase(),
      pincode: document.getElementById('user-pincode').value.toUpperCase(),
      address: document.getElementById('user-address').value.toUpperCase()
    };
    document.getElementById('save-button').disabled=true;
    
    await window.api.updateCustomer(user).then(async result => {
      console.log('User updated successfully:', result);
      document.getElementById('user-name').value="",
      document.getElementById('user-gst').value="",
      document.getElementById('user-phoneno').value="",
      document.getElementById('user-city').value="",
      document.getElementById('user-pincode').value="",
      document.getElementById('user-address').value=""
      // alert('User updated successfully');
      // window.api.messageMain("send-alert","User updated successfully")
      // // dialog.showErrorBox('title here','type error message here');
      // console.log("Above line executed");
      await window.api.showDialog({
        type: 'info',
        message: 'User updated successfully'
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
  


  document.getElementById('add-user-button').addEventListener('click', () => {
    validateInputs();
    const user = {
      name: document.getElementById('new-user-name').value.toUpperCase(),
      gstno: document.getElementById('new-user-gst').value.toUpperCase(),
      phoneno: document.getElementById('new-user-phoneno').value.toUpperCase(),
      city: document.getElementById('new-user-city').value.toUpperCase(),
      pincode: document.getElementById('new-user-pincode').value.toUpperCase(),
      address: document.getElementById('new-user-address').value.toUpperCase()
    };
    document.getElementById('add-user-button').disabled=true;
    window.api.addCustomer(user).then(async result => {
      console.log('New user added successfully:', result);
      document.getElementById('new-user-name').value="";
      document.getElementById('new-user-gst').value="";
      document.getElementById('new-user-phoneno').value="",
      document.getElementById('new-user-city').value="",
      document.getElementById('new-user-pincode').value="",
      document.getElementById('new-user-address').value=""
      await window.api.showDialog({
        type: 'info',
        message:'New User added successfully'
      })
      // alert("New userr added successfully");
      document.getElementById('search-input').focus(); 
    }).catch(async error => {
      console.error('Error adding new user:', error);
      await window.api.showDialog({
        type: 'info',
        message: 'May be the user is already present'
      })
    }).finally(()=>{
      document.getElementById('add-user-button').disabled=false;
      document.getElementById('search-input').focus();

    });
  });




  // function autocomplete(inp, arr) {
  //   var currentFocus;
  //   inp.addEventListener("input", function(e) {
  //       var a, b, i, val = this.value;
  //       closeAllLists();
  //       if (!val) { return false;}
  //       currentFocus = -1;
  //       a = document.createElement("DIV");
  //       a.setAttribute("id", this.id + "autocomplete-list");
  //       a.setAttribute("class", "autocomplete-items");
  //       this.parentNode.appendChild(a);
  //       for (i = 0; i < arr.length; i++) {
  //             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
  //           b = document.createElement("DIV");
  //           b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
  //           b.innerHTML += arr[i].substr(val.length);
  //           b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
  //           b.addEventListener("click", function(e) {
  //               inp.value = this.getElementsByTagName("input")[0].value;
  //               closeAllLists();
  //           });
  //           a.appendChild(b);
  //         }
  //       }
  //   });
  
  //   inp.addEventListener("keydown", function(e) {
  //       var x = document.getElementById(this.id + "autocomplete-list");
  //       if (x) x = x.getElementsByTagName("div");
  //       if (e.keyCode == 40) {
  //         currentFocus++;
  //         addActive(x);
  //       } else if (e.keyCode == 38) { 
  //         addActive(x);
  //       } else if (e.keyCode == 13) {
  //         e.preventDefault();
  //         if (currentFocus > -1) {
  //           if (x) x[currentFocus].click();
  //         }
  //       }
  //   });
  //   function addActive(x) {
  //     if (!x) return false;
  //     removeActive(x);
  //     if (currentFocus >= x.length) currentFocus = 0;
  //     if (currentFocus < 0) currentFocus = (x.length - 1);
  //     x[currentFocus].classList.add("autocomplete-active");
  //   }
  //   function removeActive(x) {
  //     for (var i = 0; i < x.length; i++) {
  //       x[i].classList.remove("autocomplete-active");
  //     }
  //   }
  //   function closeAllLists(elmnt) {
  //     var x = document.getElementsByClassName("autocomplete-items");
  //     for (var i = 0; i < x.length; i++) {
  //       if (elmnt != x[i] && elmnt != inp) {
  //         x[i].parentNode.removeChild(x[i]);
  //       }
  //     }
  //   }
  //   document.addEventListener("click", function (e) {
  //       closeAllLists(e.target);
  //   });
  // }
  
  // // var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  // async function customer(){
  //     console.log("inside autocomplete trigger");
  //     var customers=await window.api.getCustomerNames();
  //     autocomplete(document.getElementById("search-input"), customers);
  // }
  // customer();