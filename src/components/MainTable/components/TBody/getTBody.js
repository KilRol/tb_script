export function getTbody(json) {
  const trs = [];

  for (const res of Object.values(json)) {
    const tds = Array.from(Array(10), () => document.createElement("td"));
    const name_table = document.createElement("table");
    name_table.border = 1;
    name_table.cellPadding = 1;
    name_table.cellSpacing = 1;
    name_table.classList = "inner-table";
    const name_tr = document.createElement("tr");
    const name_td = document.createElement("td");
    const name_b = document.createElement("b");
    name_b.innerText = res.name;
    name_td.appendChild(name_b);
    name_tr.appendChild(name_td);
    const location_tr = document.createElement("tr");
    const location_td = document.createElement("td");
    location_td.innerText = res.location || "";
    location_tr.appendChild(location_td);
    name_table.appendChild(name_tr);
    name_table.appendChild(location_tr);
    const img = document.createElement("img");
    img.src = res.img;
    img.width = 120;
    img.height = 120;
    if (res.img) {
      tds[1].appendChild(img);
    }
    tds[1].appendChild(name_table);
    tds[2].innerText = Number(res.games);
    tds[3].innerText = Number(res.win);
    tds[4].innerText = Number(res.lose);
    tds[5].innerText = +(Math.round(res.percent * 100 + "e+1") + "e-1");
    tds[6].innerText = Number(res.clogged);
    tds[7].innerText = Number(res.missed);
    tds[8].innerText = Number(res.diff);
    tds[9].innerText = Number(res.score);
    const tr = tds.reduce((tr, cur) => {
      tr.appendChild(cur);
      return tr;
    }, document.createElement("tr"));
    trs.push(tr);
  }

  trs.sort(
    (a, b) =>
      b.children[9].textContent - a.children[9].textContent ||
      b.children[8].textContent - a.children[8].textContent
  );

  trs.forEach((item, index) => {
    item.children[0].innerText = index + 1;
  });

  const tbody = trs.reduce((tbody, cur) => {
    tbody.appendChild(cur);
    return tbody;
  }, document.createElement("tbody"));

  return tbody;
}
