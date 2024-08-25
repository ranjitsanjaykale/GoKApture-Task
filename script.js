document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid-container");
    const searchInput = document.getElementById("search");
    const fontSizeSelect = document.getElementById("fontSize");
    const textAlignSelect = document.getElementById("textAlign");
    const rowsPerPage = 1000;
    let gridData = Array(1000).fill("");
    let history = [], historyIndex = -1;
    let currentPage = 0;

    function renderGrid() {
        gridContainer.innerHTML = "";
        const start = currentPage * rowsPerPage;
        const end = Math.min(start + rowsPerPage, gridData.length);

        for (let i = start; i < end; i++) {
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            const input = document.createElement("input");
            input.value = gridData[i];

            input.style.fontSize = fontSizeSelect.value;
            input.style.textAlign = textAlignSelect.value;
              

            input.addEventListener("input", () => {
                saveHistory();
                gridData[i] = input.value;
            });

            cell.appendChild(input);
            gridContainer.appendChild(cell);
        }
    }

    function saveHistory() {
        history = history.slice(0, historyIndex + 1);
        history.push([...gridData]);
        historyIndex++;
    }

    function undo() {
        if (historyIndex > 0) {
            gridData = history[--historyIndex];
            renderGrid();
        }
    }

    function redo() {
        if (historyIndex < history.length - 1) {
            gridData = history[++historyIndex];
            renderGrid();
        }
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        [...gridContainer.children].forEach(cell => {
            const input = cell.querySelector('input');
            cell.style.display = input.value.toLowerCase().includes(query) ? '' : 'none';
        });
    });

    fontSizeSelect.addEventListener("change", renderGrid);
    textAlignSelect.addEventListener("change", renderGrid);

    document.getElementById("undo").addEventListener("click", undo);
    document.getElementById("redo").addEventListener("click", redo);

    // document.getElementById("prev").addEventListener("click", () => {
    //     if (currentPage > 0) {
    //         currentPage--;
    //         renderGrid();
    //     }
    // });

    // document.getElementById("next").addEventListener("click", () => {
    //     if ((currentPage + 1) * rowsPerPage < gridData.length) {
    //         currentPage++;
    //         renderGrid();
    //     }
    // });

    renderGrid();
});