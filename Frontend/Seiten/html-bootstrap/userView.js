function userAdminFunction() {
    if (localStorage.getItem('user.type') === 'admin') {
        var cssCode = ".bi-person { display:none; }";
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';

        if (styleElement.styleSheet) {
            // Für den Internet Explorer
            styleElement.styleSheet.cssText = cssCode;
        } else {
            styleElement.appendChild(document.createTextNode(cssCode));
        }

        document.head.appendChild(styleElement);

    }
}

function userNullFunction() {
    if (localStorage.getItem('user.type') === null) {
        var cssCode = ".bi-bag-dash { display:none; }" +
                      ".bi-box-arrow-in-right { display: none; }";
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';

        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = cssCode;
        } else {
            styleElement.appendChild(document.createTextNode(cssCode));
        }

        document.head.appendChild(styleElement);

    }
}

function userUserFunction() {
    if (localStorage.getItem('user.type') === 'user') {
        var cssCode = ".bi-person { display:none; }";
        var styleElement = document.createElement('style');
        styleElement.type = 'text/css';

        if (styleElement.styleSheet) {
            // Für den Internet Explorer
            styleElement.styleSheet.cssText = cssCode;
        } else {
            styleElement.appendChild(document.createTextNode(cssCode));
        }

        document.head.appendChild(styleElement);

    }
}

function logoutStorage() {
    localStorage.clear();
}

// Button-Element auswählen
var logoutButton = document.getElementById('logouticon');

// Klick-Ereignis dem Button hinzufügen
logoutButton.addEventListener('click', function () {
    logoutStorage();
});
