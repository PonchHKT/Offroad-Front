import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {login} from './components/login';
import {register} from './components/register';
import {forgetpassword} from './components/forgetpassword'
import {newpassword} from './components/newpassword'
import {cgu} from './components/cgu.js'
import {dashboard} from './components/dashboard';
import {map} from './components/map'
import {profil} from './components/profil'
import {localization} from './components/localization'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
      headerShown: false
      }}>
        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="register" component={register} />
        <Stack.Screen name="forgetpassword" component={forgetpassword} />
        <Stack.Screen name="newpassword" component={newpassword} />
        <Stack.Screen name="cgu" component={cgu} />
        <Stack.Screen name="dashboard" component={dashboard} />
        <Stack.Screen name="map" component={map} />
        <Stack.Screen name="profil" component={profil} />
        <Stack.Screen name="localization" component={localization} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}