"use client"

import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { 
  createRenderLeaderboard, 
  createNewLeaderboard, 
  addInLeaderBoard
} from "@/components/leaderboard"

export default function Home() {

  const renderLeaderboard = createRenderLeaderboard()

  // if the play is in the leaderboard and redirect to the game
  function playTheGame(data: FormData) {

    const name = data.get("title")?.valueOf()
    if (typeof name !== "string" || name.length === 0) {
      return
    }

    const strLeaderboard = localStorage.getItem("leaderboard")
    if (strLeaderboard === null) {
      createNewLeaderboard(name)
    } else { 
      addInLeaderBoard(name, strLeaderboard)
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