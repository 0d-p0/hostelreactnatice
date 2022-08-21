import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useCallback } from 'react'

const Slider = () => {
    const [index2, setIndex] = useState(0);
    const indexRef = useRef(index2);
    indexRef.current = index2;
    const onScroll2 = useCallback((event) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index2 = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index2);

        const distance = Math.abs(roundIndex - index2);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index2 change.
        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
        }
    }, []);
    return {onScroll2,index2}
}

export default Slider

