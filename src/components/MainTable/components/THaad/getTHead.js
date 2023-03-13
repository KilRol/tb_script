export function fillThead() {
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