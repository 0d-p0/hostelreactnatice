import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const IconImage = ({ path,width=15,height=15 }) => {
  return (
    <Image
      style={{
        width: width,
        height: height
      }}
      source={path}
      resizeMode="contain"
    />
  )
}

export default IconImage

const styles = StyleSheet.create({


})