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
                navigation.navigate('welcome')
        }
    }

    return (
            <View
            style={styles.backgroundContainer}>
                <View>
                <Text style={styles.text}>OFFROAD BIKE TRIP</Text>
                </View>
                <LottieView 
                style={{width: 250, height: 250, top: 50, left: 15,}}
                source={require('../assets/splash.json')} 
                autoPlay 
                loop = {false}
                speed = {1.5}
                onAnimationFinish = {() => finish() }/>

                <View>
                <Text style={{fontWeight: 'bold', top: 350, left: 11,}}>v1.0</Text>
                </View>
            </View>

)};LottieView

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    text: {
        alignItems: 'center',
        fontSize: 50,
        top: 120,
        left: 80,
        fontFamily: 'biker',
        fontSize: 30,
    },

});