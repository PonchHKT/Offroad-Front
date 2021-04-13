import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logoImage from '../assets/images/motocrosslogo.png'
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';

const { HEIGHT, WIDTH } = Dimensions.get('window')

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
        <View style={styles.backgroundContainer}>
            
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={logoImage}/>
            </View>

            <LottieView 
                resizeMode={'cover'}
                source={require('../assets/splash.json')} 
                autoPlay 
                loop={false}
                speed={0.5}
                onAnimationFinish={() => finish() }
            />

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
    },
});