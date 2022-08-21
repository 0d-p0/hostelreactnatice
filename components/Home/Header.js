import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

const Header = ({ name, profilephoto }) => {
    const [grettingText, setGrettingText] = useState()


    useEffect(() => {
        const date = new Date()
        const hour = date.getHours()
        switch (true) {
            case hour >= 15 && hour <18:
                setGrettingText("Good AfterNoon")
                break;
            case hour >= 18 && hour <=22:
                setGrettingText("Good Evening")
                break;
            case hour >= 22 && hour <=6:
                setGrettingText("Good night")
                break;
            case hour >= 6 && hour <12:
                setGrettingText("Good Morning")
                break;
            case hour >= 12 && hour <15:
                setGrettingText("Good Noon")
                break;
            default:
            // code block
        }
    }, [])

    // console.log(grettingText)

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.grettingText}>
                    {grettingText} :)
                </Text>
                <Text style={styles.userNameText}>
                    {name}
                </Text>
            </View>
            <Image
                style={styles.profileImage}
                source={{
                    uri: profilephoto
                }}
            />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10
    },
    grettingText: {
        fontFamily: 'NotoSansLight',
        fontSize: 15,
        color: '#c9c9c9'
    },
    userNameText: {
        fontFamily: 'NotoSansRegular',
        fontSize: 20,
        color: '#30322f'
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
})