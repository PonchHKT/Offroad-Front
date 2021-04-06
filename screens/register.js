import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, CheckBox, Dimensions, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import bgImage from '../assets/images/background.jpg';
import logo from '../assets/images/motocrosslogo.png';

import Icon from 'react-native-vector-icons/Ionicons'
import RadioButton from 'react-native-radio-button'
import { emailValidator } from '../helpers/register/emailValidator'
import { passwordValidator } from '../helpers/register/passwordValidator'
import { pseudoValidator } from '../helpers/register/pseudoValidator'

import GoogleButton from '../components/Google';
import CustomTitle from '../components/CustomTitle';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const { width: WIDTH } = Dimensions.get('window')
  
export function register({ navigation }) {
  const [security, setSecurity] = useState(true)
  const [isSelected, setSelection] = useState(false);

  const [pseudo, setPseudo] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [password2, setPassword2] = useState({ value: '', error: '' })

  const onRegisterPressed = () => {
    const pseudoError = pseudoValidator(pseudo.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const passwordError2 = passwordValidator(password2.value)

    if (pseudoError || emailError || passwordError || passwordError2) {
      setPseudo({ ...pseudo, error: pseudoError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setPassword2({ ...password2, error: passwordError2 })
      return;

    } else {

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

              <View style={styles.inputContainer}>

                  <CustomInput
                      key={2}
                      id={2}
                      placeholder={'Pseudo'}
                      valeur={pseudo.value}
                      error={!!pseudo.error}
                      errorText={pseudo.error}
                      text={(text) => setPseudo({ value: text, error: '' })}
                      secure={false}
                      pwd={false}

                      useIcon={true}
                      icon={'ios-person-outline'}
                  />

                  <CustomInput
                      key={3}
                      id={3}
                      placeholder={'Email'}
                      valeur={email.value}
                      error={!!email.error}
                      errorText={email.error}
                      text={(text) => setEmail({ value: text, error: '' })}
                      secure={false}
                      pwd={false}

                      useIcon={true}
                      icon={'mail-outline'}
                  />

                  <CustomInput
                      key={4}
                      id={4}
                      placeholder={'Mot de passe'}
                      valeur={password.value}
                      error={!!password.error}
                      errorText={password.error}
                      text={(text) => setPassword({ value: text, error: '' })}
                      secure={security}
                      pwd={true}
                      changeVisibility={changeSecurity}

                      useIcon={true}
                      icon={'lock-closed-outline'}
                  />

                  <CustomInput
                      key={5}
                      id={5}
                      placeholder={'Confirmer mot de passe'}
                      valeur={password2.value}
                      error={!!password2.error}
                      errorText={password2.error}
                      text={(text) => setPassword2({ value: text, error: '' })}
                      secure={security}
                      pwd={true}
                      changeVisibility={changeSecurity}

                      useIcon={true}
                      icon={'lock-closed-outline'}
                  />

               
          </View>

      

      <View>
      <Text style={styles.niveau}>Level :</Text>
      </View>
      <View style={styles.radio}>
      <RadioButton
            size={6}
            animation={'bounceIn'}
            isSelected={true}
            value={isSelected}
            onValueChange={setSelection}
            outerColor={'rgba(230, 126, 34,1.0)'}
            innerColor={'black'} />
      <RadioButton
            size={6}
            animation={'bounceIn'}
            isSelected={true}
            value={isSelected}
            onValueChange={setSelection}
            outerColor={'rgba(230, 126, 34,1.0)'}
            innerColor={'black'} />
      <RadioButton
            size={6}
            animation={'bounceIn'}
            isSelected={true}
            value={isSelected}
            onValueChange={setSelection}
            outerColor={'rgba(230, 126, 34,1.0)'}
            innerColor={'black'} />
      <RadioButton
            size={6}
            animation={'bounceIn'}
            isSelected={true}
            value={isSelected}
            onValueChange={setSelection}
            outerColor={'rgba(230, 126, 34,1.0)'}
            innerColor={'black'} />
      </View>

      <View style={styles.checkboxContainer}>
      <CheckBox
      value={isSelected}
      onValueChange={setSelection}
      style={styles.checkbox}
      />
      <Text style={styles.label}>Do you accept our terms and conditions ?</Text>
      </View>

      <View>
      <TouchableOpacity onPress={() => navigation.navigate('startrando')}
            style={styles.btnRegister}
            onPress={onRegisterPressed}>
      <Text style={styles.text} >Register</Text>
      </TouchableOpacity>
      </View>

      <View>
      <TouchableOpacity>
      <Icon onPress={() => Alert.alert('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')} 
      name={'information-circle-outline'} style={styles.cgusize} size={28} color={'black'}>
      </Icon>
      </TouchableOpacity>

      </View>
      </ScrollView>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 80,
    opacity: 0.5,
    bottom: 10,
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
  marginBottom: 7,
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
  width: WIDTH - 100,
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
checkboxContainer: {
  flexDirection: "row",
  left: 30,
},
checkbox: {
  alignSelf: "center",
},
label: {
  color: 'black',
  fontSize: 13,
  textAlign: 'center',
  marginTop: 8,
  left: 2,
},
cgusize: {
  fontSize: 20,
  marginLeft: 3,
  paddingTop: 7,
  color: 'black',
  textAlign: 'center',
  left: 134,
  bottom: 97,
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
niveau: {
  fontWeight: 'bold',
  left: 28,
},
radio: {
  alignSelf: 'center',
},


});