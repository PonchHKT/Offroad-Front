import React from 'react';
import { StyleSheet, Text } from "react-native";

export default function CustomTitle(props) {

    const styles = StyleSheet.create({
        title: {
            color: 'black',
            fontSize: 20,
            marginTop: 10,
            marginBottom: 10,
            fontSize: 30,
            alignSelf: 'center',
            textAlign: 'center'
        }
    });    
    
    return (
        <Text style={styles.title}>{props.title}</Text>
    )
}