import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from './screens/login';
import { register } from './screens/register';

import { forgotPassword } from './screens/forgotPassword';

import { dashboard } from './screens/dashboard';

import { startrando } from './screens/startrando';
/*
import { register } from './components/register';
import { forgetpassword } from './components/forgetpassword'
import { cgu } from './components/cgu.js'

import { map } from './components/map'
import { profil } from './components/profil'
import { localization } from './components/localization' 
*/

const Stack = createStackNavigator();

export default function App() {

  const [Logged, setLogged] = useState(false)

  useEffect(() => {
    try {
      const value = AsyncStorage.getItem('token')
      .then((login) => { login ? setLogged(true) : setLogged(false)})
    } catch(e) {
      console.log(e)
    }
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
        headerShown: false
        }}
      >
        {
          Logged ?
          <Stack.Screen name="dashboard2" component={dashboard} />
        :
          <Stack.Screen name="login2" component={login} />
        }

        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="register" component={register} />

        <Stack.Screen name="forgotPassword" component={forgotPassword} />
        
        <Stack.Screen name="dashboard" component={dashboard} />

        <Stack.Screen name="startrando" component={startrando} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}