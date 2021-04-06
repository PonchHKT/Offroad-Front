import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import bgImage from '../assets/images/background.jpg';
import logo from '../assets/images/motocrosslogo.png';
import { emailValidator } from '../helpers/login/emailValidator'
import { passwordValidator } from '../helpers/login/passwordValidator'

import GoogleButton from '../components/Google';
import CustomTitle from '../components/CustomTitle';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const { width: WIDTH } = Dimensions.get('window')

export function login({ navigation }) {
    
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [security, setSecurity] = useState(true)

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return;

        } else {

            fetch(`https://offroad-app.herokuapp.com/api/auth/signin`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
              console.log(responseData)
                if (responseData.error == null) {
                    try {
                        AsyncStorage.setItem('token', responseData.data.token)
                        navigation.navigate('')
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    Alert.alert('THIS ACCOUNT DOSEN\'T EXIST')
                }
              })
          .catch((error) =>{
              console.error(error);
          })
        }
    }

    const changeSecurity = () => {
        { security ?
            setSecurity(false)
        :
            setSecurity(true)
        }
    }

    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <ScrollView>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}></Image>
                    <CustomTitle
                        key={1}
                        id={1}
                        title={'OFFROAD BIKE TRIP'}
                    />
                </View>

                <CustomInput
                    key={2}
                    id={2}
                    placeholder={'Email'}
                    valeur={email.value}
                    error={!!email.error}
                    errorText={email.error}
                    text={(text) => setEmail({ value: text, error: '' })}
                    secure={false}
                    pwd={false}
                />

                <CustomInput
                    key={3}
                    id={3}
                    placeholder={'Password'}
                    valeur={password.value}
                    error={!!password.error}
                    errorText={password.error}
                    text={(text) => setPassword({ value: text, error: '' })}
                    secure={security}
                    pwd={true}
                    changeVisibility={changeSecurity}
                />

                <GoogleButton
                    key={4}
                    id={4}
                    title={'Login with Google'}
                />
        
                <CustomButton
                    key={5}
                    id={5}
                    actionsbtn={() => onLoginPressed()}
                    title={'Login'}
                />

                <View>
                    <Text style={styles.noAccount}>Don't have an account yet?</Text>

                    <TouchableOpacity>
                        <Text onPress={() => navigation.navigate('register')} style={styles.clickHere}>Make one!</Text>
                    </TouchableOpacity>
                </View>

                <StatusBar style="auto" />
            </ScrollView>
        </ImageBackground>
    ); 
  }

const styles = StyleSheet.create({
    backgroundContainer: {
        resizeMode: "cover", 
        flex:1, 
        height: '100%', 
        width: '100%',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: 40,
    },
    noAccount: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 20,
    },
    clickHere: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

