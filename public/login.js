function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorElement = document.getElementById("error");

    if (username === "admin" && password === "admin123") {
        errorElement.innerHTML = "";
        window.location = "dashboard.html";
    } else {
        errorElement.innerHTML = "Invalid Login Credentials";
    }
}
