
function loadUsers() {
    $.ajax({
        url: "http://localhost:8080/users",
        method: "GET",
        headers: { "Authorization": sessionStorage.getItem("token") },
        success: function (users) {
            var userTableBody = $("#userTableBody");
            userTableBody.empty();

            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                var row = $("<tr></tr>");
                row.append($("<td class='align-middle'>" + user.id + "</td>"));
                row.append($("<td class='align-middle'>" + user.username + "</td>"));
                row.append($("<td class='align-middle'>" + user.email + "</td>"));
                row.append($("<td class='align-middle'>" + (user.active ? "&#10004;&#65039;" : "&#10060;") + "</td>"));
                row.append($("<td class='align-middle'>" + (user.admin ? "&#10004;&#65039;" : "&#10060;") + "</td>"));

                var editButton = $("<button class='btn btn-primary'>Bearbeiten</button>");
                editButton.click(createEditUserHandler(user));

                var deleteButton = $("<button class='btn btn-danger mx-1'>Löschen</button>");
                deleteButton.click(createDeleteUserHandler(user.id));

                var buttonCell = $("<td class='text-end'></td>").append(editButton, deleteButton);
                row.append(buttonCell);

                userTableBody.append(row);
            }
        },
        error: function (error) {
            console.error(error);
        }
    });
}

function createEditUserHandler(user) {
    return function () {
        var userTableBody = $("#userTableBody");
        userTableBody.empty();

        var row = $("<tr></tr>");

        var idCell = $("<td class='align-middle'></td>").text(user.id);
        row.append(idCell);

        var usernameInput = $("<input id='username' type='text' class='form-control' value='" + user.username + "'>");
        var usernameCell = $("<td></td>").append(usernameInput);
        row.append(usernameCell);

        var emailInput = $("<input id='email' type='email' class='form-control' value='" + user.email + "'>");
        var emailCell = $("<td></td>").append(emailInput);
        row.append(emailCell);

        var activeDropdown = $("<select class='form-control' id='activeDropdown'></select>");
        activeDropdown.append($("<option value='true'>&#10004;&#65039;</option>"));
        activeDropdown.append($("<option value='false'>&#10060;</option>"));
        activeDropdown.val(user.active.toString());
        var activeCell = $("<td></td>").append(activeDropdown);
        row.append(activeCell);

        var adminDropdown = $("<select class='form-control' id='adminDropdown'></select>");
        adminDropdown.append($("<option value='true'>&#10004;&#65039;</option>"));
        adminDropdown.append($("<option value='false'>&#10060;</option>"));
        adminDropdown.val(user.admin.toString());
        var adminCell = $("<td></td>").append(adminDropdown);
        row.append(adminCell);

        var saveButton = $("<button class='btn btn-primary mx-1'>Speichern</button>");
        saveButton.click(createSaveUserHandler(user));
        var cancelButton = $("<button class='btn btn-secondary'>Abbrechen</button>");
        cancelButton.click(function () {
            loadUsers();
        });

        var buttonCell = $("<td class='text-end'></td>").append(saveButton, cancelButton);
        row.append(buttonCell);

        userTableBody.append(row);
    };
}


function createSaveUserHandler(user) {
    return function () {
        var userId = user.id;
        var newUsername = $("#username").val();
        var newEmail = $("#email").val();
        var isActive = $("#activeDropdown").val() === "true";
        var isAdmin = $("#adminDropdown").val() === "true";

        // Überprüfe, ob das Eingabefeld leer ist
        if (newUsername.trim() === "") {
            // Wenn das Eingabefeld leer ist, behalte den alten Benutzernamen bei
            newUsername = user.username;
        }

        if (newEmail.trim() === "") {
            // Wenn das Eingabefeld leer ist, behalte die alte E-Mail-Adresse bei
            newEmail = user.email;
        }

        var updatedUser = {
            id: userId,
            username: newUsername,
            email: newEmail,
            password: user.password,
            active: isActive,
            admin: isAdmin
        };

        console.log("updatedUser:", updatedUser);

        // AJAX PUT-Anfrage senden, um den Benutzer zu aktualisieren
        $.ajax({
            url: "http://localhost:8080/users/update",
            method: "PUT",
            headers: { "Authorization": sessionStorage.getItem("token") },
            data: JSON.stringify(updatedUser),
            contentType: "application/json",
            success: function (response) {
                // Hier kannst du den Code zum Handhaben der erfolgreichen Aktualisierung implementieren
                console.log("Updated user:", response);

                // Lade die Benutzer erneut, um die aktualisierten Daten anzuzeigen
                loadUsers();
            },
            error: function (error) {
                console.error(error);
            }
        });
    };
}


function createDeleteUserHandler(userId) {
    return function () {
        if (confirm("Are you sure you want to delete this user?")) {
            $.ajax({
                url: "http://localhost:8080/users/" + userId,
                method: "DELETE",
                headers: { "Authorization": sessionStorage.getItem("token") },
                success: function (response) {
                    console.log("Deleted user:", response);
                    loadUsers();
                },
                error: function (error) {
                    console.error(error);
                }
            });
        }
    };
}

$(document).ready(function () {
    loadUsers();
});