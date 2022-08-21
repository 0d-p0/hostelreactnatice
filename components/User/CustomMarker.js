import React from 'react';
<Text></Text>
import { StyleSheet, Image, View, Text } from 'react-native';

class CustomMarker extends React.Component {
    render() {
        return (
            <View style={styles.image}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: 25,
        width: 25,
        backgroundColor: "white",
        borderRadius:50,
        borderColor:"#999999",
        borderWidth:2,
        top:3.5
    },
});

export default CustomMarker;