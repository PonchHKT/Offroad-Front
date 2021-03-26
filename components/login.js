import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import bgImage from '../assets/images/background.jpg';
import logo from '../assets/images/motocrosslogo.png';
import Google from '../assets/images/google.png';
import Icon from 'react-native-vector-icons/Ionicons'
import { emailValidator } from '../helpers/login/emailValidator'
import { passwordValidator } from '../helpers/login/passwordValidator'

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

            fetch(`http://localhost:4242/api/auth/signin`, {
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

          <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo}></Image>
              <Text style={styles.logoText}>OFFROAD BIKE TRIP</Text>
          </View>

          <View style={styles.inputContainer1}>
              <Icon name={'mail-outline'} 
                  size={28} 
                  color={'black'} 
                  style={styles.inputIcon} />
              <TextInput
                  style={styles.input}
                  returnKeyType="next"
                  value={email.value}
                  onChangeText={(text) => setEmail({ value: text, error: '' })}
                  error={!!email.error}
                  errorText={email.error}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  placeholder={'Email'}
                  placeholderTextColor={'black'}
                  underlineColorAndroid='transparent'/>

              { email.error ?
                  <Text style={styles.error}>{email.error}</Text>
              : 
                  <View></View> 
              }
          </View>

          <View style={styles.inputContainer2}>
              <Icon name={'lock-closed-outline'} 
                  size={28} 
                  color={'black'} 
                  style={styles.inputIcon} />
              <TextInput
                  style={styles.input}
                  placeholder={'Password'}
                  returnKeyType="done"
                  value={password.value}
                  onChangeText={(text) => setPassword({ value: text, error: '' })}
                  error={!!password.error}
                  errorText={password.error}
                  placeholderTextColor={'black'}
                  underlineColorAndroid='transparent'
                  secureTextEntry={security} />
              <TouchableOpacity style={styles.btnEye}>
                  <Icon onPress={changeSecurity} name={'ios-eye-outline'} size={26} color={'black'}/>
              </TouchableOpacity>

              { password.error ?
                  <Text style={styles.error}>{password.error}</Text>
              : 
                  <View></View> 
              }
          </View>

          <Image source={Google} style={styles.logoGoogle}></Image>

          <TouchableOpacity 
              style={styles.btnGoogle}>
              <Text style={styles.textGoogle} >Sign in with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity 
              style={styles.btnLogin}
              onPress={onLoginPressed}>
              <Text style={styles.text} >Login</Text>
          </TouchableOpacity>

          <Text style={styles.noAccount}>Don't have an account yet?</Text>

          <TouchableOpacity>
              <Text onPress={() => navigation.navigate('register')} style={styles.clickHere}> Make one!</Text>
          </TouchableOpacity>

      <StatusBar style="auto" />
    </ImageBackground>
    ); 
  }

const styles = StyleSheet.create({
  backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      justifyContent: 'center',
      alignItems: 'center',
  },
  logoContainer: {
      alignItems: 'center',
      marginBottom: 10,
  },
  logo: {
      width: 150,
      height: 150,
  },
  logoText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      opacity: 0.5
  },
  logoGoogle: {
      width: 20,
      height: 20,
      right: 85,
      top: 32,
      zIndex: 10,
  },
  inputContainer1: {
      marginBottom: 7,
  },
  input: {
      width: WIDTH - 55,
      height: 45,
      borderRadius: 10,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: '#ecf0f1',
      color: 'black',
      marginHorizontal: 25,
      borderWidth: 0.8,
      borderColor: 'black',
  },
  inputIcon: {
      position: 'absolute',
      top: 8,
      left: 37,
      zIndex: 10,
  },
  btnEye: {
      position: 'absolute',
      top: 8,
      right: 37,
  },
  btnLogin: {
      width: WIDTH - 130,
      height: 45,
      borderRadius: 45,    
      backgroundColor: 'rgba(230, 126, 34,1.0)',
      justifyContent: 'center',
      marginTop: 20,
  },
  btnGoogle: {
      width: WIDTH - 130,
      height: 45,
      borderRadius: 0,    
      backgroundColor: 'white',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: 'gray',
  },
  textGoogle: {
      color:'#7d7d7d',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  text: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 16,
      textAlign: 'center',
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
  error: {
      alignSelf: 'center',
      color: 'red',
      backgroundColor: 'pink',
      fontSize: 12,
      marginTop: 5,
      borderRadius: 30,
      paddingLeft: 4,
      paddingRight: 4,
      borderColor: 'red',
      borderWidth: 1,
  },
});

