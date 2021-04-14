import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoImage from '../assets/images/motocrosslogo.png'
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import welcome from '../assets/images/splashwelcome.gif'

const { width: WIDTH } = Dimensions.get('window')

export function splash({ navigation }) {
   

    const [Logged, setLogged] = useState(false)

    useEffect(() => {
      try {
        const value = AsyncStorage.getItem('token')
        .then((login) => { login ? setLogged(true) : setLogged(false)})
      } catch(e) {
        console.log(e)
      }
    },[])
    
    

    const finish = async() => {
        {
            Logged ?
                navigation.navigate('dashboard')
            : 
                navigation.navigate('welcome')
        }
    }

    return (
        <View style={styles.backgroundContainer}>
            
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={logoImage}/>
            </View>

            <LottieView 
                style={{zIndex: 10}}
                resizeMode={'cover'}
                source={require('../assets/splash.json')} 
                autoPlay 
                loop= {false}
                speed={0.5}
                onAnimationFinish={() => finish() }
            />

            <View style={{justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 132, top: 208}}>
                <Image 
                source={welcome}
                style={{width: 100, height: 100}}/>
                </View>

            <View>
                <Text style={{fontWeight: 'bold', left: 11, bottom: 11}}>v1.0</Text>
            </View>
            <StatusBar style="auto" hidden={true}/>
        </View>
)}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    logoContainer: {
        flex: 1,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
});