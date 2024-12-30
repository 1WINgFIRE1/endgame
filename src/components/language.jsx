export default function Language(props) {  
    return (
        <section className="languages">
            {props.languages.map((language,index)=>
                <div key={index} className={language.isDead ? "languages-button-dead":"languages-button"} style={{backgroundColor:`${language.color}`}}>{language.value}</div>
            )}
        </section>
    )
}
