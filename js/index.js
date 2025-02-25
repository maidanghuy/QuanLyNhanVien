import {
    validationAccount, checkUniqueAccount, validationName, validationEmail, validationPassword,
    validationDate, validationSalary, validationRole, validationWorkHours
} from './validation.js';

import users, {
    propAccount, propName, propEmail, propPassword,
    propDatePicker, propSalary, propRole, propWorkHoursMonth, createUser
} from './userObject.js';

console.log(users);

{/* <th>Họ và tên</th>
<th>Email</th>
<th>Ngày làm</th>
<th>Chức vụ</th>
<th>Tổng lương</th>
<th>Xếp loại</th> */}


// ----------------------------------------------------------------
// tao thong tin cho tung hang trong bang
function handleRow(user) {
    const roleMap = ["Giám đốc", "Trưởng phòng", "Nhân viên"];
    return `
    <tr>
        <td>${user[propAccount]}</td>
        <td>${user[propName]}</td>
        <td>${user[propEmail]}</td>
        <td>${user[propDatePicker]}</td>
        <td>${roleMap[user[propRole]] || "Không xác định"}</td>
        <td>${user.totalSalary().toLocaleString()}</td>
        <td>${user.getLevel()}</td>
        <td>
            <div style="display: flex;">
                <button class="btn btn-success btnUpdate" data-toggle="modal" data-target="#myModal" data-account="${user[propAccount]}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btnDelete" data-account="${user[propAccount]}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
    `;
}


// ----------------------------------------------------------------
// handle ra list tren UI
function handleTable(users) {
    users.sort(function (a, b) {
        return a[propAccount].localeCompare(b[propAccount]);
    });
    const tableDanhSach = document.querySelector("#tableDanhSach");
    let tableDanhSachTable = "";

    users.forEach(user => {
        tableDanhSachTable += handleRow(user);
    });

    tableDanhSach.innerHTML = tableDanhSachTable;
}
handleTable(users);


// ----------------------------------------------------------------
// lay cac element tu form
function getForm() {
    return {
        account: document.getElementById(propAccount),
        name: document.getElementById(propName),
        email: document.getElementById(propEmail),
        password: document.getElementById(propPassword),
        datepicker: document.getElementById(propDatePicker),
        salary: document.getElementById(propSalary),
        role: document.getElementById(propRole),
        workHours: document.getElementById(propWorkHoursMonth)
    };
}
// ----------------------------------------------------------------
// lay thong tin tu from va tao user obj
function getInfo(type) {
    const form = getForm();
    let { account, name, email, password, datepicker, salary, role, workHours } = form;
    console.log(account, name, email, password, datepicker, salary, role, workHours);
    if (!validationAccount(account.value)) {
        alert('Tài khoản phải từ 4 đến 6 ký tự và chỉ chứa số.');
        return;
    }

    if (type != 1) {
        if (!checkUniqueAccount(account.value, users)) {
            alert('Tài khoản đã tồn tại');
            return;
        }
    }
    account = account.value.padStart(6, '0');
    // console.log(account);

    if (!validationName(name.value)) {
        alert('Tên nhân viên phải là chữ');
        return;
    }
    name = name.value;

    if (!validationEmail(email.value)) {
        alert('Email không đúng đúng dạng');
        return;
    }
    email = email.value;

    if (!validationPassword(password.value)) {
        alert('Mật khẩu phải từ 6 đến 10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt');
        return;
    }
    password = password.value;

    if (!validationDate(datepicker.value)) {
        alert('Ngày làm phải đúng định dạng mm/dd/yyyy');
        return;
    }
    let parts = datepicker.value.split('/');
    datepicker = `${parts[1]}/${parts[0]}/${parts[2]}`;

    if (!validationSalary(Number(salary.value))) {
        alert('Lương cơ bản phải từ 1000000 đến 20000000');
        return;
    }
    salary = Number(salary.value);

    if (!validationRole(Number(role.value))) {
        alert('Chức vụ phải chọn Giám Đốc, Trưởng Phòng, hoặc Nhân Viên');
        return;
    }
    role = Number(role.value);

    if (!validationWorkHours(Number(workHours.value))) {
        alert('Số giờ làm trong tháng phải từ 80 đến 200');
        return;
    }
    workHours = Number(workHours.value);

    const user = createUser(account, name, email, password, datepicker, salary, role, workHours);
    console.log(user);
    return user;
}


