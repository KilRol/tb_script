import { getMainTable } from "./components/MainTable/getMainTable.js";
import { getSecondaryTable } from "./components/SecondaryTable/index.js";

const url = "./women.json"

async function printElement() {
  const root = document.getElementById("root");

  const main = await getMainTable(url);
  const secondary = await getSecondaryTable(url);
  root.appendChild(main);
  root.appendChild(secondary);
}

printElement();
