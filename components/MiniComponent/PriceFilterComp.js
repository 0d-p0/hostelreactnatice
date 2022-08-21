import { StyleSheet, Text, View } from 'react-native'

import React from 'react';

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomMarker from '../User/CustomMarker';

const PriceFilterComp = ({ multiSliderValuesChange, value1,value2 }) => {
    return (
        <View>
            <MultiSlider
                selectedStyle={{
                    backgroundColor: 'red',
                }}
                unselectedStyle={{
                    backgroundColor: 'silver',
                }}
                containerStyle={{
                    height: 50,
                    margin: 10

                }}
                trackStyle={{
                    height: 10,
                    borderRadius: 10
                }}
                customMarker={CustomMarker}
                values={[value1,value2]}
                sliderLength={333}
                onValuesChangeFinish={multiSliderValuesChange}
                min={1}
                max={20000}
            />
        </View>
    )
}

export default PriceFilterComp

const styles = StyleSheet.create({})