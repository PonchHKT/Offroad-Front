import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get('window')

export default function CustomButton(props) {

    const styles = StyleSheet.create({
        buttonView: {
            alignSelf: 'center',
        },
        button: {
            justifyContent: 'center',
            width: WIDTH - 200,
            height: 55,
            backgroundColor: "#e74c3c",
            borderWidth: 1.75,
            borderColor: "#000000",
            borderRadius: 15,
            marginTop: 15,
        },
        btntxt: {
            color: "#FBFBFB",
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold'
        }
    });    
    
    return (
        <View
            key={props.id}
            style={styles.buttonView}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={props.actionsbtn}
            >
                <Text style={styles.btntxt}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    )
}