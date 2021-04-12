import React, { Component, component } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

export function splash({ navigation }) {
    const [loaded] = useFonts({
        biker: require('../assets/fonts/biker.otf'),
    });
    
    if (!loaded) {
        return null;
    }

    return (
            <View
            style={styles.backgroundContainer}>
                <LottieView 
                source={require('../assets/splash.json')} 
                autoPlay 
                loop = {false}
                speed = {0.5}
                onAnimationFinish = {() => navigation.navigate('dashboard')}/>
                <View>
                <Text style={styles.text}>OFFROAD BIKE TRIP</Text>
                </View>
            </View>

)};

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    text: {
        alignItems: 'center',
        fontSize: 20,
        top: 240,
        left: 65,
        fontFamily: 'biker',
        fontSize: 30,
    },

});