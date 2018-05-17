import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import MyText from './controls/MyText'
import { TextButton } from './controls/MyButtons'
import { blue } from '../utils/colors'
import { View } from 'react-native-animatable'
import PropTypes from 'prop-types'

class FlipCard extends Component {
  state = {
    flip: false,
  }

  static propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    style: PropTypes.object,
  }

  handleViewRef = ref => this.view = ref;

  componentWillReceiveProps(props) {
    if (props.question !== this.props.question) {
      this.setState({ flip: false })
    }
  }

  flip = () => {
    this.view.flipOutY(500).then((endState) => {
      this.setState((prevState) => {
        return {
          flip: !prevState.flip,
        }
      }, () => this.view.flipInY(300))
    })
  }

  render() {
    const { question, answer, style } = this.props
    const { flip } = this.state
    const textButton = !flip ? "Answer" : "Question"
    const text = !flip ? question : answer

    return (
      <View ref={this.handleViewRef} style={[styles.container, style]}>
        <MyText h1>{text}</MyText>
        <TextButton style={{ color: blue }} onPress={this.flip}>{textButton}</TextButton>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  }
})
export default FlipCard