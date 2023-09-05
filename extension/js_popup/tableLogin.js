// const loginHistory = [
//     { time: "2023-07-26 11:50" },
//     { time: "2023-07-27 7:34" },
//     { time: "2023-07-27 08:05" },
//     // Add more login history data here...
//   ];

  const rowsPerPage = 10;
  let currentPage = 1;

  function renderTable(data, rowsPerPage, currentPage) {
    const tableBody = document.querySelector("#login-history-table tbody");
    tableBody.innerHTML = "";

    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const currentPageData = data.slice(startIdx, endIdx);

    currentPageData.forEach((item) => {
      const row = document.createElement("tr");
      const timeCell = document.createElement("td");

      timeCell.textContent = item.time;

      row.appendChild(timeCell);
      tableBody.appendChild(row);
    });
  }

  function renderPagination(data, rowsPerPage, currentPage) {
    const paginationContainer = document.querySelector("#pagination-login");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(data.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("span");
      pageButton.classList.add("pagination-button");
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        renderTable(data, rowsPerPage, currentPage);
        renderPagination(data, rowsPerPage, currentPage);
      });
      paginationContainer.appendChild(pageButton);
    }
  }

  // renderTable(loginHistory, rowsPerPage, currentPage);
  // renderPagination(loginHistory, rowsPerPage, currentPage);
  export {renderTable,renderPagination }