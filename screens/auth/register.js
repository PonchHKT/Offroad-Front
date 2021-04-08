import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import CheckBox from 'react-native-check-box'

import bgImage from '../../assets/images/background.jpg';
import logo from '../../assets/images/motocrosslogo.png';

import { emailValidator } from '../../helpers/auth/emailValidator'
import { passwordValidator } from '../../helpers/auth/passwordValidator'
import { pseudoValidator } from '../../helpers/auth/pseudoValidator'

import GoogleButton from '../../components/Google';
import CustomTitle from '../../components/CustomTitle';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Separator from '../../components/Separator';
import CustomRadio from '../../components/CustomRadio';

const { width: WIDTH } = Dimensions.get('window')
  
export function register({ navigation }) {
  const [security, setSecurity] = useState(true)

  const [isSelected, setSelection] = useState(false);
  const [notif, setNotif] = useState(false);
  const [checked, setChecked] = useState('Débutant');

  const [pseudo, setPseudo] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [password2, setPassword2] = useState({ value: '', error: '' })

  const onRegisterPressed = () => {
    const pseudoError = pseudoValidator(pseudo.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const passwordError2 = passwordValidator(password2.value)

    if(isSelected == false) {
      Alert.alert('Vous devez coché les conditions générales d\'utilisation')
      return;
    }

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
                notif: notif
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
                      title={'S\'inscrire'}
                  />
              </View>

              <View style={styles.inputContainer}>

                  <CustomInput
                      key={2}
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

              <Separator />

              <View style={styles.level}>
                  <Text style={{fontSize: 20}}>Niveau :</Text>
                  <View>
                      <CustomRadio 
                        key={1}
                        value={'Débutant'}
                        color={'black'}
                        status={checked === 'Débutant' ? 'checked' : 'unchecked'}
                        action={() => setChecked('Débutant')}
                      />
                      <CustomRadio 
                        key={2}
                        value={'Intermédiaire'}
                        color={'black'}
                        status={checked === 'Intermédiaire' ? 'checked' : 'unchecked'}
                        action={() => setChecked('Intermédiaire')}
                      />
                      <CustomRadio 
                        key={3}
                        value={'Avancé'}
                        color={'black'}
                        status={checked === 'Avancé' ? 'checked' : 'unchecked'}
                        action={() => setChecked('Avancé')}
                      />
                      <CustomRadio 
                        key={4}
                        value={'Expert'}
                        color={'black'}
                        status={checked === 'Expert' ? 'checked' : 'unchecked'}
                        action={() => setChecked('Expert')}
                      />
                  </View>
              </View>

              <Separator />

              <View style={styles.checkboxContainer}>
                  <CheckBox
                      isChecked={isSelected}
                      onClick={() => setSelection(!isSelected)}
                  />
                  <Text style={styles.label}>Acceptez vous les <Text onPress={() => navigation.navigate('cgu')} style={styles.clickHere}>conditions générales d'utilisation ?</Text></Text>
              </View>

              <View style={styles.checkboxContainer}>
                  <CheckBox
                      isChecked={notif}
                      onClick={() => setNotif(!notif)}
                  />
                  <Text style={styles.label}>Acceptez vous de recevoir des notifications</Text>
              </View>

              <Separator />

              <GoogleButton
                  key={5}
                  title={'S\'inscrire avec Google'}
              />
                           
             <Separator />
             <Separator />

              <CustomButton
                  key={6}
                  actionsbtn={() => onRegisterPressed()}
                  title={'S\'inscrire'}
              />

              <View>
                  <Text style={styles.Account}>Vous possédez déjà un compte ?</Text>

                  <TouchableOpacity>
                      <Text onPress={() => navigation.navigate('login')} style={styles.clickHere}>Se connecter !</Text>
                  </TouchableOpacity>
              </View>

              <Separator />

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
  level: {
    paddingLeft: '6.5%'
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: 'center',
    width: WIDTH - 50
  },
  label: {
    paddingLeft: 10
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
});