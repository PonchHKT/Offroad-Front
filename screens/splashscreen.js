import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoImage from '../assets/images/motocrosslogo.png'
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
                <View style={styles.logoContainer}>
                <Image style={styles.logo} source={logoImage}/>
                </View>

                <LottieView 
                style={{width: 300, height: 300, top: 15, left: 15,}}
                source={require('../assets/splash.json')} 
                autoPlay 
                loop = {false}
                speed = {0.5}
                onAnimationFinish = {() => finish() }/>

                <View>
                <Text style={{fontWeight: 'bold', top: 220, left: 11,}}>v1.0</Text>
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
    logoContainer: {
        top: 240,
        left: 140,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 120,
    },

});