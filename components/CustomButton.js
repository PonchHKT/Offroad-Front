import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get('window')

export default function CustomButton(props) {

    const styles = StyleSheet.create({
        button: {
            alignSelf: 'center',
            width: WIDTH - 200,
            height: 55,
            backgroundColor: "#e74c3c",
            borderWidth: 1.75,
            borderColor: "#000000",
            opacity: 0.8,
            borderRadius: 15,
            marginTop: 15,
        },
        btntxt: {
            color: "#FBFBFB",
            alignSelf: 'center',
            marginTop: '4%',
            fontSize: 20,
            fontWeight: 'bold'
        }
    });    
    
    return (
        <TouchableOpacity
            key={props.id}
            style={styles.button}
            onPress={props.actionsbtn}
        >
            <Text style={styles.btntxt}>{props.title}</Text>
        </TouchableOpacity>
    )
}