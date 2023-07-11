import Link from "next/link"
import { prisma} from "@/database"
import { redirect } from "next/navigation"

// create a new profile in the database and go to the game with the id
async function playTheGame(data: FormData) {
  "use server"

  const name = data.get("title")?.valueOf()
  if (typeof name !== "string" || name.length === 0) {
    throw new Error("Invalid Name")
  }

  const userExist = await prisma.leaderboard.count({ where : { name }})
 
  if (userExist == 0) 
    await prisma.leaderboard.create({ data: { name, score: 0}})

  const db = prisma.leaderboard.findMany()
  const id = (await db).find(player => player.name === name)?.id

  redirect("game/" + id)
}

export default async function Home() {

  const leaderboard = await prisma.leaderboard.findMany()

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
        <ul className=" w-30 m-0 flex flex-col font-bold  ">
          {leaderboard.map(leaderboard => (
            <li
              className="bolde border-4 px-2" 
              key={leaderboard.id}>{leaderboard.name} : {leaderboard.score}</li>
          ))}
        </ul>
      </div>
    </>
  )
}