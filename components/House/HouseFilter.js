import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'

const FilterIcon = <Ionicons name='filter-sharp' size={30} color='black' />

const HouseFilter = () => {
    return (
        <View style={styles.container}>

            <Text style={styles.filterText}>{FilterIcon}</Text>
           
                <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Text style={styles.filterValue}> 500 - 1000 </Text>
                    <Text style={styles.filterValue}> 500 - 1000 </Text>
                    <Text style={styles.filterValue}> 500 - 1000 </Text>
                    <Text style={styles.filterValue}> 500 - 1000 </Text>
                    <Text style={styles.filterValue}> 500 - 1000 </Text>
                    <Text style={styles.filterValue}> 500 - 1000 </Text>
                    <Text style={styles.filterValue}> 500 - 1000 </Text>
                    <Text style={styles.filterValue}> 500 - 1000 </Text>
                </ScrollView>
           
        </View>
    )
}

export default HouseFilter

const styles = StyleSheet.create({
    containerfilter: {
        display: 'flex',
        flexDirection: 'row'
    },
    filterText: {
        fontSize: 25,
        paddingLeft: 10,
        marginRight: 10
    },
    filterValueContaier: {
       

    },
    filterValue: {
        fontSize: 15,
        fontWeight: "bold",
        padding: 10,
        margin:5,
        backgroundColor: "#ffff",
        borderRadius: 10,
        shadowColor: "gray",
        elevation: 5,
        marginRight:5
    }
})