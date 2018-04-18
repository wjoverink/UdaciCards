import React, { Component } from 'react'
//import Animation from 'lottie-react-native';
import { DangerZone } from 'expo';
let { Lottie } = DangerZone;
import anim from '../assets/animations/animation-w1280-h720.json';


class LoadingControl extends Component {
    //componentDidMount() {
    //     this.animation.reset();
    //     this.animation.play();

    // }
    onLottieLoad = () => {
        this.animation.play();
        }

    render() {
        return <Lottie onLayout={this.onLottieLoad}
            ref={animation => {
                this.animation = animation;
            }}
            source={anim}
        />
    }   
}

export default LoadingControl;
