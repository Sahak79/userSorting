var SortUsers = (function(){

    var element;
    var table;

    var users = [
        {
            age:       "25",
            name:      "Sahak",
            surname:   "Babayan",
            position : "Junior software developer"
        }, {
            age:       "24",
            name:      "Luiza",
            surname:   "Kharatyan",
            position : "Senior software developer"
        }, {
            age:       "27",
            name:      "Mary",
            surname:   "Ghazaryan",
            position : "Middle software developer"
        }, {
            age:       "27",
            name:      "Khachatur",
            surname:   "Vardanyan",
            position : "Senior software developer"
        }
    ];

    function sortBy(field, reverse, isNumber) {

        reverse = reverse ? 1 : -1;

        var key = !isNumber ?
            function(x) {
                return x[field].toUpperCase()
            }
            :
            function(x) {
                return x[field]
            };

        return function(a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a)); // we compare each value by '>' and get 'true' or 'false' then subtract and get 0 , 1 or -1
        }
    }

    function sortUsers(e, field, reverse, isNumber) {
        if(e.className == "ASC") {
            users.sort(sortBy(field, true, isNumber));
            e.className = "DESC";
        } else {
            users.sort(sortBy(field, false, isNumber));
            e.className = "ASC";
        }
        clearTableBody();
        buildTableBody();
    }

    function init(selector) {
        element = document.getElementById(selector);
        table = document.createElement('table');
        users.sort(sortBy("name", true, false)); // we sort initially by 'ASC'
        buildTableHeader();
        buildTableBody();

    }

    function addUser() {
        var name = document.getElementById("name");
        var surname = document.getElementById("surname");
        var age = document.getElementById("age");
        var position = document.getElementById("position");
        if(name != "" &&
            surname != "" &&
            age != "" &&
            position != "") {
            var newUser = {
                name : name.value,
                surname : surname.value,
                age : age.value,
                position : position.value
            };
            users.push(newUser);
            clearTableBody();
            buildTableBody();
            name.value = "";
            surname.value = "";
            age.value = "";
            position.value = "";
        } else {
            alert("Please fill all fields");
        }

    }

    function buildTableHeader() {
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');

        var th_name = document.createElement('th');
        var th_surname = document.createElement('th');
        var th_age = document.createElement('th');
        var th_position = document.createElement('th');

        var name = document.createTextNode("Name");
        var surname = document.createTextNode("Surname");
        var age = document.createTextNode("Age");
        var position = document.createTextNode("Position");

        var name_sort_icon = document.createElement("span");
        var surname_sort_icon = document.createElement("span");
        var age_sort_icon = document.createElement("span");
        var position_sort_icon = document.createElement("span");

        th_name.appendChild(name);
        th_name.appendChild(name_sort_icon);
        th_surname.appendChild(surname);
        th_surname.appendChild(surname_sort_icon);
        th_age.appendChild(age);
        th_age.appendChild(age_sort_icon);
        th_position.appendChild(position);
        th_position.appendChild(position_sort_icon);

        th_name.setAttribute("onclick", "SortUsers.sortUsers(this, 'name', false, false)");
        th_surname.setAttribute("onclick", "SortUsers.sortUsers(this, 'surname', false, false)");
        th_age.setAttribute("onclick", "SortUsers.sortUsers(this, 'age', false, true)");
        th_position.setAttribute("onclick", "SortUsers.sortUsers(this, 'position', false, false)");

        th_name.setAttribute("class", "DESC");
        th_surname.setAttribute("class", "DESC");
        th_age.setAttribute("class", "DESC");
        th_position.setAttribute("class", "DESC");

        tr.appendChild(th_name);
        tr.appendChild(th_surname);
        tr.appendChild(th_age);
        tr.appendChild(th_position);

        thead.appendChild(tr);

        table.appendChild(thead);
    }

    function buildTableBody() {
        var tbody = document.createElement('tbody');

        for (var i = 0; i < users.length; i++){
            var tr = document.createElement('tr');

            var td_name = document.createElement('td');
            var td_surname = document.createElement('td');
            var td_age = document.createElement('td');
            var td_position = document.createElement('td');

            var name = document.createTextNode(users[i].name);
            var surname = document.createTextNode(users[i].surname);
            var age = document.createTextNode(users[i].age);
            var position = document.createTextNode(users[i].position);

            td_name.appendChild(name);
            td_surname.appendChild(surname);
            td_age.appendChild(age);
            td_position.appendChild(position);

            tr.appendChild(td_name);
            tr.appendChild(td_surname);
            tr.appendChild(td_age);
            tr.appendChild(td_position);

            tbody.appendChild(tr);
        }

        table.appendChild(tbody);
        element.appendChild(table);
    }

    function clearTableBody() {
        var tableBody = element.getElementsByTagName("tbody")[0];
        tableBody.remove();
    }

    return{
        init : init,
        sortUsers : sortUsers,
        addUser : addUser
    }
})();

window.onload = function(){SortUsers.init("main")};