// ----------------------------------------------------------------
// day user vao mang, handle lai table va reset from
function addUser() {
    const user = getInfo(0);
    if (user) {
        users.push(user);
        handleTable(users);
        resetForm();
        Toastify({
            text: "Add account successfully!",
            duration: 3000,
            backgroundColor: "linear-gradient(to right, #0066ff,#0043a7)",
        }).showToast();
    }
}
document.getElementById("btnThemNV").addEventListener("click", addUser);


// ----------------------------------------------------------------
// an nut cap nhap va hien nut them
function hiddenCapNhap() {
    document.getElementById('btnCapNhat').style.display = 'none';
    document.getElementById('btnThemNV').style.display = 'block';
}


// ----------------------------------------------------------------
// hien nut cap nhap va an nut them
function appendCapNhap() {
    document.getElementById('btnCapNhat').style.display = 'block';
    document.getElementById('btnThemNV').style.display = 'none';
}


// ----------------------------------------------------------------
// nhan nut them thi nut cap nhat se bi an di
document.getElementById('btnThem').addEventListener('click', function () {
    hiddenCapNhap();
});


// ----------------------------------------------------------------
// reset form
function resetForm() {
    const form = getForm();
    let { account, name, email, password, datepicker, salary, role, workHours } = form;
    account.value = "";
    name.value = "";
    email.value = "";
    password.value = "";
    datepicker.value = "";
    salary.value = "";
    role.value = 0;
    workHours.value = "";
}
document.getElementById('btnDong').addEventListener('click', function () {
    appendCapNhap();
    resetForm();
});


// ----------------------------------------------------------------
// gan su kien cho bang khi click
document.getElementById("myTable").addEventListener("click", function (event) {
    // tim phan tu gan nhat cho btn dang duoc nhan
    const updateButton = event.target.closest(".btnUpdate");
    const deleteButton = event.target.closest(".btnDelete");

    if (updateButton) {
        fillInfo(updateButton);
    }

    if (deleteButton) {
        deleteUser(deleteButton);
    }
});


// ----------------------------------------------------------------
// update user
function fillInfo(account) {
    const id = document.getElementById(propAccount);
    id.readOnly = true;
    account.readOnly = true;
    const form = getForm();
    let { account: account2, name, email, password, datepicker, salary, role, workHours } = form;
    const index = users.findIndex(user => user[propAccount] === account.dataset.account);
    if (index === -1) {
        alert("Tài khoản không tồn tại.");
        return;
    }
    account2.value = account.dataset.account;
    name.value = users[index][propName];
    email.value = users[index][propEmail];
    password.value = users[index][propPassword];
    let parts = users[index][propDatePicker].split('/');
    datepicker.value = `${parts[1]}/${parts[0]}/${parts[2]}`;
    salary.value = users[index][propSalary];
    role.value = users[index][propRole];
    workHours.value = users[index][propWorkHoursMonth];
    appendCapNhap();
}

document.getElementById('btnCapNhat').addEventListener('click', function () {
    if (!confirm('Bạn có muốn cập nhật không?')) {
        return;
    }
    const user = getInfo(1);
    if (user) {
        const index = users.findIndex(u => u[propAccount] == user[propAccount]);
        if (index === -1) {
            alert("Tài khoản không tồn tại.");
            return;
        }
        users.splice(index, 1);
        users.push(user);
        handleTable(users);
        resetForm();
        Toastify({
            text: "Update account successfully!",
            duration: 3000,
            backgroundColor: "linear-gradient(to right, #4CAF50, #45a049)",
        }).showToast();
    }
    const id = document.getElementById(propAccount);
    id.readOnly = false;
    hiddenCapNhap();

});


// ----------------------------------------------------------------
// delete user
function deleteUser(account) {
    if (!confirm('Bạn có muốn xóa không?')) {
        return;
    }
    const index = users.findIndex(user => user[propAccount] === account.dataset.account);
    if (index === -1) {
        alert("Tài khoản không tồn tại.");
        return;
    }
    users.splice(index, 1);
    handleTable(users);
    resetForm();
    Toastify({
        text: "Delete account successfully!",
        duration: 3000,
        backgroundColor: "linear-gradient(to right, #FF0000, #FFA500)",
    }).showToast();
}


// ----------------------------------------------------------------
// Search User
let handleSearch = function () {
    const input = document.getElementById('searchName').value.toLowerCase();
    const filteredUsers = users.filter(user => user.getLevel().includes(input));
    console.log(filteredUsers);
    handleTable(filteredUsers);
}
document.getElementById('btnTimNV').addEventListener('click', handleSearch);
document.getElementById('searchName').addEventListener("keydown", handleSearch);