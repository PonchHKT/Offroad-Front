import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity , View, Image, Text} from "react-native";
import Google from '../assets/images/google.png';

const { width: WIDTH } = Dimensions.get('window')

export default function GoogleButton(props) {

    const styles = StyleSheet.create({
        googleView: {
            alignSelf: 'center',
        },
        logoGoogle: {
            width: 20,
            height: 20,
            right: -10,
            top: 33,
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
            style={styles.googleView}
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