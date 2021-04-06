import React from 'react';
import { StyleSheet, Dimensions, TextInput , View, Text } from "react-native";
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
            backgroundColor: "ghostwhite",
            borderWidth: 1.5,
            borderColor: "#000000",
            borderRadius: 20,
            paddingLeft: 10,
            marginTop: 10,
        },
        inputIcon: {
            position: 'absolute',
            top: 17,
            right: 5,
            fontSize: 20
        },
        errorView: {
            alignSelf: 'center',
            backgroundColor: 'pink',
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 30,
            borderColor: 'red',
            paddingLeft: 4,
            paddingRight: 4,
            borderWidth: 1,
        },
        error: {
            color: 'red',   
            fontSize: 12,
            lineHeight: 20  
        },
    });
    
    return (
        <View>
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
                        icon={ props.secure ? "eye" : "eye-off"}
                        size={20}
                        onPress={props.changeVisibility}
                    />
                : 
                    <View></View> 
                }
            </View> 
                { props.error ?
                    <View style={styles.errorView}>
                        <Text style={styles.error}>{props.errorText}</Text>
                    </View>
                : 
                    <Text></Text>
                }
        </View>
    )
}