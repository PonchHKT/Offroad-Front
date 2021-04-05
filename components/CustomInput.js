import React from 'react';
import { StyleSheet, Dimensions, TextInput , View } from "react-native";
import { IconButton } from 'react-native-paper';

const { width: WIDTH } = Dimensions.get('window')

export default function CustomInput(props) {

    const styles = StyleSheet.create({
        containerText: {
            flexDirection: 'row',
            alignSelf: 'center'
        },
        textInput: {
            width: WIDTH - 75,
            height: 55,
            backgroundColor: "#ded6d4",
            borderWidth: 1.5,
            borderColor: "#000000",
            opacity: 0.8,
            borderRadius: 45,
            paddingLeft: 10,
            marginTop: 15,
            marginBottom: 15,
        },
        inputIcon: {
            position: 'absolute',
            top: 22,
            right: 5,
            fontSize: 20
        },
        error: {
            alignSelf: 'center',
            color: 'red',
            backgroundColor: 'pink',
            fontSize: 12,
            marginTop: 5,
            borderRadius: 30,
            paddingLeft: 4,
            paddingRight: 4,
            borderColor: 'red',
            borderWidth: 1,
        },
    });
    
    return (
        <View
            key={props.id}
            style={styles.containerText}
        >
            <TextInput
                style={styles.textInput}
                autoCorrect={false}
                placeholder={props.placeholder}
                value={props.valeur}
                error={props.error}
                errorText={props.error}
                autoCapitalize="none"
                onChangeText={props.text}
                secureTextEntry={props.secure}
            />   
            { props.pwd ? 
            <IconButton 
                style={styles.inputIcon}
                icon="eye"
                size={20}
                onPress={props.changeVisibility}
            />
            : 
            <View></View> 
            } 

            { props.error ?
                <Text style={styles.error}>{props.error}</Text>
            : 
                <View></View>
            }
        </View>
    )
}