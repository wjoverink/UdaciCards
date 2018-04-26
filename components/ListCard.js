import React, { Component, PureComponent } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'
import MyText from './controls/MyText'
import { white } from '../utils/colors'
import PropTypes from 'prop-types'

class ListCard extends PureComponent {
    static propTypes = {
        questions: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        dataItem: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired
    }

    itemPressed = () => {
        if (this.props.onPress) {
            this.props.onPress(this.props.dataItem)
        }
    }

    render() {
        const { questions, title, style, onPress, dataItem, ...props } = this.props
        return <View
            animation="bounceInDown"
            {...props}
            style={[styles.container, style]} >
            <TouchableOpacity onPress={this.itemPressed}>
                <MyText h2>{title}</MyText>
                <MyText> {questions} cards</MyText>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    }
});

export default ListCard;
