function DanhSachNhanVien() {
  this.DS = [];
  this.themNV = function (nv) {
    this.DS.push(nv);
  };
  this.timNV = function (tk) {
    var vitri = -1;
    this.DS.map(function (nv, index) {
      if (nv.tk == tk) {
        vitri = index;
      }
    });
    return vitri;
  };
  this.xoaNV = function (tk) {
    var vitri = this.timNV(tk);
    if (vitri > -1) {
      this.DS.splice(vitri, 1);
    } else console.log("Không tìm thấy dữ liệu");
  };
  this.suaNV = function (tk, nhanvien) {
    var vitri = this.timNV(tk);
    console.log(vitri);
    if (vitri > -1) {
      this.DS[vitri] = nhanvien;
    } else console.log("Không tìm thấy dữ liệu");
  };
}

DanhSachNhanVien.prototype.searchName = function (kw) {
  var tempArr = [];
  var key = kw.trim().toLowerCase();
  this.DS.map(function (nv) {
    var loai = nv.type.toLowerCase();
    if (loai.indexOf(key) > -1) {
      tempArr.push(nv);
    }
  });
  return tempArr;
};
