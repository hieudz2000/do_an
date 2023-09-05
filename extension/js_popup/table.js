const dataArray = [
  { link: "Link 1", time: "Time 1" },
  { link: "Link 2", time: "Time 2" },
  { link: "Link 3", time: "Time 2" },
  { link: "Link 4", time: "Time 2" },
  { link: "Link 5", time: "Time 2" },
  { link: "Link 6", time: "Time 2", block: "yes" },
  { link: "Link 7", time: "Time 2" },
  { link: "Link 8", time: "Time 2" },
  { link: "Link 9", time: "Time 2" },
  { link: "Link 11", time: "Time 2" },
  { link: "Link 12", time: "Time 2" },
  { link: "Link 22", time: "Time 2" },
  { link: "Link 22", time: "Time 2" },
  { link: "Link 32", time: "Time 2" },
  { link: "Link 42", time: "Time 2" },
  { link: "Link 52", time: "Time 2" },

  { link: "Link 100", time: "Time 100" },
];

// var itemsPerPage = 8;

// Tính số trang
// var totalPages = Math.ceil(dataArray.length / itemsPerPage);

// Hiển thị dữ liệu trên từng trang
function displayData(pageNumber, data, itemsPerPage) {
  var startIndex = (pageNumber - 1) * itemsPerPage;
  var endIndex = startIndex + itemsPerPage;
  var currentPageData = data.slice(startIndex, endIndex);

  var tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  currentPageData.forEach(function (item) {
    var row = document.createElement("tr");
    var linkCell = document.createElement("td");
    var timeCell = document.createElement("td");
    var block = document.createElement("td");
    linkCell.textContent = item.link;
    timeCell.textContent = item.time;
    block.textContent = item.block ? item.block : "";
    row.appendChild(linkCell);
    row.appendChild(timeCell);
    row.appendChild(block);
    tableBody.appendChild(row);
  });
}

// Tạo pagination
function createPagination(soPage, data, itemsPerPage) {
  var paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (var i = 1; i <= soPage; i++) {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    link.href = "#";
    link.textContent = i;

    link.addEventListener("click", function () {
      var pageNumber = parseInt(this.textContent);
      displayData(pageNumber, data, itemsPerPage);
    });

    listItem.appendChild(link);
    paginationContainer.appendChild(listItem);
  }
}

// Mặc định hiển thị trang đầu tiên
//   displayData(1);
//   createPagination();
export { createPagination, displayData, dataArray };
