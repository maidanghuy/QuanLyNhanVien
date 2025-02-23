const propAccount = "tknv";
const propName = "name";
const propEmail = "email";
const propPassword = "password";
const propDatePicker = "datepicker";
const propSalary = "luongCB";
const propRole = "chucvu";
const propWorkHoursMonth = "gioLam";

// +Tài khoản tối đa 4 - 6 ký số, không để trống
// + Tên nhân viên phải là chữ, không để trống
// + Email phải đúng định dạng, không để trống
// + mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống
// + Ngày làm không để trống, định dạng mm/dd/yyyy
// + Lương cơ bản 1 000 000 - 20 000 000, không để trống
// + Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
// + Số giờ làm trong tháng 80 - 200 giờ, không để trống


// Tính tổng lương theo chức vụ:
// +nếu chức vụ là giám đốc: tổng lương = lương cơ bản * 3
// +nếu chức vụ là trưởng phòng: tổng lương = lương cơ bản * 2
// +nếu chức vụ là nhân viên: tổng lương = lương cơ bản *

// Xây dựng phương thức xếp loại cho đối tượng nhân viên:
// +nếu nhân viên có giờ làm trên 192h (>=192): nhân viên xuất sắc
// +nếu nhân viên có giờ làm trên 176h (>=176): nhân viên giỏi
// +nếu nhân viên có giờ làm trên 160h (>=160): nhân viên khá
// +nếu nhân viên có giờ làm dưới 160h: nhân viên trung bình


let user_1 = {
    [propAccount]: "000000",
    [propName]: "Mai Dang Huy",
    [propEmail]: "admin@example.com",
    [propPassword]: "Huy123@",
    [propDatePicker]: "01/01/2015",
    [propSalary]: 20000000,
    [propRole]: 0,
    [propWorkHoursMonth]: 200,

    totalSalary() {
        switch (this[propRole]) {
            case 0:
                return this[propSalary] * 3;
            case 1:
                return this[propSalary] * 2;
            case 2:
                return this[propSalary];
            default:
                break;
        }
    },
    getLevel() {
        if (this[propWorkHoursMonth] >= 192) return "Nhân viên xuất sắc";
        if (this[propWorkHoursMonth] >= 176) return "Nhân viên giỏi";
        if (this[propWorkHoursMonth] >= 160) return "Nhân viên khá";
        return "Nhân viên trung bình";
    }
}

let user_2 = {
    [propAccount]: "111111",
    [propName]: "Viet Thanh Nguyen",
    [propEmail]: "manager@example.com",
    [propPassword]: "Huy123@",
    [propDatePicker]: "15/02/2021",
    [propSalary]: 15000000,
    [propRole]: 1,
    [propWorkHoursMonth]: 160,
    totalSalary() {
        switch (this[propRole]) {
            case 0:
                return this[propSalary] * 3;
            case 1:
                return this[propSalary] * 2;
            case 2:
                return this[propSalary];
            default:
                break;
        }
    },
    getLevel() {
        if (this[propWorkHoursMonth] >= 192) return "Nhân viên xuất sắc";
        if (this[propWorkHoursMonth] >= 176) return "Nhân viên giỏi";
        if (this[propWorkHoursMonth] >= 160) return "Nhân viên khá";
        return "Nhân viên trung bình";
    }
}

let user_3 = {
    [propAccount]: "222222",
    [propName]: "Nam Thanh Nguyen",
    [propEmail]: "employee@example.com",
    [propPassword]: "Huy123@",
    [propDatePicker]: "10/03/2025",
    [propSalary]: 18000000,
    [propRole]: 2,
    [propWorkHoursMonth]: 180,
    totalSalary() {
        switch (this[propRole]) {
            case 0:
                return this[propSalary] * 3;
            case 1:
                return this[propSalary] * 2;
            case 2:
                return this[propSalary];
            default:
                break;
        }
    },
    getLevel() {
        if (this[propWorkHoursMonth] >= 192) return "Nhân viên xuất sắc";
        if (this[propWorkHoursMonth] >= 176) return "Nhân viên giỏi";
        if (this[propWorkHoursMonth] >= 160) return "Nhân viên khá";
        return "Nhân viên trung bình";
    }
}

let users = [user_3, user_2, user_1];

function createUser(account, name, email, password, datepicker, salary, role, workHours) {
    return {
        [propAccount]: account,
        [propName]: name,
        [propEmail]: email,
        [propPassword]: password,
        [propDatePicker]: datepicker,
        [propSalary]: salary,
        [propRole]: role,
        [propWorkHoursMonth]: workHours,
        totalSalary() {
            switch (this.chucvu) {
                case 0:
                    return this.luongCB * 3;
                case 1:
                    return this.luongCB * 2;
                case 2:
                    return this.luongCB;
                default:
                    return 0;
            }
        },
        getLevel() {
            if (this.gioLam >= 192) return "Nhân viên xuất sắc";
            if (this.gioLam >= 176) return "Nhân viên giỏi";
            if (this.gioLam >= 160) return "Nhân viên khá";
            return "Nhân viên trung bình";
        }
    };
}

let newUser = createUser("333333", "Huy Nguyen", "manager@example.com", "Huy123@", "15/04/2023", 20000000, 1, 180);
users.push(newUser);

export default users;
export { propAccount, propName, propEmail, propPassword, propDatePicker, propSalary, propRole, propWorkHoursMonth, createUser };