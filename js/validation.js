function Valiadation() {
  this.isEmpty = function (value, spanID) {
    if (value.trim() != "") {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style = "display: none";
      return true;
    }
    document.getElementById(spanID).innerHTML = "Dữ liệu bị trống";
    document.getElementById(spanID).style = "display: block";
    return false;
  };

  this.isAvaiable = function (value, mangNV, spanID, alert) {
    var check = 0;
    mangNV.map(function (nv) {
      if (nv.tk == value) {
        check = 1;
      }
    });
    if (check == 0) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style = "display: none";
      return true;
    }
    document.getElementById(spanID).innerHTML = alert;
    document.getElementById(spanID).style = "display: block";
    return false;
  };

  this.checkPattern = function (value, spanID, alert, pattern) {
    if (value.match(pattern)) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style = "display: none";
      return true;
    }
    document.getElementById(spanID).innerHTML = alert;
    document.getElementById(spanID).style = "display: block";
    return false;
  };

  this.checkName = function (value, spanID, alert) {
    var pattern = new RegExp(
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$"
    );
    return this.checkPattern(value, spanID, alert, pattern);
  };

  this.checkMail = function (value, spanID, alert) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return this.checkPattern(value, spanID, alert, pattern);
  };

  this.checkPass = function (value, spanID, alert) {
    var pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    return this.checkPattern(value, spanID, alert, pattern);
  };

  this.checkDate = function (value, spanID, alert) {
    var pattern =
      /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

    return this.checkPattern(value, spanID, alert, pattern);
  };

  this.limitNumber = function (value, spanID, alert, max, min) {
    if (value <= max && value >= min) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style = "display: none";
      return true;
    }
    document.getElementById(spanID).innerHTML = alert;
    document.getElementById(spanID).style = "display: block";
    return false;
  };

  this.checkDuty = function (value, spanID, alert) {
    if (value != 0) {
      document.getElementById(spanID).innerHTML = "";
      document.getElementById(spanID).style = "display: none";
      return true;
    }
    document.getElementById(spanID).innerHTML = alert;
    document.getElementById(spanID).style = "display: block";
    return false;
  };
}
