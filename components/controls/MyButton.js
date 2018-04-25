import React, { PureComponent } from 'react'
import { white, black, gray, red, blue } from '../../utils/colors'
import { StyleSheet, Text, Button, Platform, TouchableOpacity } from 'react-native'
import Mytext, { baseStyles } from './MyText'

class MyButton extends PureComponent {

    render() {
        const { style = {}, title, invert=false, ...props} = this.props
        
        return (
            <TouchableOpacity style={[baseButtonStyles.button, {backgroundColor: invert?white:blue}, ...style]} {...props}>
                <Mytext style={[baseStyles.text, {color:!invert?white:blue, textAlign:"center"}]} >{title}</Mytext>
            </TouchableOpacity>
        )
    }
}


export const baseButtonStyles = StyleSheet.create({
    button: {
        width: 200,
        padding: 10,
        margin:5,
        borderWidth:1,
        borderColor:blue,
        backgroundColor: blue,
        ...Platform.select({
            ios: {
                borderRadius: 7,
                height: 45,
                marginLeft: 40,
                marginRight: 40,
            },
            android: {
                paddingLeft: 30,
                paddingRight: 30,
                height: 45,
                borderRadius: 2,
            }
        })
    }
});

export default MyButton;
