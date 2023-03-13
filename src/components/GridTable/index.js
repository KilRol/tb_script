import { getGridThead } from "./components/GridThead/index.js";
import { getGridTbody } from './components/GridTbody/index.js'

export function GridTable(results, jsonedResult) {
    const grid = document.createElement("div");
    grid.classList = "table-wrap collapse-item__body";
    grid.style.display = "none";

    const gridTable = document.createElement("table");
    gridTable.classList = "results__table-full table-hide";
    const gridTableThead = getGridThead(jsonedResult);
    const gridTableTbody = getGridTbody(results);

    gridTable.appendChild(gridTableThead);
    gridTable.appendChild(gridTableTbody);
    grid.appendChild(gridTable);
    return grid;
}