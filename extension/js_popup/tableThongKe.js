const historyData = [
  {
    time: "2023-07-27",
    linkCount: 2,
    links: ["https://vlxyz.tv/", "https://truyensextv.me/"],
  },
 

  // Add more history data here...
];

const rowsPerPage = 3;
let currentPage = 1;

function renderTable(data) {
  const tableBody = document.querySelector("#history-table tbody");
  tableBody.innerHTML = "";

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const currentPageData = data.slice(startIdx, endIdx);

  currentPageData.forEach((item) => {
    const row = document.createElement("tr");
    const timeCell = document.createElement("td");
    const linkCountCell = document.createElement("td");
    const linkCell = document.createElement("td");

    timeCell.textContent = item.time;
    linkCountCell.textContent = item.linkCount;

    const linksList = document.createElement("ul");
    item.links.forEach((link) => {
      const linkItem = document.createElement("li");
      linkItem.textContent = link;
      linksList.appendChild(linkItem);
    });

    linkCell.appendChild(linksList);
    row.appendChild(timeCell);
    row.appendChild(linkCountCell);
    row.appendChild(linkCell);
    tableBody.appendChild(row);
  });
}

function renderPagination(data) {
  const paginationContainer = document.querySelector("#pagination-thongke");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(data.length / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      renderTable(data);
      renderPagination(data);
    });
    paginationContainer.appendChild(pageButton);
  }
}

renderTable(historyData);
renderPagination(historyData);
