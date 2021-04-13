import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import bgImage from '../../assets/images/background.jpg';
import logo from '../../assets/images/motocrosslogo.png';
import { emailValidator } from '../../helpers/auth/emailValidator'
import { passwordValidator } from '../../helpers/auth/passwordValidator'

import GoogleButton from '../../components/Google';
import CustomTitle from '../../components/CustomTitle';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Separator from '../../components/Separator';

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
                if (responseData.error == null) {
                    try {
                        AsyncStorage.setItem('token', responseData.data.token)
                        navigation.navigate('dashboard')
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    Alert.alert('COMPTE INEXISTANT')
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

                <Separator/>
                <Separator/>
                <Separator/>

                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}></Image>
                    <CustomTitle
                        key={1}
                        title={'Se connecter'}
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
                    placeholder={'Mot de passe'}
                    valeur={password.value}
                    error={!!password.error}
                    errorText={password.error}
                    text={(text) => setPassword({ value: text, error: '' })}
                    secure={security}
                    pwd={true}
                    changeVisibility={changeSecurity}
                />
                <TouchableOpacity>
                    <Text onPress={() => navigation.navigate('forgotPassword')} style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                </TouchableOpacity>

                <GoogleButton
                    key={4}
                    id={4}
                    title={'Connexion avec Google'}
                />

                <Separator />
                <Separator />
        
                <CustomButton
                    key={5}
                    actionsbtn={() => onLoginPressed()}
                    title={'Se connecter'}
                />

                <View>
                    <Text style={styles.noAccount}>Vous ne possédez pas de compte ?</Text>

                    <TouchableOpacity>
                        <Text onPress={() => navigation.navigate('register')} style={styles.createAccountText}>Créer un compte !</Text>
                    </TouchableOpacity>
                </View>

                <StatusBar style="auto" hidden={true}/>
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
    },
    noAccount: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 20,
    },
    createAccountText: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    forgotPasswordText: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

