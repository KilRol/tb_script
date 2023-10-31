import { getJSON } from "../../utils/getJSON.js";
import { getResults } from "./utils/getResults.js";
import { getTable } from "./components/Table/getTable.js";
import { getGridTableButton } from "../GridTableButton/GridTableButton.js";
import { GridTable } from "../GridTable/index.js";

export async function getMainTable(url) {
  const tableWrapper = document.createElement("div");
  const results = await getJSON(url).then((res) =>
    res.filter((item) => item.score1 !== "-")
  );
  const jsonedResult = getResults(results);

  const expand = () => {
    tableWrapper.classList.add("collapse-item__active");
  };
  
  const table = getTable(results);
  const show_btn = getGridTableButton(expand);
  const grid = GridTable(results, jsonedResult);

  tableWrapper.appendChild(table);
  tableWrapper.appendChild(show_btn);
  tableWrapper.appendChild(grid);

  tableWrapper.style.width = "60%";
  tableWrapper.style.display = "flex";
  tableWrapper.style.flexDirection = "column";
  tableWrapper.style.justifyContent = "space-between";
  tableWrapper.style.alignItems = "center";

  const textMain = document.createElement("textarea");
  textMain.innerText = tableWrapper.innerHTML;
  textMain.style.width = "500px";
  textMain.style.height = "400px";

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "space-around";

  wrapper.appendChild(tableWrapper);
  wrapper.appendChild(textMain);

  return wrapper;
}
