import React, { Component } from 'react'
import { white,black,gray } from '../utils/colors'
import { StyleSheet, Text} from 'react-native'

class MyText extends Component {

    render() {
        const {h1, children, style} = this.props
        return <Text style={[h1 ? baseStyles.h1 : baseStyles.text, style]}>{children}</Text>
    }

  }

  export const baseStyles = StyleSheet.create({
    text:{
        fontFamily: "Roboto",
        fontWeight: "normal",
        color:gray,
        fontSize:16
    },
    h1:{
        fontFamily: "Roboto",
        fontWeight: "normal",
        fontSize:30,
        color: black,
    }   
  });

  export default MyText;