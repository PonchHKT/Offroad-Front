import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LottieView from 'lottie-react-native';

import { useFonts } from 'expo-font';

export function splash({ navigation }) {
    const [loaded] = useFonts({
        biker: require('../assets/fonts/biker.otf'),
    });

    const [Logged, setLogged] = useState(false)

    useEffect(() => {
      try {
        const value = AsyncStorage.getItem('token')
        .then((login) => { login ? setLogged(true) : setLogged(false)})
      } catch(e) {
        console.log(e)
      }
    },[])
    
    if (!loaded) {
        return null;
    }

    const finish  = async() => {
        {
            Logged ?
                navigation.navigate('dashboard')
            : 
                navigation.navigate('login')
        }
    }

    return (
            <View
            style={styles.backgroundContainer}>
                <LottieView 
                source={require('../assets/splash.json')} 
                autoPlay 
                loop = {false}
                speed = {0.5}
                onAnimationFinish = {() => finish() }/>
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