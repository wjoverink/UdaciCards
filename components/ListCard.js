import React, { Component } from 'react'
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { View } from 'react-native-animatable'
import MyText from './MyText'
import { white } from '../utils/colors'


class ListCard extends Component {
    render() {
        const { questions, title, style, ...props} = this.props
        return  <View 
                    animation="bounceInDown"                     
                    {...props} 
                    style={[styles.container, style]} > 
                    <TouchableOpacity>
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
