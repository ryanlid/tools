function str(a) {
  function str1() {
    let s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return s[parseInt(Math.random() * s.length)];
  }
  function str2() {
    let s = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    return s[parseInt(Math.random() * s.length)];
  }
  function str3() {
    let s = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];
    return s[parseInt(Math.random() * s.length)];
  }
  function str4() {
    let s = [
      "~",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      "<",
      ">",
      ",",
      ".",
      ",",
      "\\",
      "|",
      "/",
      "*",
      "-",
      "+"
    ];
    return s[parseInt(Math.random() * s.length)];
  }
  // let a =[1,3,4]
  let i = parseInt(a[parseInt(Math.random() * a.length)]);
  switch (i) {
    case 1:
      return str1();
      break;
    case 2:
      return str2();
      break;
    case 3:
      return str3();
      break;
    case 4:
      return str4();
      break;
    default:
      return "";
  }
}

function gen(len, type) {
  var val = "";
  for (let i = 0; i < len; i++) {
    val += str(type);
  }

  return val;
}

function show() {
  let typeEl = document.forms["gen"].elements["str-type"];
  let type = Array.from(typeEl)
    .filter(function(val) {
      return val.checked === true;
    })
    .map(function(val) {
      return val.value;
    });

  let length = document.getElementById("pwd-length").value;
  document.getElementById("password-value").textContent = gen(length, type);
}
document.getElementById("pwd-length").addEventListener("input", function(e) {
  show();
});
let checkboxs = document.querySelectorAll('input[name="str-type"]');
for (let i = 0; i < checkboxs.length; i++) {
  checkboxs[i].addEventListener("change", function(e) {
    show();
  });
}
document.getElementById("regenerate").addEventListener("click", function() {
  show();
});
show();
