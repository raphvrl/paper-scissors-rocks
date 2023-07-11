"use client"

const emoji_choice = {"Paper" : "✋", "Scissors" : "✌", "Rocks" : "✊", "null" : "..."}

interface buttonProps {
    className?: string
    choice: "Paper" | "Scissors" | "Rocks"
    runGame: (choice: "Paper" | "Scissors" | "Rocks") => void
}

export function Button({choice, runGame}: buttonProps) {
    return (
        <div className="border-4 rounded">
            <button onClick={() => runGame(choice)}>
                { emoji_choice[choice] }
            </button>
        </div>
    )
}