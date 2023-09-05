import { createPagination, dataArray, displayData } from "./table.js";
import { updateLinkList } from "./listLink.js";
import {renderTable,renderPagination} from "./tableLogin.js"

// chrome.browserAction.onClicked.addListener(function (tab) {
//   // Gửi yêu cầu tới trang web để hiển thị model
//   chrome.tabs.sendMessage(tab.id, { action: "showModel" });
// });

//1. check link r luu vao lich su

// chuc nang : test
const sendModal = () => {
  console.log("send Message");
  var aaaa;

  chrome.storage.local.get(["daAnToken"]).then((result) => {
    handleLoginButton(result);
  });
};
// ham nay check xem da co token chua, neu co roi thi thoi, hien log out, neu chua co thi hien trang login
const handleLoginButton = (result) => {
  var token = result.daAnToken;
  console.log("token: ", token);
  if (token != null) {
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });
    const contentId = `content-login`;
    async function logJSONData() {
      const response = await fetch(
        "http://127.0.0.1:1234/get-historyLogin" ,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const jsonData = await response.json();
      console.log("aaaa: ", jsonData)
      var check = jsonData.status;

      if (check) {
        // la ton tai token
        var a = document.getElementById("account");
        var bt = document.getElementById("divLog");
        if (!a) {
          console.log("vao day ko")
          var newDiv = document.createElement("h2");

          newDiv.textContent = "Account: " + jsonData.name;
          newDiv.id = "account";
          newDiv.style.padding = "10px";
          // Lấy phần tử cha cần chèn vào
          var parentElement = document.getElementById("logined");
          // console.log("aaaaaaa", parentElement)
          // Chèn thẻ div vào phần tử cha
          parentElement.insertBefore(newDiv, bt);
          console.log("name: ", jsonData.name);
          renderTable(jsonData.time, 5, 1);
          renderPagination(jsonData.time, 5, 1)

        }
        console.log("vao  ko")
      }
    }
    logJSONData();
    document.getElementById(contentId).classList.add("active");
  } else {
    chrome.windows.create({
      url: "new_window.html",
      type: "popup",
      width: 800,
      height: 800,
    });
  }
};
// chuc nang : logout : xoa token di4
// xoa het thong tin vd nhu history, logout

var log = document.getElementById("log-out");
function logOut() {
  chrome.storage.local.remove("daAnToken", function () {
    console.log("Đã xóa khóa daAnToken từ Local Storage");
  });
  //
  var element = document.getElementById("account");
  if (element) {
    element.remove();
  }
  var a = document.getElementById("no-login").style.display="block"
  var a = document.getElementById("logined").style.display="none"
}
log.addEventListener("click", logOut);

var modal = document.getElementById("showModelButton");
modal.addEventListener("click", sendModal);

// chuc nang : xu li noi dung cac tab

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.id;
    console.log("tab: ", tab.id);
    // Ẩn tất cả nội dung tab

    //
    document.querySelectorAll(".tab").forEach((content) => {
      content.classList.remove("br-top");
    });
    document.getElementById(tab.id).classList.add("br-top");

    // Hiển thị nội dung tab tương ứng
    if (tab.id != "showModelButton") {
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });
      const contentId = `content-${tabId}`;
      console.log("content: ", contentId);
      document.getElementById(contentId).classList.add("active");
    }
  });
});

// chuc nang : them link, text
// check xem co the add link hoac add text duoc ko
// sau do gui ben server
// add-link?link=

async function addLinkBackEnd(token) {
  console.log("token: ", token);
  var x = document.getElementById("input-add-link").value;
  const response = await fetch("http://127.0.0.1:1234/add-link/?link=" + x, {
    // method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      // "X-CSRFToken":  token
    },
  });
  const jsonData = await response.json();
  check = jsonData.status;

  if (check == 1) {
    // la ton tai token
    console.log("them thanh cong");
  } else {
    console.log("false: ", jsonData);
  }
}

var add_link = document.getElementById("id-input");
const addLink = () => {
  chrome.storage.local.get(["daAnToken"]).then((result) => {
    addLinkBackEnd(result.daAnToken);
  });
};
add_link.addEventListener("click", addLink);
// add text

var add_text = document.getElementById("bt-add");
async function addTextBackEnd(token) {
  console.log("token: ", token);
  var x = document.getElementById("input-text").value;
  const response = await fetch("http://127.0.0.1:1234/add-text/?text=" + x, {
    // method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      // "X-CSRFToken":  token
    },
  });
  const jsonData = await response.json();
  var check = jsonData.status;

  if (check == 1) {
    // la ton tai token
    console.log("them thanh cong");
  } else {
    console.log("false: ", jsonData);
  }
}
const addText = () => {
  chrome.storage.local.get(["daAnToken"]).then((result) => {
    addTextBackEnd(result.daAnToken);
  });
};
add_text.addEventListener("click", addText);

// chuc nang : in lich su

var history_bt = document.getElementById("history");
async function getHistory(token) {
  console.log("token: ", token);

  var a = document.getElementById("table-history");
  var b = document.getElementById("history-no-login");
  if (token) {
    b.style.display = "none";
    var itemsPerPage = 8;
    const response = await fetch("http://127.0.0.1:1234/get-history/", {
      // method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const jsonData = await response.json();
    console.log("aaa: ", jsonData);
    var c = Math.ceil(jsonData.length / itemsPerPage);
    displayData(1, jsonData, itemsPerPage);

    createPagination(c, jsonData, itemsPerPage);
    a.style.display = "block";
  } else {
    b.style.display = "block";
    a.style.display = "none";
  }
}

const handleHistory = () => {
  chrome.storage.local.get(["daAnToken"]).then((result) => {
    getHistory(result.daAnToken);
  });
};

history_bt.addEventListener("click", handleHistory);

// chuc nang : hien thi cac link voi text da duoc them
//chuc nang: hien thi noi dung setting
async function GetLinkAndText(token) {
  var a = document.getElementById("setting-login");
  var b = document.getElementById("setting-no-login");
  if (token) {
    b.style.display = "none"
    console.log("token: ", token);
    const response = await fetch("http://127.0.0.1:1234/get-link/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      mode: "cors",
    });
    const jsonData = await response.json();
    console.log("list", jsonData.list);
    console.log("text", jsonData.text);
    var totalArr = jsonData.list.concat(jsonData.text);
    console.log("arr: ", totalArr);

    updateLinkList(totalArr, 5, 1, token);
    a.style.display = "block";
  }
  else{
    b.style.display = "block"
    a.style.display = "none";
  }

  // var data = JSON.parse(jsonData);
  // console.log("dataaaaaaaaa", data)
  // if(data.check == "block"){
  //   document.body.innerHTML = a;
  // }
  // console.log("check", data.check);
  // console.log("jsonDatasss", data);
}

var setting_bt = document.getElementById("setting");

const handleSetting = () => {
  chrome.storage.local.get(["daAnToken"]).then((result) => {
    console.log("hieudz");
    GetLinkAndText(result.daAnToken);
  });
};
handleSetting();

setting_bt.addEventListener("click", handleSetting);
