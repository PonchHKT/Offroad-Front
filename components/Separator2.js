import React from 'react';
import { View } from "react-native";
import { StyleSheet } from 'react-native';

export default function Separator2() {
    
    return (
        <View style={styles.separator}></View>
    )
}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '87%',
        marginTop:'3%',
        opacity: 0.76,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20
    },
});