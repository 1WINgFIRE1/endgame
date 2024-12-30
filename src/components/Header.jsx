// import Emoji from 'react-emojis';
export default function Header(props) {
    return (
        <header>
            <h2>Assembly: Endgame</h2>
            <p>Guess the word within {props.counter} {props.counter>1 ? "attempts":"attempt" } to keep the programming world safe from Assembly!</p>
            {/* You Won/Loose div space here */}
            {props.result && <div className="gameWon">
                <h2>You Win!</h2>
                <h3>Well done!🎉</h3>
            </div>}
            {(props.end && !props.result) && <div className="gameOver">
                <h2>Game Over!</h2>
                <h3>You loose! Better start learning Assembly 😭</h3>
                </div>}
        </header>
    )
}