import React, { PureComponent } from 'react'
import { white,black,gray,red } from '../../utils/colors'
import { StyleSheet, Text} from 'react-native'

class MyText extends PureComponent {

    render() {
        const {h1, children, style={}, error} = this.props
        const myStyle =  error ? baseStyles.error : h1 ? baseStyles.h1 : baseStyles.text
        return <Text style={[myStyle, style]}>{children}</Text>
    }

  }

  export const baseStyles = StyleSheet.create({
    error:{
        fontFamily: "Roboto",
        fontWeight: "normal",
        color:red,
        fontSize:12
    },
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