import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import bgImage from '../assets/images/background.jpg';
import logo from '../assets/images/motocrosslogo.png';
import Icon from 'react-native-vector-icons/Ionicons'

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
        return
    }
        navigation.reset({
        index: 0,
        routes: [{ name: '' }],
    })
}
    const changeSecurity = () => {
      if(security == true) {
        setSecurity(false)
      } else {
        setSecurity(true)
      }
    }

  return (
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.logoText}>OFFROAD BIKE TRIP</Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon name={'mail-outline'} size={28} color={'black'} 
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
      <Text style={styles.error}>{email.error}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name={'lock-closed-outline'} size={28} color={'black'} 
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
      <Text style={styles.error}>{password.error}</Text>
      </View>

      <TouchableOpacity 
            style={styles.btnLogin}
            onPress={() => navigation.navigate('todolist')}
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
  marginBottom: 50,
},
logo: {
  width: 120,
  height: 120,
},
logoText: {
  color: 'black',
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: 10,
  opacity: 0.5
},
inputContainer: {
  marginTop: 5,
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
  backgroundColor: 'transparent',
  fontSize: 16,
},
});

