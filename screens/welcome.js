import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import logo from '../assets/images/motocrosslogo.png';
import GoogleButton from '../components/Google2';
import Separator from '../components/Separator2';
import Separator2 from '../components/Separator';

import LottieView from 'lottie-react-native';

const { width: WIDTH } = Dimensions.get('window')

export function welcome({ navigation }) {

    return (
            <ScrollView style={styles.backgroundContainer}>
                <View style={{bottom: 45,}}>
                <View style={styles.logoContainer}>

                <LottieView 
                style={{width: 110, height: 110, top: 77, left: 35, zIndex: 10,}}
                source={require('../assets/location.json')} 
                autoPlay 
                loop = {true}
                speed = {1}/>

                    <Image source={logo} style={styles.logo}></Image>
                </View>

                <View style={{alignItems: 'center'}}>
                <Text style={styles.textWelcome}>Bienvenue</Text>
                </View>

                <View style={styles.loginView}>
            <TouchableOpacity 
                style={styles.btnLogin}
                onPress={() => navigation.navigate('login')} 
            >
                <Text style={styles.textLogin}>Se connecter</Text>
            </TouchableOpacity>
        </View>

                <GoogleButton
                    key={4}
                    id={4}
                    title={'Connexion avec Google'}
                />
                <Separator2/>
                <Separator2/>
                <Separator/>
                <Separator2/>
                <Separator2/>
                <View style={styles.loginView}>
            <TouchableOpacity 
                style={styles.btnLogin}
                onPress={() => navigation.navigate('register')} 
            >
                <Text style={styles.textLogin}>S'INSCRIRE</Text>
            </TouchableOpacity>
        </View>
        </View>

            </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    backgroundContainer: {
        resizeMode: "cover", 
        flex:1, 
        height: '100%', 
        width: '100%',
        backgroundColor: '#ffffff',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 1,
    },
    logo: {
        width: 150,
        height: 150,
    },
    textWelcome: {
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 40,
        marginBottom: 20,
        right: 20,
    },
    btnLogin: {
        width: WIDTH - 80,
        height: 60,
        borderRadius: 20,    
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#e74c3c',
    },
    textLogin: {
        color:'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        left: 8,
    },
    loginView: {
        alignSelf: 'center',
    },
});

