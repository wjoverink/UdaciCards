import React, { Component, PureComponent } from 'react'
import MyText from './MyText'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable';


class CounterText extends Component {
    state = {
        index: 1,
        finished: false
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return !nextState.finished;
    }

    componentWillReceiveProps(props) {
        this.setState({
            index: props.start,
        })
    }

    onAnimationEnd = () => {
        if (!this.state.finished) {
            const { end = 100, steps = 10 } = this.props
            if (this.state.index + steps < end) {
                this.setState((prevState) => ({
                    index: prevState.index + steps,
                }))
            } else {
                this.setState({ index: end }, () => this.setState({ finished: true }))
            }
        }
    }

    render() {
        const { prefix = "%", start, end, ...rest } = this.props
        const { index } = this.state
        const AnimatedView = Animatable.createAnimatableComponent(MyText);
        return <AnimatedView
            h1
            {...rest}
            duration={9}
            animation="pulse"
            onAnimationEnd={this.onAnimationEnd}>
            {Math.round(index) + prefix}
        </AnimatedView>
    }

}


export default CounterText;