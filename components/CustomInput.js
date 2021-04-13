import React from 'react';
import { StyleSheet, Dimensions, TextInput , View, Text } from "react-native";
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH } = Dimensions.get('window')

export default function CustomInput(props) {

    const tHEIGHT = props.multiline ? 250 : 50
    const tWIDTH = props.multiline ? 75 : 105
    const tAlign = props.multiline ? 'top' : 'center'
    const tTop = props.multiline ? 10 : 0

    const styles = StyleSheet.create({
        containerText: {
            flex: 1,
            flexDirection: 'row',
            width: WIDTH - 60,
            alignSelf: 'center',
            backgroundColor: "ghostwhite",
            borderWidth: 1.5,
            borderColor: "#000000",
            borderRadius: 20,
        },
        inputIcon: {
            top: 8,
            left: 5
        },
        textInput: {
            width: WIDTH - tWIDTH,
            paddingLeft: 10,
            height: tHEIGHT,
            paddingTop: tTop,
            textAlignVertical: tAlign
        },
        pwdIcon: {
            position: 'absolute',
            top: 3,
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
                style={styles.containerText}
            >   
                { props.useIcon ?
                    <Icon name={props.icon} size={28} color={'black'} style={styles.inputIcon} />
                :
                    <View></View>
                }
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
                    multiline={props.multiline ? props.multiline : false}
                />   
                { props.pwd ? 
                    <IconButton 
                        style={styles.pwdIcon}
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