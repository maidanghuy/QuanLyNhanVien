// Tài khoản tối đa 4 - 6 ký số, không để trống
// + Tên nhân viên phải là chữ, không để trống
// + Email phải đúng định dạng, không để trống
// + mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không
// để trống
// + Ngày làm không để trống, định dạng mm/dd/yyyy
// + Lương cơ bản 1 000 000 - 20 000 000, không để trống
// + Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
// + Số giờ làm trong tháng 80 - 200 giờ, không để trống

function validationAccount(account) {
    return account.length >= 4 && account.length <= 6 && /^[0-9]+$/.test(account);
}

function validationName(name) {
    return /^[a-zA-Z ]+$/.test(name) && name.trim() !== "";
}

function validationEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.trim() !== "";
}

function validationPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/.test(password);
}

function validationDate(date) {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d\d$/;
    return regex.test(date);
}

function validationSalary(salary) {
    return salary >= 1000000 && salary <= 20000000;
}

function validationRole(role) {
    return role === 0 || role === 1 || role === 2;
}

function validationWorkHours(workHours) {
    return workHours >= 80 && workHours <= 200;
}

export { validationAccount, validationName, validationEmail, validationPassword, validationDate, validationSalary, validationRole, validationWorkHours }

// Example usage:
// const account = "abc123";
// const name = "John Doe";
// const email = "john.doe@example.com";
// const password = "Password123!";
// const date = "1/01/2022";
// const salary = 15000000;
// const role = 1; // 0: Giám đốc, 1: Trư��ng Phòng, 2: Nhân Viên
// const workHours = 120;

// const errors = [];

// if (!validationAccount(account)) {
//     errors.push("Tài khoản phải từ 4 đến 6 ký tự và chỉ chứa số.");
// }

// if (!validationName(name)) {
//     errors.push("Tên nhân viên phải là chữ và không để trống.");
// }

// if (!validationEmail(email)) {
//     errors.push("Email phải đúng đ��nh dạng và không để trống.");
// }

// if (!validationPassword(password)) {
//     errors.push("Mật khẩu phải từ 6 đến 10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt.");
// }

// if (!validationDate(date)) {
//     errors.push("Ngày làm phải đúng định dạng mm/dd/yyyy và không để trống.");
// }

// if (!validationSalary(salary)) {
//     errors.push("Lương cơ bản phải từ 1,000,000 đến 20,000,000.");
// }

// if (!validationRole(role)) {
//     errors.push("Chức vụ phải chọn giám đốc, trư��ng Phòng, hoặc Nhân Viên.");
// }

// if (!validationWorkHours(workHours)) {
//     errors.push("Số gi�� làm trong tháng phải từ 80 đến 200.");
// }

// if (errors.length > 0) {
//     console.log("Errors:");
//     errors.forEach((error) => console.log(error));
// }
