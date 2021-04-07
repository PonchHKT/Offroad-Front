import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, CheckBox, Dimensions, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import bgImage from '../assets/images/background.jpg';
import logo from '../assets/images/motocrosslogo.png';

import Icon from 'react-native-vector-icons/Ionicons'
import RadioButton from 'react-native-radio-button'
import { emailValidator } from '../helpers/auth/emailValidator'
import { passwordValidator } from '../helpers/auth/passwordValidator'
import { pseudoValidator } from '../helpers/auth/pseudoValidator'

import GoogleButton from '../components/Google';
import CustomTitle from '../components/CustomTitle';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Separator from '../components/Separator';

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
        fetch(`https://offroad-app.herokuapp.com/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pseudo: pseudo.value,
                email: email.value,
                level: 'INTERMEDIAIRE',
                password: password.value,
                passwordConfirmation: password2.value,
            })
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.error !== "id is not defined") {
                    Alert.alert(responseData.error)
                } else {
                    navigation.navigate('login')
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
            
              <Separator></Separator>
              <Separator></Separator>
              <Separator></Separator>

              <View style={styles.logoContainer}>
                  <Image source={logo} style={styles.logo}></Image>
                  <CustomTitle
                      key={1}
                      id={1}
                      title={'S\'inscrire'}
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
            <TouchableOpacity>
                <Icon onPress={() => Alert.alert('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum')} 
                  name={'information-circle-outline'} style={styles.cgusize} size={28} color={'black'} />
            </TouchableOpacity>
      </View>

      <Separator />
      <Separator />


                <CustomButton
                    key={6}
                    id={6}
                    actionsbtn={() => onRegisterPressed()}
                    title={'S\'inscrire'}
                />

                  <View>
                    <Text style={styles.Account}>Vous possédez déjà un compte ?</Text>

                    <TouchableOpacity>
                        <Text onPress={() => navigation.navigate('login')} style={styles.clickHere}>Se connecter !</Text>
                    </TouchableOpacity>
                </View>

                <Separator></Separator>

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
  Account: {
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
  

btnRegister: {
  width: WIDTH - 100,
  height: 45,
  borderRadius: 45,    
  backgroundColor: 'rgba(230, 126, 34,1.0)',
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: 20,
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

niveau: {
  fontWeight: 'bold',
  left: 28,
},
radio: {
  alignSelf: 'center',
},


});