import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from './screens/auth/login';
import { register } from './screens/auth/register';
import { forgotPassword } from './screens/auth/forgotPassword';

import { dashboard } from './screens/dashboard';
import { cgu } from './screens/cgu';
import { comments } from './screens/comments';
import { startrando } from './screens/startrando';
import { spot } from './screens/spot';
import { addreview } from './screens/addreview';
import { signalspot } from './screens/signalspot';

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
        <Stack.Screen name="cgu" component={cgu} />
        <Stack.Screen name="comments" component={comments} />
        <Stack.Screen name="startrando" component={startrando} />
        <Stack.Screen name="spot" component={spot} />
        <Stack.Screen name="addreview" component={addreview} />
        <Stack.Screen name="signalspot" component={signalspot} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}