import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text } from 'react-native';
import LottieView from 'lottie-react-native';

import logo from '../assets/images/motocrosslogo.png';
import { useFonts } from 'expo-font';
import CustomButton from '../components/CustomButton';
import GoogleButton from '../components/Google2';
import Separator from '../components/Separator2';
import Separator2 from '../components/Separator';

const { width: WIDTH } = Dimensions.get('window')

export function welcome({ navigation }) {

    const [loaded] = useFonts({
        Apetizzer: require('../assets/fonts/apetiz.otf'),
      });
      
      if (!loaded) {
        return null;
      }
    
    return (
        <ScrollView style={styles.backgroundContainer}>

            <Separator2/>
            <Separator2/>
            <Separator2/>
            
            <View>

                <View style={styles.logoContainer}>    
                    <Image source={logo} style={styles.logo}></Image>
                </View>

                <View style={styles.header}>
                    <Text style={{fontFamily: 'Apetizzer', fontSize: 30, top: 27, left: 20, zIndex: 10}}>Offroad Bike Trip</Text>
                    <LottieView 
                        style={{width: WIDTH / 4}}
                        source={require('../assets/location.json')} 
                        autoPlay 
                        loop
                        speed={1}
                    />
                </View>

                <CustomButton
                    key={2}
                    actionsbtn={() => navigation.navigate('login')}
                    title={'Se connecter'}
                    width={60}
                />

                <GoogleButton
                    key={3}
                    title={'Connexion avec Google'}
                />

                    <Separator2/>
                    <Separator2/>
                    <Separator/>
                    <Separator2/>
                    <Separator2/>

                <CustomButton
                    key={4}
                    actionsbtn={() => navigation.navigate('register')}
                    title={'S\'inscrire'}
                    width={60}
                />

            </View>
            <StatusBar style="auto" hidden={true}/>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    backgroundContainer: {
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
        fontSize: 40,
        zIndex: 10
    },
    header: {
        flex: 1, 
        flexDirection: 'row', 
        width: WIDTH,
        justifyContent: 'center',
        marginBottom: 20
    },
});

