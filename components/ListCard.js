import React, { Component, PureComponent } from 'react'
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'
import MyText from './MyText'
import { white } from '../utils/colors'


class ListCard extends PureComponent {
    itemPressed = () => {
        if (this.props.onPress){
            this.props.onPress(this.props.dataItem)
        }
    }

    render() {
        const { questions, title, style, onPress, dataItem, ...props} = this.props
        return  <View 
                    animation="bounceInDown"                     
                    {...props} 
                    style={[styles.container, style]} > 
                    <TouchableOpacity onPress={this.itemPressed}>
                        <MyText h1>
                        {title} 
                        </MyText>
                        <MyText>
                        {questions} cards
                        </MyText>
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
