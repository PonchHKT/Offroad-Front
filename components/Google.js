import React from 'react';
import { StyleSheet, Dimensions, TextInput , View } from "react-native";
import Google from '../assets/images/google.png';

const { width: WIDTH } = Dimensions.get('window')

export default function GoogleButton(props) {

    const styles = StyleSheet.create({
        logoGoogle: {
            width: 20,
            height: 20,
            right: 85,
            top: 32,
            zIndex: 10,
        },
        btnGoogle: {
            width: WIDTH - 130,
            height: 45,
            borderRadius: 0,    
            backgroundColor: 'white',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'gray',
        },
        textGoogle: {
            color:'#7d7d7d',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });
    
    return (
        <View
            key={props.id}
            style={styles.google}
        >
            <Image source={Google} style={styles.logoGoogle}></Image>

            <TouchableOpacity 
                style={styles.btnGoogle}
            >
                <Text style={styles.textGoogle}>{props.title}</Text>
            </TouchableOpacity>

        </View>
    )
}