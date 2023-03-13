export function getResults(results) {
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