// const saveButton = document.getElementById('save-button');
// const addButton = document.getElementById('add-user-button');
// const userNameInput = document.getElementById('user-name');
// const gstNo = document.getElementById('user-gst');
// const address = document.getElementById('user-address');
// const pincode = document.getElementById('user-pincode');
const hsncode= document.getElementById("hsncode");
const cgst= document.getElementById("cgst");
const igst= document.getElementById("igst");
const sgst= document.getElementById("sgst");
const invoiceNumber= document.getElementById("invoiceNumber");
const buyerOrderNumber= document.getElementById("buyerOrderNumber");
const generateButton=document.getElementById("generate-button");

// const newUserInput = document.getElementById('new-user-name');
// const newgstNo = document.getElementById('new-user-gst');
// const newAddress = document.getElementById('new-user-address');
// const newPincode = document.getElementById('new-user-pincode');


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
// function validateInputs() {
//   // Validate existing user inputs
//   if (!document.getElementById('user-form').classList.contains('hidden')) {
//     removeValidationMessage(userNameInput);
//     removeValidationMessage(gstNo);
//     removeValidationMessage(address);
//     removeValidationMessage(pincode);
//     console.log("inside updating user");
    
//     if (userNameInput.value.trim() === '') {
//       showValidationMessage(userNameInput, 'Name cannot be empty');
//     }
//     if (gstNo.value.trim() === '') {
//       showValidationMessage(gstNo, 'GST cannot be empty');
//     }else if(gstNo.value.length < 10) {
//       showValidationMessage(gstNo, 'GST should more than 10 Characters');
//     }

//     if(address.value.trim()==''){
//       showValidationMessage(address, 'Address cannot be empty');
//     }else if(address.value.length <10){
//       showValidationMessage(address, 'Address should more than 10 Characters');
//     }
//     if(pincode.value.trim()==''){
//       showValidationMessage(pincode, 'Pincode cannot be empty');
//     }else if(pincode.value.length<6){
//       showValidationMessage(pincode, 'Pincode should minimum 6 digits');
//     }

//     saveButton.disabled = pincode.value.length<6||address.value.length <10||gstNo.value.length < 10 || userNameInput.value.trim() === '' || gstNo.value.trim() === ''|| address.value.trim===''||pincode.value.trim==='';
//   }
// }
// function validateInputs1(){
//   // Validate new user inputs
//   console.log("at line 57");
//   console.log(newUserInput+" "+newgstNo);
//   // if (newUserInput && newgstNo && newAddress && newPincode) {
//   if(!document.getElementById('add-user-form').classList.contains('hidden')){
//     removeValidationMessage(newUserInput);
//     removeValidationMessage(newgstNo);
//     removeValidationMessage(newAddress);
//     removeValidationMessage(newPincode);
//     console.log("inside new user validation");
//     if (newUserInput.value.trim() === '') {
//       showValidationMessage(newUserInput, 'Name cannot be empty');
//     }
    
//     if (newgstNo.value.trim() === '') {
//       showValidationMessage(newgstNo, 'GST cannot be empty');
//     }else if(newgstNo.value.length < 10) {
//       showValidationMessage(newgstNo, 'GST should more than 10 Characters');
//     }

//     if (newAddress.value.trim() === '') {
//       showValidationMessage(newAddress, 'Address cannot be empty');
//     }else if(newAddress.value.length <10){
//       showValidationMessage(newAddress, 'Address should more than 10 Characters');
//     }
//     if (newPincode.value.trim() === '') {
//       showValidationMessage(newPincode, 'Pincode cannot be empty');
//     }else if(newPincode.value.length<6){
//       showValidationMessage(newPincode, 'Pincode should minimum 6 digits');
//     }
//     console.log("new user gst input value"+newgstNo.value.trim())
//     addButton.disabled =  newPincode.value.length<6||newAddress.value.length <10||newgstNo.value.length < 10 || newUserInput.value.trim() === '' || newgstNo.value.trim() === ''|| newAddress.value.trim() === '' || newPincode.value.trim()==='';
//   }
// }


function validateInputs2(){
    // Validate new user inputs
      removeValidationMessage(cgst);
      removeValidationMessage(igst);
      removeValidationMessage(sgst);
      removeValidationMessage(hsncode);
      removeValidationMessage(invoiceNumber);
      removeValidationMessage(buyerOrderNumber);
      
      console.log("inside new user validation   2"+ cgst.value+"  "+igst.value );
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
    }
  
// Event listener to validate inputs on input
// if (userNameInput && gstNo && pincode && address) {
//   console.log("at line 83");
//   userNameInput.addEventListener('input', validateInputs);
//   gstNo.addEventListener('input', validateInputs);
//   pincode.addEventListener('input', validateInputs);
//   address.addEventListener('input', validateInputs);
// }
// if (newUserInput && newgstNo && newAddress && newPincode) {
//   console.log("at line 90");
//   newUserInput.addEventListener('input', validateInputs1);
//   newgstNo.addEventListener('input', validateInputs1);
//   newAddress.addEventListener('input', validateInputs1);
//   newPincode.addEventListener('input', validateInputs1);
// }

if(hsncode&cgst&igst&sgst&buyerOrderNumber&invoiceNumber){
    hsncode.addEventListener('input',validateInputs2);
    igst.addEventListener('input',validateInputs2);
    cgst.addEventListener('input',validateInputs2);
    sgst.addEventListener('input',validateInputs2);
    buyerOrderNumber.addEventListener('input',validateInputs2);
    invoiceNumber.addEventListener('input',validateInputs2);
    console.log(hsncode+igst+cgst+buyerOrderNumber);
}
// Initial validation call
// validateInputs();
// validateInputs1();
validateInputs2();

