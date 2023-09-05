// const links = [
//     "https://viettan.org/",
//     "phim sex",
//     "loạn luân",
//     "https://truyensextv.me/",
//   ];
  
//   function createLinkItem(link, index) {
//     const linkItem = document.createElement("div");
//     linkItem.classList.add("link-item");
  
//     const linkElement = document.createElement("a");
//     linkElement.href = link;
//     linkElement.textContent = links[index];
//     linkItem.appendChild(linkElement);
  
//     const deleteIcon = document.createElement("span");
//     deleteIcon.classList.add("delete-icon");
//     deleteIcon.textContent = "❌";
//     deleteIcon.addEventListener("click", () => {
//       deleteLink(index);
//     });
//     linkItem.appendChild(deleteIcon);
  
//     return linkItem;
//   }
  
//   function deleteLink(index) {
//     links.splice(index, 1);
//     updateLinkList();
//   }
  
//   function updateLinkList() {
//     const linkList = document.getElementById("linkList");
//     linkList.innerHTML = "";
  
//     for (let i = 0; i < links.length; i++) {
//       const linkItem = createLinkItem(links[i], i);
//       linkList.appendChild(linkItem);
//     }
//   }
  

//   updateLinkList();
const links = [
  "https://viettan.org/",
  "phim sex",
  "loạn luân",
  "https://truyensextv.me/",
  "https://example.com",
  "https://example.com1",
  "https://example.com2",
  "https://example.com3",
  "https://example.com4",
  "https://example.com5",
  "https://example.com6",
  "https://example.com7",
  "https://example.com8",
  "https://example.com9",
  "https://example.com0",

  // Add more links here...
];

// const linksPerPage = 5; // Số lượng liên kết hiển thị trên mỗi trang.
// let currentPage = 1; // Trang hiện tại.

  function createLinkItem( dataListLink,index, linksPerPage, currentPage, token) {
    const linkItem = document.createElement("div");
    var content = '';
    if(dataListLink[index]?.text){
      linkItem.classList.add("text-item");
      content = dataListLink[index]?.text
    }
    else{
      linkItem.classList.add("link-item");
      content = dataListLink[index]?.dataLink
    }
   
    
    const linkElement = document.createElement("a");
    // linkElement.href = link;
    linkElement.textContent = content;
    linkItem.appendChild(linkElement);
  
    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.textContent = "❌";
    deleteIcon.addEventListener("click", () => {
      deleteLink(index, dataListLink,  linksPerPage, currentPage, token);
    });
    linkItem.appendChild(deleteIcon);
  
    return linkItem;
  }

  async function removeLinkOrText(token, dt) {
    var a ="";
    if(dt?.text){
      a = "text="+dt?.text
    }else{
      a = "link="+dt?.dataLink
    }

    console.log("token: ", token);
    const response = await fetch(
      "http://127.0.0.1:1234/remove/?"+a,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        mode: "cors"
      }
    );
    const jsonData = await response.json();
    console.log("kq", jsonData);
    
  
  
    // var data = JSON.parse(jsonData);
    // console.log("dataaaaaaaaa", data)
    // if(data.check == "block"){
    //   document.body.innerHTML = a;
    // }
    // console.log("check", data.check);
    // console.log("jsonDatasss", data);
  }

function deleteLink(index, dataListLink, linksPerPage, currentPage, token) {
  console.log("link: ", dataListLink[index])
  removeLinkOrText(token,dataListLink[index])
  dataListLink.splice(index, 1);
  updateLinkList(dataListLink, linksPerPage, currentPage,token);
}

function updateLinkList(dataListLink, linksPerPage, currentPage, token) {
  const linkList = document.getElementById("linkList");
  linkList.innerHTML = "";

  // Tính chỉ số bắt đầu và kết thúc của các liên kết được hiển thị trên trang hiện tại.
  const startIndex = (currentPage - 1) * linksPerPage;
  const endIndex = Math.min(startIndex + linksPerPage, dataListLink.length);

  for (let i = startIndex; i < endIndex; i++) {
    const linkItem = createLinkItem(dataListLink, i, linksPerPage, currentPage, token);
    linkList.appendChild(linkItem);
  }

  // Tạo các nút phân trang.
  const totalPages = Math.ceil(dataListLink.length / linksPerPage);
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  for (let page = 1; page <= totalPages; page++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = page;
    pageButton.addEventListener("click", () => {
      currentPage = page;
      updateLinkList(dataListLink, linksPerPage, currentPage, token);
    });
    paginationContainer.appendChild(pageButton);
  }
}

export {updateLinkList};

// updateLinkList(links);