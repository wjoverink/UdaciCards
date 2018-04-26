import React, { PureComponent } from 'react'
import { TouchableOpacity } from 'react-native'
import MyText from './MyText'
import PropTypes from 'prop-types'

class TextButton extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }
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