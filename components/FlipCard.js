import React, { PureComponent } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import MyText from './controls/MyText'
import TextButton from './controls/TextButton'
import { white, gray, blue } from '../utils/colors'
import { View } from 'react-native-animatable';

class FlipCard extends PureComponent {
  state = {
    flip: false,
    // flipAnimationQuestion: "flipInY",
    // flipAnimationAnswer: "flipOutY"
  }

  handleViewRef = ref => this.view = ref;

  flip = () => {
    this.view.flipOutY(600).then((endState) => {
      this.setState((prevState) => {
        return {
          flip: !prevState.flip,
        }
      }, () => this.view.flipInY(400))
    })
  }

  render() {
    const { question, answer } = this.props
    const { flip } = this.state
    const textButton = !flip ? "Answer" : "Question"
    const text = !flip ? question : answer

    return (
      <View ref={this.handleViewRef} style={styles.container}>
        <MyText h1>{text}</MyText>
        <TextButton style={{ color: blue }} onPress={this.flip}>{textButton}</TextButton>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  }
})
export default FlipCard