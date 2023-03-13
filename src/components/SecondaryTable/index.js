import { getResultsTable } from "../ResultTable/index.js";
import { getJSON } from "../../utils/getJSON.js";

import { addStyles } from "../../utils/addStyles.js";
import { TABLE_WRAPPER_STYLES, TEXT_MAIN_STYLES, WRAPPER_STYLES } from "./styles.js";

export async function getSecondaryTable(url) {
    const results = await getJSON(url);

    const resultsTable = getResultsTable(results);

    const wrapper = document.createElement("div");
    addStyles(wrapper, WRAPPER_STYLES)

    const tableWrapper = document.createElement("div");
    addStyles(tableWrapper, TABLE_WRAPPER_STYLES);
    tableWrapper.appendChild(resultsTable);

    const textMain = document.createElement("textarea");
    addStyles(textMain, TEXT_MAIN_STYLES)

    textMain.innerText = tableWrapper.innerHTML;

    wrapper.appendChild(tableWrapper);
    wrapper.appendChild(textMain);

    return wrapper;
}