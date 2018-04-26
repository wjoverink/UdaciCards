import React, { PureComponent } from 'react'
import { white, black, gray, red, blue } from '../../utils/colors'
import { StyleSheet, Platform, TouchableOpacity } from 'react-native'
import MyText, { baseStyles } from './MyText'
import PropTypes from 'prop-types'
import { MaterialIcons } from '@expo/vector-icons'

class BaseButton extends PureComponent {
    static propTypes = {
        disabled: PropTypes.bool,
        onPress: PropTypes.func.isRequired,
    }
    render() {
        const { style = {}, disabled = false, onPress, children, ...props } = this.props
        const click = !disabled ? { onPress: onPress } : {}
        return (
            <TouchableOpacity
                disabled={disabled}
                style={style}
                {...click}
                {...props}>
                {children}
            </TouchableOpacity>
        )
    }
}

class Button extends PureComponent {
    static propTypes = {
        disabled: PropTypes.bool,
        color: PropTypes.string,
        invert: PropTypes.bool,
        title: PropTypes.string,
        onPress: PropTypes.func.isRequired,
    }
    render() {
        const { style = {}, title = "", invert = false, color, disabled, ...props } = this.props
        const newColor = !disabled ? color || blue : "#bbb"
        return (
            <BaseButton
                style={[baseButtonStyles.button, ...style, { backgroundColor: invert ? white : newColor, borderColor: newColor }]}
                disabled={disabled}
                {...props}>
                <MyText
                    style={[baseStyles.text, { color: !invert ? white : newColor, textAlign: "center" }]}>
                    {title}
                </MyText>
            </BaseButton>
        )
    }
}

export class IconButton extends PureComponent {
    static propTypes = {
        disabled: PropTypes.bool,
        name: PropTypes.string.isRequired,
        size: PropTypes.number,
        onPress: PropTypes.func.isRequired,
        iconStyle: PropTypes.object,
    }
    render() {
        const { iconStyle = {}, disabled, name, size = 26, ...props } = this.props
        const newColor = !disabled ? Platform.OS === 'ios' ? blue : white : "#bbb"
        return (
            <BaseButton
                disabled={disabled}
                {...props}>
                <MaterialIcons
                    name={name}
                    size={26}
                    style={iconStyle}
                    color={Platform.OS === 'ios' ? blue : white} />
            </BaseButton>
        )
    }
}

export class TextButton extends PureComponent {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    }
    render() {
        const { onPress, style = {}, children } = this.props
        return (
            <BaseButton onPress={onPress}>
                <MyText style={style}>{children}</MyText>
            </BaseButton>
        )
    }
}

export const baseButtonStyles = StyleSheet.create({
    button: {
        width: 200,
        padding: 10,
        margin: 5,
        borderWidth: 1,
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

export default Button;

