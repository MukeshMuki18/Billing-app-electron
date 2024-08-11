
document.getElementById('loginForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    console.log(username+" "+password);
    // const response = await window.electron.invoke('login', { username, password });
    const response=await window.api.loginUser(username,password);
    if (response.success) {
        messageDiv.textContent = 'Login successful!';
        messageDiv.style.color = 'green';
        // Add logic to redirect to home window here
        window.location.href="home.html";
        // fetchAndRenderCustomers();

    } else {
        messageDiv.textContent = response.message;
        messageDiv.style.color = 'red';
    }
});
