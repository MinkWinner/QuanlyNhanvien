var DSNV = new DanhSachNhanVien();
var validatation = new Valiadation();
function getEle(idEle) {
  return document.getElementById(idEle);
}

function setLocalStorage(key, mangNV) {
  localStorage.setItem(key, JSON.stringify(mangNV));
}
function getLocalStorage(key) {
  var array = JSON.parse(localStorage.getItem(key));
  if (array != null) {
    DSNV.DS = array;
    hienthiDanhsachNhanvien(DSNV.DS);
  }
}
getLocalStorage("DSNV");

function laythongtinNhanVien() {
  var tk = getEle("tknv").value;
  var name = getEle("name").value;
  var email = getEle("email").value;
  var pass = getEle("password").value;
  var startdate = getEle("datepicker").value;
  var sal = getEle("luongCB").value;
  var duty = getEle("chucvu").value;
  var workingTime = getEle("gioLam").value;

  var checkInput = checkValidation(
    tk,
    name,
    email,
    pass,
    startdate,
    sal,
    workingTime
  );

  if (checkInput) {
    var nv = new NhanVien(
      tk,
      name,
      email,
      pass,
      startdate,
      sal,
      duty,
      workingTime
    );
    nv.sumSal = nv.tongluong(duty, sal);
    nv.type = nv.xeploai(workingTime);

    DSNV.themNV(nv);
    setLocalStorage("DSNV", DSNV.DS);
    hienthiDanhsachNhanvien(DSNV.DS);
  }
}

function hienthiDanhsachNhanvien(mangNV) {
  var showinfo = "";
  for (var i = 0; i < mangNV.length; i++) {
    showinfo += `
            <tr>
                <td>${mangNV[i].tk}</td>
                <td>${mangNV[i].name}</td>
                <td>${mangNV[i].email}</td>
                <td>${mangNV[i].date}</td>
                <td>${mangNV[i].duty}</td>
                <td>${mangNV[i].sumSal}</td>
                <td>${mangNV[i].type}</td>
                <td>
                    <i onclick="delNV('${mangNV[i].tk}')" class="fa fa-times-circle btnDel"></i>
                    <i onclick="showNV('${mangNV[i].tk}')" class="fa fa-edit btnEdit" data-toggle="modal"
                    data-target="#myModal"></i>
                </td>
            </tr>
        `;
  }
  getEle("tableDanhSach").innerHTML = showinfo;
}

function delNV(tk) {
  DSNV.xoaNV(tk);
  setLocalStorage("DSNV", DSNV.DS);
  hienthiDanhsachNhanvien(DSNV.DS);
}

function showNV(tk) {
  var vitri = DSNV.timNV(tk);
  getEle("tknv").disabled = true;
  getEle("tknv").value = DSNV.DS[vitri].tk;
  getEle("name").value = DSNV.DS[vitri].name;
  getEle("email").value = DSNV.DS[vitri].email;
  getEle("password").value = DSNV.DS[vitri].pass;
  getEle("password").disabled = true;
  getEle("datepicker").value = DSNV.DS[vitri].date;
  getEle("luongCB").value = DSNV.DS[vitri].salary;
  getEle("chucvu").value = DSNV.DS[vitri].duty;
  getEle("gioLam").value = DSNV.DS[vitri].workingTime;

  var thongbao = document.getElementsByClassName("sp-thongbao");
  for (var i = 0; i < thongbao.length; i++) {
    thongbao[i].innerHTML = "";
    thongbao[i].style = "display: none";
  }
}

function updateNV() {
  var tk = getEle("tknv").value;
  var name = getEle("name").value;
  var email = getEle("email").value;
  var pass = getEle("password").value;
  var startdate = getEle("datepicker").value;
  var sal = getEle("luongCB").value;
  var duty = getEle("chucvu").value;
  var workingTime = getEle("gioLam").value;
  var checkUpdate = updateCheckValidation(
    name,
    email,
    startdate,
    sal,
    workingTime
  );

  if (checkUpdate) {
    var nv = new NhanVien(
      tk,
      name,
      email,
      pass,
      startdate,
      sal,
      duty,
      workingTime
    );
    nv.sumSal = nv.tongluong(duty, sal);
    nv.type = nv.xeploai(workingTime);

    DSNV.suaNV(tk, nv);
    setLocalStorage("DSNV", DSNV.DS);
    hienthiDanhsachNhanvien(DSNV.DS);
  }
}

