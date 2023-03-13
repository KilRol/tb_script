import { makeDate } from "../../utils/makeDate.js";
import { DEFAULT_IMG, DEFAULT_TITLE } from "../../common/consts.js";

export function getCard(item) {
  const card = document.createElement("div");
  card.classList = 'cup-tver_game_container active'

  const gameInfo = document.createElement('div')
  gameInfo.className = 'cup-tver_game_info'

  const cupTitle = document.createElement('h4')
  cupTitle.innerText = item.title || DEFAULT_TITLE
  gameInfo.appendChild(cupTitle)

  if (!!item.date || !!item.time) {
    const date = document.createElement("p");
    const d = new Date(makeDate(item.date, item.time))
    date.innerText = d.toLocaleString('ru').slice(0, -3);
    gameInfo.appendChild(date)
  }

  const game = document.createElement('div')
  game.className = 'cup-tver_game'

  const teamName1 = document.createElement("div");
  teamName1.className = 'cup-tver_team_name'
  teamName1.innerText = item.team1;

  const teamName2 = document.createElement("div");
  teamName2.className = 'cup-tver_team_name'
  teamName2.innerText = item.team2;

  const score = document.createElement("div");
  score.className = 'cup-tver_result'
  score.innerText = `${item.score1}:${item.score2}`;

  const teamLogo1 = document.createElement('div')
  teamLogo1.className = 'cup-tver_team'

  const teamLogo1Img = document.createElement('img')
  teamLogo1Img.src = item.img || DEFAULT_IMG
  teamLogo1Img.width = 120
  teamLogo1Img.height = 120
  teamLogo1.appendChild(teamLogo1Img)

  const teamLogo2 = document.createElement('div')
  teamLogo2.className = 'cup-tver_team'

  const teamLogo2Img = document.createElement('img')
  teamLogo2Img.src = item.img || DEFAULT_IMG
  teamLogo2Img.width = 120
  teamLogo2Img.height = 120
  teamLogo2.appendChild(teamLogo2Img)

  game.appendChild(teamLogo1)
  game.appendChild(teamName1)
  game.appendChild(score);
  game.appendChild(teamName2)
  game.appendChild(teamLogo2)

  card.appendChild(gameInfo)
  card.appendChild(game)

  return card;
}