"use client"


import { Button } from "@/components/button"
import { Plaster } from "next/font/google";
import Link from "next/link"
import { useEffect, useState } from "react"

// define the emoji_choice type 
interface emojiDict {
    [key: string]: string;
}

export default function Game() {

    // init localbase variable
    const playerName = localStorage.getItem("player")
    const [strLeaderboard, setStrLeaderboard] = useState(localStorage.getItem("leaderboard"))
    const [playerBestScore, setPlayerBestScore] = useState(0)

    // init game variable
    const [playerScore, setPlayerScore] = useState(0)
    const [computerScore, setComputerScore] = useState(0)
    const [gameStart, setGameStart] = useState(false)
    const [gameEnd, setGameEnd] = useState(false)
    const emoji_choice : emojiDict = {"Paper" : "✋", "Scissors" : "✌", "Rocks" : "✊", "null" : "..."}
    const [result, setResult] = useState("")
    const [playerChoice, setPlayerChoice] = useState("null")
    const [computerChoice, setComputerChoice] = useState("null")

    useEffect(() => {
        if (playerName === null || strLeaderboard === null)
            return

        const leaderboard = JSON.parse(strLeaderboard)
        if (playerScore >= playerBestScore) {
            setPlayerBestScore(playerScore)
            leaderboard[playerName] = playerBestScore
            setStrLeaderboard(JSON.stringify(leaderboard))
            localStorage.setItem("leaderboard", strLeaderboard)
        }
    })

    // if player want reset the score
    function resetScore() {
        restarGame()
        setPlayerScore(0)
    }

    // restar the game
    function restarGame() {
        setPlayerChoice("null")
        setComputerChoice("null")
        setGameStart(false)
        setGameEnd(false)
    }

    // if player win
    function playerWin() {
        setPlayerScore(playerScore + 1)
        setResult("You Win!")
    }

    // if player lose
    function playerLose() {
        setComputerScore(computerScore + 1)
        setResult("You Lose!")
    }

    // function to set the choice of computer
    function getComputerChoice() {
        const possibleChoice = ["Paper", "Scissors", "Rocks"]
        const cpeChoice = possibleChoice[Math.floor((Math.random() * 3))]
        return cpeChoice
    }

    // test if the player win or lose
    function test_result(p_choice: string, c_choice:  string) {
        switch(c_choice) {
            case "Paper":
                if (p_choice === "Paper")
                    setResult("tie!")
                else if (p_choice === "Scissors")
                    playerWin()
                else if (p_choice === "Rocks")
                    playerLose()
                break
            case "Scissors":
                if (p_choice === "Scissors")
                setResult("tie!")
                else if (p_choice === "Rocks")
                    playerWin()
                else if (p_choice === "Paper")
                    playerLose()
                break
            case "Rocks":
                if (p_choice === "Rocks")
                setResult("tie!")
                else if (p_choice === "Paper")
                    playerWin()
                else if (p_choice === "Scissors")
                    playerLose()
                break
        }
    }

    // run game
    function runGame(choice: "Paper" | "Scissors" | "Rocks") {

        //start game
        setGameStart(true)

        // set player choice
        setPlayerChoice(choice)

        // wait and get the result
        setTimeout(() => {
            const cpeChoice = getComputerChoice()
            setComputerChoice(cpeChoice)
            test_result(choice, cpeChoice)
            setGameEnd(true)
        }, 1000);
    }

    return (
        <>
            <h1 className="text-center font-bold">
                Your Scores : {playerScore} 
            </h1>
            <h2 className="text-center font-bold">
                Your BestScore : {playerBestScore}
            </h2>
            <div className="flex flex-col items-center justify-center min-h-screen"> 
            {
                gameEnd ?
                <h1 className="font-bold"> 
                    {result} 
                </h1>
                :
                <></>
            }
      
            {gameStart ?
                <p className="game_result"> 
                    { "🧒 : " + emoji_choice[playerChoice] + " vs " + emoji_choice[computerChoice] + " :  🤖" } 
                </p>
            :
                <div className="flex flex-col gap-10 items-center">
                    <h1>Choose one!</h1>
                    <div className="flex flex-row gap-5 game_button">
                        <Button choice="Paper" runGame={ runGame }/>
                        <Button choice="Scissors" runGame={ runGame }/>
                        <Button choice="Rocks" runGame={ runGame }/>
                    </div>
                </div>
            }
            {gameEnd ?
                <button 
                className="menu_button font-bold my-10 border-4 px-4" 
                onClick={() => restarGame()}
                >
                    retry
                </button>
            :
                <></>
            }
            </div>
            <div className="flex flex-col fixed bottom-0 left-0">
                <button onClick={() => resetScore()} className="sub_menu border-4">
                    Reset
                </button>
                <Link href="/" className="sub_menu border-4">
                    Back
                </Link>
            </div>
        </>
    )
}