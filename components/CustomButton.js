import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get('window')

export default function CustomButton(props) {

    const customWidth = props.width ? props.width : 200

    const styles = StyleSheet.create({
        buttonView: {
            alignSelf: 'center',
        },
        button: {
            justifyContent: 'center',
            width: WIDTH - customWidth,
            height: 55,
            backgroundColor: `${props.color ? props.color : "#e74c3c"}`,
            borderWidth: 1.75,
            borderColor: `${props.border ? props.border : "black"}`,
            borderRadius: 15,
        },
        btntxt: {
            color: `${props.textColor ? props.textColor : "#FBFBFB"}`,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold'
        }
    });    
    
    return (
        <View
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