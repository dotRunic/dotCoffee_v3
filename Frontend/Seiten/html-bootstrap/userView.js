
function updateUserView() {
    var userType = localStorage.getItem('user.type');
    var cssCode = '';

    if (userType === 'admin') {
        cssCode = ".bi-person { display:none; }" + ".usertxt {display: none;}";
        console.log("Login - Admin");
    } else if (userType === 'user') {
        cssCode = ".bi-person { display:none; }" + ".admintxt { display: none;}";
        console.log("Login - User");
    } else {
        cssCode = ".bi-bag-dash { display:none; }" +
            ".bi-box-arrow-in-right { display: none; }" + ".admintxt { display: none;}" + ".usertxt {display: none;}";
        console.log("Not logged in");
    }

    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';

    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = cssCode;
    } else {
        styleElement.appendChild(document.createTextNode(cssCode));
    }

    document.head.appendChild(styleElement);
}

function logoutStorage() {
    localStorage.clear();
    console.log("localStorage - flushed");
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var navItem = document.querySelector('.nav-item');
        if (navItem !== null) {
            var logoutButton = navItem.querySelector('.bi-box-arrow-in-right');
            if (logoutButton !== null) {
                logoutButton.addEventListener('click', function () {
                    logoutStorage();
                });
            }
        }
    }, 100);
    
    updateUserView();
});


// function userAdminFunction() {
//     if (localStorage.getItem('user.type') === 'admin') {
//         var cssCode = ".bi-person { display:none; }" + ".usertxt {display: none;}";
//         var styleElement = document.createElement('style');
//         styleElement.type = 'text/css';
//         console.log("Login - Admin");
//         if (styleElement.styleSheet) {
//             // Für den Internet Explorer
//             styleElement.styleSheet.cssText = cssCode;
//         } else {
//             styleElement.appendChild(document.createTextNode(cssCode));
//         }

//         document.head.appendChild(styleElement);

//     }
// }

// function userNullFunction() {
//     if (localStorage.getItem('user.type') === null) {
//         var cssCode = ".bi-bag-dash { display:none; }" +
//             ".bi-box-arrow-in-right { display: none; }" + ".admintxt { display: none;}" + ".usertxt {display: none;}";
//         var styleElement = document.createElement('style');
//         styleElement.type = 'text/css';
//         console.log("Not logged in");
//         if (styleElement.styleSheet) {
//             styleElement.styleSheet.cssText = cssCode;
//         } else {
//             styleElement.appendChild(document.createTextNode(cssCode));
//         }

//         document.head.appendChild(styleElement);

//     }
// }

// function userUserFunction() {
//     if (localStorage.getItem('user.type') === 'user') {
//         var cssCode = ".bi-person { display:none; }" + ".admintxt { display: none;}";
//         var styleElement = document.createElement('style');
//         styleElement.type = 'text/css';
//         console.log("Login - User");
//         if (styleElement.styleSheet) {
//             // Für den Internet Explorer
//             styleElement.styleSheet.cssText = cssCode;
//         } else {
//             styleElement.appendChild(document.createTextNode(cssCode));
//         }

//         document.head.appendChild(styleElement);

//     }
// }

// function logoutStorage() {
//     localStorage.clear();
//     console.log("localStorage - flushed");
// }

// document.addEventListener('DOMContentLoaded', function() {
//     // setTimeout wird verwendet, um eine Verzögerung zu erzeugen und sicherzustellen, dass das <li>-Element vollständig geladen ist
//     setTimeout(function() {
//         // <li>-Element mit der Klasse 'nav-item' auswählen
//         var navItem = document.querySelector('.nav-item');

//         // Überprüfen, ob das <li>-Element gefunden wurde
//         if (navItem !== null) {
//             // <i>-Element mit der Klasse 'bi-box-arrow-in-right' im <li>-Element finden
//             var logoutButton = navItem.querySelector('.bi-box-arrow-in-right');
        
//             // Überprüfen, ob das <i>-Element gefunden wurde
//             if (logoutButton !== null) {
//                 // Klick-Ereignis dem Button hinzufügen
//                 logoutButton.addEventListener('click', function () {
//                     logoutStorage();
//                     // location.reload();
//                 });
//             }
//         }
//     }, 100);
// });

