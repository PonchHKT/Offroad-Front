import React from 'react';
import { View } from "react-native";
import { StyleSheet } from 'react-native';

export default function SeparatorComment() {
    
    return (
        <View style={styles.separator}></View>
    )
}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: 'black',
        borderBottomWidth: 1.2,
        width: 325,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'3%',
        opacity: 0.76,
        marginTop: 1,
        marginBottom: 20,
    },
});