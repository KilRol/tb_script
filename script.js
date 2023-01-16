async function getJSON(url) {
  const request = await fetch(url);
  return await request.json();
}

function fillThead() {
  const thead = document.createElement("thead");
  const names = [
    "Место",
    "Команда",
    "И",
    "В",
    "П",
    "%",
    "Забито",
    "Пропущено",
    "+/-",
    "Очки",
  ];

  const ths = Array.from(Array(names.length), (x, index) => {
    const th = document.createElement("th");
    th.innerText = names[index];
    return th;
  });

  const tr = ths.reduce((tr, cur) => {
    tr.appendChild(cur);
    return tr;
  }, document.createElement("tr"));
  thead.appendChild(tr);
  return thead;
}

function getTbody(json) {
  console.log("JSON", json);
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
    tds[2].innerText = res.games;
    tds[3].innerText = res.win;
    tds[4].innerText = res.lose;
    tds[5].innerText = Math.round(res.percent * 100);
    tds[6].innerText = res.clogged;
    tds[7].innerText = res.missed;
    tds[8].innerText = res.diff;
    tds[9].innerText = res.score;
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
function getResults(results) {
  const json = {};

  results.forEach((item) => {
    if (json[item.team1]) {
      if (item.score1 > item.score2) {
        json[item.team1].score += 2;
      } else {
        json[item.team1].score += 1;
      }
      if (item.team1 && item.team2) {
        json[item.team1].games += 1;
      }
      if (item.score1 > item.score2) {
        json[item.team1].win += 1;
      }
      if (item.score1 < item.score2) {
        json[item.team1].lose += 1;
      }
      json[item.team1].percent = json[item.team1].win / json[item.team1].games;

      json[item.team1].diff += item.score1 - item.score2;
      json[item.team1].clogged += item.score1;
      json[item.team1].missed += item.score2;
    } else {
      json[item.team1] = {
        name: item.team1,
        score: item.score1 ? (item.score1 > item.score2 ? 2 : 1) : 0,
        img: item.img,
        location: item.location,
        games: item.team1 && item.team2 ? 1 : 0 || 0,
        win: item.score1 > item.score2 ? 1 : 0 || 0,
        lose: item.score1 < item.score2 ? 1 : 0 || 0,
        percent: item.score1 > item.score2 ? 100 : 0 || 0,
        diff: item.score1 - item.score2 || 0,
        clogged: item.score1 || 0,
        missed: item.score2 || 0,
      };
    }
    if (json[item.team2]) {
      if (item.score2 > item.score1) {
        json[item.team2].score += 2;
      } else {
        json[item.team2].score += 1;
      }
      if (item.team1 && item.team2) {
        json[item.team2].games += 1;
      }
      if (item.score2 > item.score1) {
        json[item.team2].win += 1;
      }
      if (item.score2 < item.score1) {
        json[item.team2].lose += 1;
      }
      json[item.team2].percent = json[item.team2].win / json[item.team2].games;

      json[item.team2].diff += item.score2 - item.score1;
      json[item.team2].clogged += item.score2;
      json[item.team2].missed += item.score1;
    } else if (item.team2) {
      json[item.team2] = {
        name: item.team2,
        score: item.score2 > item.score1 ? 2 : 1 || 0,
        img: item.img,
        location: item.location,
        games: item.team1 && item.team2 ? 1 : 0,
        win: item.score2 > item.score1 ? 1 : 0 || 0,
        lose: item.score2 < item.score1 ? 1 : 0 || 0,
        percent: item.score2 > item.score1 ? 100 : 0 || 0,
        diff: item.score2 - item.score1 || 0,
        clogged: item.score2 || 0,
        missed: item.score1 || 0,
      };
    }
  });
  return json;
}

function getTable(results) {
  const tableWrapper = document.createElement("div");
  tableWrapper.classList = "table-wrap";

  const table = document.createElement("table");

  table.classList = "results__table table-main";

  const thead = fillThead();

  const jsonedResult = getResults(results);

  const tbody = getTbody(jsonedResult);

  table.appendChild(thead);
  console.log(tbody.children);
  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  return tableWrapper;
}

function getGridThead(json) {
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

function getJSONGrid(results) {
  return results.reduce((acc, item) => {
    if (!acc[item.team1]) {
      acc[item.team1] = {};
    }
    if (item.team1 && item.team2) {
      if (acc[item.team1][item.team2] || acc[item.team2][item.team1]) {
        alert(`${item.team1}:${item.team2} duplicate`);
      }
      acc[item.team1][item.team2] = [item.score1, item.score2];
      acc[item.team2][item.team1] = [item.score2, item.score1];
    }
    return acc;
  }, {});
}

function getGridTbody(results) {
  const tbody = document.createElement("tbody");
  const json = getJSONGrid(results);
  const jsonedResult = getResults(results);
  console.log(json);
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

  for (const key1 of Object.keys(json)) {
    for (const key2 of Object.keys(json[key1])) {
      console.log(json[key1][key2]);
    }
  }
  console.log(json);

  return tbody;
}

async function printElement() {
  const root = document.querySelector("#root");

  const main = document.createElement("div");

  const results = await getJSON("mdbl2013_score.json");
  // const results = await getJSON("mdbl2011_score.json");
  const jsonedResult = getResults(results);

  const table = getTable(results);

  const show_btn = document.createElement("div");
  show_btn.classList = "results__item-more-wrap";

  const show_btn_link = document.createElement("a");
  show_btn_link.classList = "results__item-more";
  show_btn_link.href = "javascript:void(0);";
  show_btn_link.textContent = "Результаты матчей";

  show_btn.appendChild(show_btn_link);

  main.appendChild(table);
  main.appendChild(show_btn);

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
  main.appendChild(grid);

  main.style.display = "flex";
  main.style.flexDirection = "column";
  main.style.justifyContent = "space-between";
  root.appendChild(main);

  const textMain = document.createElement("textarea");
  textMain.innerText = main.innerHTML;
  textMain.cols = 40;
  textMain.style.height = "400px";
  main.appendChild(textMain);
}

printElement();
