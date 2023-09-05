// const handle = () => {
//   console.log("click new");
//   chrome.runtime.sendMessage(
//     {
//       action: "click-bt",
//       message: "Button clicked",
//     },
//     (response) => {
//       console.log(response);
//     }
//   );
// };
// var a = document.getElementById("bt-login");
// a.addEventListener("click", handle);
const login = () => {
  var x = document.getElementById("userName").value;
  console.log("user name: ", x);
  var y = document.getElementById("userPass").value;

  console.log("user pass: ", y);
};
var b = document.getElementById("login");
const submitHandle = () => {
  var x = document.getElementById("userName").value;
  console.log("user name: ", x);
  var y = document.getElementById("userPass").value;

  console.log("user pass: ", y);
  //   http://127.0.0.1:8000/login/?userName=usser1&&pass=pass11
  const url = "http://127.0.0.1:8000/login"; // Đường dẫn của API endpoint
  const data = {
    userName: x,
    pass: y,
  };
  async function logJSONData() {
    const response = await fetch(
      "http://127.0.0.1:1234/login/?userName=" + x + "&&pass=" + y,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData.status);
   

    check = jsonData.status
    if(check){
      console.log(jsonData.token);
      chrome.storage.local.set({ daAnToken: jsonData.token });
      chrome.windows.getCurrent(function(window) {
        chrome.windows.remove(window.id);
      });
    }
    else{
      console.log(jsonData.mess)
    }
    // var data = JSON.parse(jsonData);
  }
  logJSONData();
};
b.addEventListener("click", submitHandle);


// chuyen giua login la sign up
var login_bt = document.getElementById("su-text")

function signUpScreen(x, y){
 
  var a = document.getElementById(x);
  var b = document.getElementById(y);
  console.log("aaa", a);
  a.style.display = "block";
  b.style.display = "none";
}

login_bt.addEventListener("click",function(){
  signUpScreen("screen-sign", "screen-login")
} );

var signUp_bt = document.getElementById("login-text");
signUp_bt.addEventListener("click", function(){
  signUpScreen("screen-login", "screen-sign")
} )

// dang ki, r tra ve token luu vao 

var signUp = document.getElementById("sign-up");

const  sign = ()=>{
  var username  = document.getElementById("userNameDK").value
  var pass =  document.getElementById("userPassDK").value
  var email = document.getElementById("gmail").value
  async function logJSONData() {
    const response = await fetch(
      "http://127.0.0.1:1234/sign-up/?name=" + username + "&&pass=" + pass +"&&email="+email,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const jsonData = await response.json();
    check = jsonData.status
    if(check){
      console.log(jsonData.token);
      chrome.storage.local.set({ daAnToken: jsonData.token });
      chrome.windows.getCurrent(function(window) {
        chrome.windows.remove(window.id);
      });
    }
    }
    logJSONData()

}

signUp.addEventListener("click", sign)

