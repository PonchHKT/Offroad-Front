import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { login } from './screens/login';
import { register } from './screens/register';

import { forgotPassword } from './screens/forgotPassword';

import { startrando } from './screens/startrando';
/*
import { register } from './components/register';
import { forgetpassword } from './components/forgetpassword'
import { cgu } from './components/cgu.js'
import { dashboard } from './components/dashboard';
import { map } from './components/map'
import { profil } from './components/profil'
import { localization } from './components/localization' 
*/

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
        headerShown: false
        }}
      >
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="register" component={register} />

        <Stack.Screen name="forgotPassword" component={forgotPassword} />
        
        <Stack.Screen name="startrando" component={startrando} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}