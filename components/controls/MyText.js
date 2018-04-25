import React, { PureComponent } from 'react'
import { white, black, gray, red } from '../../utils/colors'
import { StyleSheet, Text } from 'react-native'

class MyText extends PureComponent {

    render() {
        const { h2, h1, children, style = {}, error } = this.props
        const myStyle = error ? baseStyles.error : h1 ? baseStyles.h1 : h2 ? baseStyles.h2 : baseStyles.text
        return <Text style={[myStyle, style]}>{children}</Text>
    }

}

function baseFont(){
    return {
        fontFamily: "Roboto",
        fontWeight: "normal",
    }
}

export const baseStyles = StyleSheet.create({
    error: {
        ...baseFont(),
        color: red,
        fontSize: 12
    },
    text: {
        ...baseFont(),
        color: gray,
        fontSize: 16
    },
    h1: {
        ...baseFont(),
        fontSize: 32,
        color: black,
    },
    h2: {
        ...baseFont(),
        fontSize: 26,
        color: black,
    }
});

export default MyText;