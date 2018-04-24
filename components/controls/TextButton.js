import React, {PureComponent} from 'react'
import {TouchableOpacity } from 'react-native'
import MyText from './MyText'

class TextButton extends PureComponent {
  render() {
    const { onPress, style = {}, children } = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <MyText style={style}>{children}</MyText>
      </TouchableOpacity>
    )
  }
}

export default TextButton