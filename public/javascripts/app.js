//alert("Hello World!");
//
const notification = document.querySelector("#notification");
const profile = document.querySelector("#profile");

const notificationWindow = function() {
    // if floating window already exists, close it
    if (document.querySelector("#floating-window")) {
        document.body.removeChild(document.querySelector("#floating-window"));
    }
    // else, spawn a new floating window (div) with the message
    else {
        // notification window under the bell icon
        const floatingWindow = document.createElement("div");
        floatingWindow.id = "floating-window";
        floatingWindow.style.position = "absolute";
        floatingWindow.style.top = "50px";
        floatingWindow.style.right = "70px";
        floatingWindow.style.width = "200px";
        floatingWindow.style.height = "100px";
        floatingWindow.style.backgroundColor = "white";
        floatingWindow.style.border = "1px solid black";
        floatingWindow.style.zIndex = "100";
        floatingWindow.style.padding = "10px";
        floatingWindow.style.overflow = "auto";
        floatingWindow.innerHTML = "You have no notifications";
        document.body.appendChild(floatingWindow);
    }
}

const profileWindow = function() {
    // if floating window already exists, close it
    if (document.querySelector("#floating-window")) {
        document.body.removeChild(document.querySelector("#floating-window"));
    }
    // else, spawn a new floating window (div) with the message
    else {
        // notification window under the profile icon
        const floatingWindow = document.createElement("div");
        floatingWindow.id = "floating-window";
        floatingWindow.style.position = "absolute";
        floatingWindow.style.top = "50px";
        floatingWindow.style.right = "40px";
        floatingWindow.style.width = "200px";
        floatingWindow.style.height = "100px";
        floatingWindow.style.backgroundColor = "#202020";
        floatingWindow.style.border = "1px solid black";
        floatingWindow.style.zIndex = "100";
        floatingWindow.style.padding = "10px";
        floatingWindow.style.overflow = "auto";
        floatingWindow.appendChild(document.createElement("ul"));
        floatingWindow.firstChild.appendChild(document.createElement("li"));
        floatingWindow.firstChild.firstChild.className = "mb-2";
        floatingWindow.firstChild.firstChild.appendChild(document.createElement("a"));
        floatingWindow.firstChild.firstChild.firstChild.href = "/user";
        floatingWindow.firstChild.firstChild.firstChild.className = "text-decoration-none text-white";
        floatingWindow.firstChild.firstChild.firstChild.innerHTML = "Profile";


        // create a logout button
        // if user is logged in, show logout button
        // else, show login button
        if (document.querySelector("#nav-logout")) { // if log out button exists
            floatingWindow.firstChild.appendChild(document.createElement("li"));
            floatingWindow.firstChild.lastChild.appendChild(document.createElement("a"));
            floatingWindow.firstChild.lastChild.firstChild.href = "/logout";
            floatingWindow.firstChild.lastChild.firstChild.className = "text-decoration-none text-white";
            floatingWindow.firstChild.lastChild.firstChild.innerHTML = "Logout";
        } else {
            floatingWindow.firstChild.appendChild(document.createElement("li"));
            floatingWindow.firstChild.lastChild.appendChild(document.createElement("a"));
            floatingWindow.firstChild.lastChild.firstChild.href = "/login";
            floatingWindow.firstChild.lastChild.firstChild.className = "text-decoration-none text-white";
            floatingWindow.firstChild.lastChild.firstChild.innerHTML = "Login";
        }

        document.body.appendChild(floatingWindow);
    }
}

notification.addEventListener("click", notificationWindow);
profile.addEventListener("click", profileWindow);
// TODO: better if use react
