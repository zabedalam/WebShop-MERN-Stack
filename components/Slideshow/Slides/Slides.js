function Slides({index, heading, description}){

    return (
        <div className={`slides slide-${index + 1}`}>
        <div className="hero-text">
                {/* <h2>{heading}</h2> */}
                <p>{description}</p>
        </div>

    </div>
    )

}

export default Slides;