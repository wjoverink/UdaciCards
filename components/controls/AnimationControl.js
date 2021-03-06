import React, { Component } from 'react'
import { DangerZone } from 'expo'
import PropTypes from 'prop-types'
let { Lottie } = DangerZone

class AnimationControl extends Component {
    static propTypes = {
        source: PropTypes.object.isRequired,
    }

    onLottieLoad = () => {
        const { start, end } = this.props
        if (start >= 0 && end >= 0) {
            this.animation.play(start, end);
        } else {
            this.animation.play();
        }
    }

    render() {
        const { source, ...props } = this.props
        return <Lottie {...props} loop={false} onLayout={this.onLottieLoad}
            ref={animation => {
                this.animation = animation;
            }}
            source={source}
        />
    }
}

export default AnimationControl;
