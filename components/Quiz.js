import React, { Component } from 'react'
import MyText from './controls/MyText'
import AnimationControl from './controls/AnimationControl'
import CounterText from './controls/CounterText'
import TextButton from './controls/TextButton'
import FlipCard from './FlipCard'
import { Text, StyleSheet, View, TextInput, Button, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { white, gray, red, green, blue } from '../utils/colors'
import animSource100 from './../assets/animations/animation-w550-h400.json'
import animSource from './../assets/animations/animation-w512-h512.json'
import MyButton from './controls/MyButton'

function ScoreCard({ animSource, prefix, text, score, onRestart }) {
  return (
    <View style={styles.container}>
      <View style={{alignItems: "center"}}>
        <MyText style={styles.centerText} h1>{text}</MyText>
        <CounterText style={styles.centerText} prefix={prefix} start={0} end={score} steps={score / 9} />
      </View>
      <AnimationControl style={styles.container} source={animSource} />
      <TextButton style={[styles.centerText, { color: blue }]} onPress={onRestart}>Restart Quiz</TextButton>
    </View>
  )
}

/**
* @description Represents the Quiz view
* @constructor
*/
class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctCount: 0
  }

  resultTrue = () => {
    this.setState((prevState) => {
      return {
        correctCount: prevState.correctCount + 1,
        questionIndex: prevState.questionIndex + 1
      }
    })
  }


  resultFalse = () => {
    this.setState((prevState) => {
      return {
        questionIndex: prevState.questionIndex + 1
      }
    })
  }

  restartQuiz = () => {
    console.log("restartQuiz")
    this.setState({ questionIndex: 0, correctCount: 0 })
  }


  render() {
    const { questionIndex, correctCount } = this.state
    const { deck } = this.props
    const questionLength = deck.questions.length
    const card = questionIndex < questionLength ? deck.questions[questionIndex] : null

    if (card) {
      return (
        <View style={styles.viewcontainer}>
          <MyText style={{ justifyContent: "flex-start", alignSelf: "flex-start" }}>{questionIndex + 1}/{questionLength}</MyText>
          <FlipCard style={{ flex: 1, alignSelf: "center", justifyContent: "center" }} question={card.question} answer={card.answer}></FlipCard>
          <MyButton color={green} onPress={this.resultTrue} title="Correct" />
          <MyButton color={red} onPress={this.resultFalse} title="Incorrect" />
        </View>
      )
    }
    const score = (correctCount / questionLength) * 100
    if (questionLength === correctCount) {
      return (
        <ScoreCard
          animSource={animSource100}
          prefix={"% Score"}
          onRestart={this.restartQuiz}
          score={score}
          text={"Congratulations!"} />
      )
    }

    return (
      <ScoreCard
        animSource={animSource}
        prefix={"%"}
        onRestart={this.restartQuiz}
        score={score}
        text={"Your Score"} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
  },
  viewcontainer: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  centerText: {
    textAlign: "center",
  }
})

function mapStateToProps(state, { navigation }) {
  const { deckTitle } = navigation.state.params
  return {
    deckTitle,
    deck: state[deckTitle],
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckTitle } = navigation.state.params
  return {
    goBack: () => navigation.goBack(),
  }
}
// export default AddCard

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz)

