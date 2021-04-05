import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import logo from '../assets/images/motocrosslogo.png';
import bgImage from '../assets/images/background.jpg';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome';
import GPicker from './genderpicker.js';

const { width: WIDTH } = Dimensions.get('window')

   export function register({ navigation }) {
    const [security, setSecurity] = useState(true)
    const [isSelected, setSelection] = useState(false);
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [name, setName] = useState({ value: '', error: '' })
    const [birth, setBirth] = useState({ value: '', error: ''})

    const onRegisterPressed = () => {
      const emailError = emailValidator(email.value)
      const passwordError = passwordValidator(password.value)
      const nameError = nameValidator(name.value)
      const birthError = birthValidator(birth.value)
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        setName({ ...name, error: nameError })
        setBirth({ ...birth, error: birthError })
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
        <Text style={styles.logoText}>Register</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon name={'ios-person-outline'} size={28} color={'black'} style={styles.inputIcon} />
        <TextInput
        style={styles.input}
        placeholder={'Username'}
        placeholderTextColor={'black'}
        underlineColorAndroid='transparent'
        returnKeyType="done"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}/>
        <Text style={styles.error}>{password.error}</Text>
        </View>

        <View style={styles.inputContainer}>
        <Icon name={'mail-outline'} size={28} color={'black'} style={styles.inputIcon} />
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
        placeholder={'Email adress'}
        placeholderTextColor={'black'}
        underlineColorAndroid='transparent'
      />
      <Text style={styles.error}>{email.error}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Icon name={'fitness-outline'} size={28} color={'black'} style={styles.inputIcon} />
        <TextInput
        style={styles.input}
        placeholder={'DD/MMM/YYYY'}
        placeholderTextColor={'black'}
        underlineColorAndroid='transparent'
        returnKeyType="done"
        value={birth.value}
        onChangeText={(text) => setBirth({ value: text, error: '' })}
        error={!!birth.error}
        errorText={birth.error}
      />
      <Text style={styles.error}>{birth.error}</Text>
      </View>

      <View style={styles.inputContainer}>
      <Icon2 name={'venus-mars'} size={28} color={'black'} style={styles.inputIcon} />
      <GPicker/>
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
      { password.error ?
      <Text style={styles.error}>{password.error}</Text>
      : 
      <View></View> }
      </View>

      <TouchableOpacity 
            style={styles.btnRegister}
            onPress={onRegisterPressed}>
      <Text style={styles.text} >Register</Text>
      </TouchableOpacity>

    </ImageBackground>


  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    justifyContent: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    opacity: 0.5
  },
inputContainer1: {
},
inputContainer: {
  marginBottom: 3,
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
btnRegister: {
  width: WIDTH - 130,
  height: 45,
  borderRadius: 45,    
  backgroundColor: 'rgba(230, 126, 34,1.0)',
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: 20,
},
text: {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: 16,
  textAlign: 'center',
},


});