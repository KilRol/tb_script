export function getJSONGrid(results) {
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