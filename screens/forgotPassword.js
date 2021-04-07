import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, Alert } from 'react-native';

import bgImage from '../assets/images/background.jpg';
import logo from '../assets/images/motocrosslogo.png';
import { emailValidator } from '../helpers/auth/emailValidator'

import CustomTitle from '../components/CustomTitle';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';

export function forgotPassword({ navigation }) {
    
    const [email, setEmail] = useState({ value: '', error: '' })

    const onSendPressed = () => {
        const emailError = emailValidator(email.value)

        if (emailError) {
            setEmail({ ...email, error: emailError })
            return;

        } else {

            fetch(`https://offroad-app.herokuapp.com/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                })
            })
            .then((response) => response.json())
            .then((responseData) => {
              console.log(responseData)
                if (responseData.error == null) {
                    try {
                        Alert.alert('Un email vous a été envoyé !')
                        navigation.navigate('login')
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    Alert.alert('EMAIL INEXISTANT')
                }
              })
          .catch((error) =>{
              console.error(error);
          })
        }
    }


    return (
        <ImageBackground source={bgImage} style={styles.backgroundContainer}>
            <ScrollView>
                <Separator></Separator>
                <Separator></Separator>
                <Separator></Separator>

                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo}></Image>
                    <CustomTitle
                        key={1}
                        id={1}
                        title={'Mot de passe oublié'}
                    />
                </View>

                <Text style={styles.text}>
                    Un email vous sera envoyé, pour récupéré votre mot de passe.
                </Text>

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
        
                <CustomButton
                    key={3}
                    id={3}
                    actionsbtn={() => onSendPressed()}
                    title={'Envoyez'}
                />

                <StatusBar style="auto" />
            </ScrollView>
        </ImageBackground>
    ); 
  }

const styles = StyleSheet.create({
    backgroundContainer: {
        resizeMode: "cover", 
        flex: 1, 
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
    text: {
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 20
    },
    clickHere: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

