import React from 'react';
import { View } from "react-native";
import { StyleSheet } from 'react-native';

export default function SeparatorFull() {
    
    return (
        <View style={styles.separator}></View>
    )
}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: 'black',
        borderBottomWidth: 1.2,
        width: 500,
        right: 30,
        marginTop:'3%',
        opacity: 0.76,
        marginTop: 20,
        marginBottom: 20,
    },
});