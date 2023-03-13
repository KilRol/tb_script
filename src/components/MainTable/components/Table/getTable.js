import { fillThead } from "../THaad/getTHead.js";
import { getResults } from "../../utils/getResults.js";
import { getTbody } from "../TBody/getTBody.js";

export function getTable(results) {
    const tableWrapper = document.createElement("div");
    tableWrapper.classList = "table-wrap";

    const table = document.createElement("table");

    table.classList = "results__table table-main";

    const thead = fillThead();

    const jsonedResult = getResults(results);

    const tbody = getTbody(jsonedResult);

    table.appendChild(thead);
    table.appendChild(tbody);
    tableWrapper.appendChild(table);
    return tableWrapper;
}