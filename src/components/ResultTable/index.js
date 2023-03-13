import { getCard } from "../Card/getCard.js";
import { makeDate } from "../../utils/makeDate.js";

export function getResultsTable(results) {
    const sortedResult = results.filter((item) => item.team2).sort((a, b) => {
        const ad = makeDate(a.date, a.time);
        const bd = makeDate(b.date, b.time);
        return Date.parse(ad) - Date.parse(bd);
    })

    const wrapper = sortedResult.reduce((acc, item) => {
        acc.appendChild(getCard(item));
        return acc;
    }, document.createElement("div"));

    return wrapper;
}