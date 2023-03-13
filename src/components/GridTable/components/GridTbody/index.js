import { getJSONGrid } from "../../utils/getJSONGrid.js";
import { getResults } from "../../../MainTable/utils/getResults.js";

export function getGridTbody(results) {
  const tbody = document.createElement("tbody");
  const json = getJSONGrid(results);
  const jsonedResult = getResults(results);
  Object.keys(jsonedResult).forEach((key1, index) => {
    const tr = document.createElement("tr");
    const pos_td = document.createElement("td");
    pos_td.innerText = index + 1;
    const name_td = document.createElement("td");
    const name_b = document.createElement("b");
    name_b.innerText = key1;
    name_td.appendChild(name_b);
    tr.appendChild(pos_td);
    tr.appendChild(name_td);
    Object.keys(jsonedResult).forEach((key2) => {
      const td = document.createElement("td");
      if (key1 === key2) {
        const img = document.createElement("img");
        img.src = jsonedResult[key1].img;
        img.width = 120;
        img.height = 120;
        td.appendChild(img);
      } else {
        const arr = json[key1][key2];
        if (arr) {
          const [l, r] = arr;
          const span = document.createElement("span");
          span.innerText = `${l}:${r}`;
          if (l > r) {
            span.style.color = "red";
          }
          td.appendChild(span);
        } else {
          td.innerText = "0:0";
        }
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  return tbody;
}