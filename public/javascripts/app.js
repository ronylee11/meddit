//alert("Hello World!");
//
const notification = document.querySelector("#notification");
const profile = document.querySelector("#profile");

const popUpWindow = function() {
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

notification.addEventListener("click", popUpWindow);
profile.addEventListener("click", popUpWindow);
// TODO: better if use react
