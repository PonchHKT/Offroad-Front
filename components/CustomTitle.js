import React from 'react';
import { StyleSheet, Text, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get('window')

export default function CustomTitle(props) {

    const styles = StyleSheet.create({
        title: {
            color: '#efedec',
            height: 50,
            fontSize: 20,
            marginTop: 50,
            fontSize: 30,
            alignSelf: 'center'
        }
    });    
    
    return (
        <Text style={styles.title} key={props.id}>{props.text}</Text>
    )
}