function checkValidation(tk, name, email, pass, startdate, sal, workingTime) {
  var thongbao_tk = "tbTKNV";
  var thongbao_name = "tbTen";
  var thongbao_email = "tbEmail";
  var thongbao_pass = "tbMatkhau";
  var thongbao_startdate = "tbNgay";
  var thongbao_salary = "tbLuongCB";
  var thongbao_chucvu = "tbChucVu";
  var thongbao_wt = "tbGioLam";

  var checkInput = true;

  checkInput &=
    validatation.isEmpty(tk, "tbTKNV") &&
    validatation.isAvaiable(tk, DSNV.DS, "tbTKNV", "Tài khoản đã tồn tại");

  checkInput &=
    validatation.isEmpty(name, "tbTen") &&
    validatation.checkName(name, "tbTen", "Tên không hợp lệ");

  checkInput &=
    validatation.isEmpty(email, "tbEmail") &&
    validatation.checkMail(email, "tbEmail", "Email không hợp lệ");

  checkInput &=
    validatation.isEmpty(pass, "tbMatKhau") &&
    validatation.checkPass(pass, "tbMatKhau", "Password không hợp lệ");

  checkInput &=
    validatation.isEmpty(startdate, "tbNgay") &&
    validatation.checkDate(startdate, "tbNgay", "Ngày không hợp lệ");

  checkInput &=
    validatation.isEmpty(sal, "tbLuongCB") &&
    validatation.limitNumber(
      sal,
      "tbLuongCB",
      "Lương không hợp lệ",
      20000000,
      1000000
    );

  checkInput &= validatation.checkDuty(
    getEle("chucvu").selectedIndex,
    "tbChucVu",
    "Hãy chọn chức vụ"
  );

  checkInput &=
    validatation.isEmpty(workingTime, "tbGiolam") &&
    validatation.limitNumber(
      workingTime,
      "tbGiolam",
      "Thời gian làm việc không hợp lệ",
      200,
      80
    );

  if (checkInput == 1) return true;
  return false;
}

function updateCheckValidation(name, email, startdate, sal, workingTime) {
  var thongbao_name = "tbTen";
  var thongbao_email = "tbEmail";
  var thongbao_startdate = "tbNgay";
  var thongbao_salary = "tbLuongCB";
  var thongbao_chucvu = "tbChucVu";
  var thongbao_wt = "tbGioLam";

  var checkInput = true;

  checkInput &=
    validatation.isEmpty(name, "tbTen") &&
    validatation.checkName(name, "tbTen", "Tên không hợp lệ");

  checkInput &=
    validatation.isEmpty(email, "tbEmail") &&
    validatation.checkMail(email, "tbEmail", "Email không hợp lệ");

  checkInput &=
    validatation.isEmpty(startdate, "tbNgay") &&
    validatation.checkDate(startdate, "tbNgay", "Ngày không hợp lệ");

  checkInput &=
    validatation.isEmpty(sal, "tbLuongCB") &&
    validatation.limitNumber(
      sal,
      "tbLuongCB",
      "Lương không hợp lệ",
      20000000,
      1000000
    );

  checkInput &= validatation.checkDuty(
    getEle("chucvu").selectedIndex,
    "tbChucVu",
    "Hãy chọn chức vụ"
  );

  checkInput &=
    validatation.isEmpty(workingTime, "tbGiolam") &&
    validatation.limitNumber(
      workingTime,
      "tbGiolam",
      "Thời gian làm việc không hợp lệ",
      200,
      80
    );

  if (checkInput == 1) return true;
  return false;
}

function search() {
  var keyword = getEle("searchName").value;
  hienthiDanhsachNhanvien(DSNV.searchName(keyword));
}

getEle("btnThemNV").onclick = laythongtinNhanVien;
getEle("btnCapNhat").onclick = updateNV;
getEle("btnThem").onclick = function () {
  getEle("tknv").disabled = false;
  getEle("password").disabled = false;
  var thongbao = document.getElementsByClassName("sp-thongbao");
  for (var i = 0; i < thongbao.length; i++) {
    thongbao[i].innerHTML = "";
    thongbao[i].style = "display: none";
  }
  document.querySelector(".modal-body form").reset();
};
getEle("btnTimNV").onclick = search;
getEle("searchName").onkeyup = search;
