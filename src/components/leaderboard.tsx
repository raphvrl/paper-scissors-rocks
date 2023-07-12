
// a player in the leaderboard
export function addInLeaderBoard(name : string, strLeaderboard : string) {
    let leaderboard = JSON.parse(strLeaderboard)
    leaderboard[name] = 0
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard))
}

// create new leaderboard
export function createNewLeaderboard(name: string) {
    const newScore = 0
    const leaderboard = {[name] : newScore}
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard))
}

// create the list to render the leaderboard
export function createRenderLeaderboard() {
    const strLeaderboard = localStorage.getItem("leaderboard")
    if (strLeaderboard === null)
      return

    const leaderboard = JSON.parse(strLeaderboard)
    let data = []
    let tmp = []

    for (let name in leaderboard)
      data.push({"name" : name, "value" : leaderboard[name]})

    data.sort((second, first) => {return first.value - second.value})
    for (let i = 0; i < data.length && i < 10; i++)
      tmp.push((i + 1) + ". " + data[i].name + " : " + data[i].value)

    return tmp.map((item, index) => <li 
      key={index} 
      className="bolde border-4 px-2"
      >{item}</li>)
}