import React from 'react';
import Slides from './Slides/Slides';

class Slideshow extends React.Component {

    constructor(props){
        super();
        this.state = {
            x: 0,
            slides: [
                {heading: 'SLIDE 1', description: 'TastySpicy'}, 
                {heading: 'SLIDE 2', description: 'TastySpicy'}
            ]
        }
    }



    navigateToSlideLeft(){

        const {slides} = this.state;
        this.setState(prevState => {return {x: prevState.x - 1}});
        // console.log(this.state.x)
        if (this.state.x <= 0 ){
            this.setState({x: slides.length - 1});
        }    
        // console.log(this.state.x);
    }


    navigateToSlideRight(){
        const {slides} = this.state;
        this.setState(prevState => {return {x: prevState.x + 1}});
        // console.log(this.state.x)
        if (this.state.x >= slides.length - 1 ){
            this.setState({x: 0});
        }
    
        // console.log(this.state.x);
    }

    render(){

        const {x} = this.state;
        const {slides} = this.state;
        return(
            <section className="section-slideshow">
            <a href="#" className="slide-navigation move-left" onClick={() => {this.navigateToSlideLeft()}}><i className="fas fa-chevron-left"></i></a>
                <Slides index={x} heading={slides[x].heading} description={slides[x].description}>
                    
                </Slides>

            <a href="#" className="slide-navigation move-right" onClick={() => {this.navigateToSlideRight()}}><i className="fas fa-chevron-right"></i></a>    
        </section>            
        )
    }

}

export default Slideshow;