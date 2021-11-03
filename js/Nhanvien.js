function NhanVien(tk, name, email, pass, date, salary, duty, workingTime) {
  this.tk = tk;
  this.name = name;
  this.email = email;
  this.pass = pass;
  this.date = date;
  this.salary = salary;
  this.duty = duty;
  this.workingTime = workingTime;
  this.sumSal = 0;
  this.type = "";

  this.tongluong = function (duty, sal) {
    if (duty == "Sếp") {
      return sal * 3;
    } else if (duty == "Trưởng phòng") {
      return sal * 2;
    }
    return sal;
  };
  this.xeploai = (time) => {
    if (time >= 192) {
      return "Nhân viên xuất sắc";
    } else if (time >= 176) {
      return "Nhân viên giỏi";
    } else if (time >= 160) {
      return "Nhân viên khá";
    }
    return "Nhân viên trung bình";
  };
}
