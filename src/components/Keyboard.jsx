export default function Keyboard(props){
    return (
        <section className="keyboard">
            {props.keyboardKeyelement.map(key=>key)}
        </section>
    )
}