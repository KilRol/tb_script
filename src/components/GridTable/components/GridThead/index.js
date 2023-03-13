export function getGridThead(json) {
  const tr = Object.keys(json).reduce((acc, cur) => {
    const tr = document.createElement("th");
    tr.innerText = cur;
    acc.appendChild(tr);
    return acc;
  }, document.createElement("tr"));
  tr.insertBefore(document.createElement("th"), tr.children[0]);
  tr.insertBefore(document.createElement("th"), tr.children[0]);
  const thead = document.createElement("thead");
  thead.appendChild(tr);
  return thead;
}