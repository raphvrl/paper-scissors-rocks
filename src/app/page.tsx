"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"

export default function Home() {

  const renderLeaderboard = createLeaderboardList()

  // create a list to render teh leaderboard
  function createLeaderboardList() {
    const strLeaderboard = localStorage.getItem("leaderboard")
    if (strLeaderboard === null)
      return

    const leaderboard = JSON.parse(strLeaderboard)
    let data = []
    let tmp = []

    for (let name in leaderboard) {
      data.push({"name" : name, "value" : leaderboard[name]})
    }

    data.sort((second, first) => {return first.value - second.value})

    for (let i = 0; i < data.length && i < 10; i++) {
      tmp.push((i + 1) + ". " + data[i].name + " : " + data[i].value)
    }

    return tmp.map((item, index) => <li 
    key={index} 
    className="bolde border-4 px-2"
    >{item}</li>)
  }
  
  // localStorage.removeItem("leaderboard")

  // create the leader if it don't exist
  function createLeaderboard(name: string) {
    const newScore = 0
    const leaderboard = {[name] : newScore}
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard))
  }

  // if the play is in the leaderboard and redirect to the game
  function playTheGame(data: FormData) {

    const name = data.get("title")?.valueOf()
    if (typeof name !== "string" || name.length === 0) {
      return
    }

    const strLeaderboard = localStorage.getItem("leaderboard")
    if (strLeaderboard === null) {
      createLeaderboard(name)
      
    } else { 
      let leaderboard = JSON.parse(strLeaderboard)
      leaderboard[name] = 0
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard))
    }

    localStorage.setItem("player", name)
  
    redirect("game/")
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen flex-col gap-3 text-slate-200">
        <h1 className="font-bold">
          Paper Scissors Rocks
        </h1>
        <form 
          className="flex flex-col"
          action={playTheGame}
        >
          <input 
            type="text"
            name="title"
            placeholder="Enter your name."
            className=" text-slate-800 font-bold "
          />
          <button
            className="relative gap-1 font-bold border-4 text-slate-200 sub_menu"
          >
            Play
          </button>
        </form>
      </div>
      <div className="fixed top-0 left-0 h-screen text-slate-200">
        <h3 className="text-center font-bold">Leaderboard</h3>
        <ul className="w-30 m-0 flex flex-col font-bold">
          {renderLeaderboard}
        </ul>
      </div>
    </>
  )
}