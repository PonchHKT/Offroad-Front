import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { login } from './screens/auth/login';
import { register } from './screens/auth/register';
import { forgotPassword } from './screens/auth/forgotPassword';
import { dashboard } from './screens/dashboard';
import { cgu } from './screens/cgu';
import { comments } from './screens/profile/comments';
import { getHistorique } from './screens/profile/historique';
import { startrando } from './screens/startrando';
import { spot } from './screens/spot';
import { addreview } from './screens/addreview';
import { signalspot } from './screens/signalspot';
import { addspot } from './screens/addSpot/addspot1';
import { addspotnext } from './screens/addSpot/addspot2';
import { viewpost } from './screens/viewpost';
import { splash } from './screens/splashscreen';
import { welcome } from './screens/welcome.js';
import { infoMed } from './screens/profile/infoMed';
import { stats } from './screens/stats';

const Stack = createStackNavigator();

export default function App() {

 

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
        headerShown: false
        }}
      >
        <Stack.Screen name="splash" component={splash} />
        <Stack.Screen name="welcome" component={welcome} />

        <Stack.Screen name="login" component={login} />
        <Stack.Screen name="register" component={register} />
        <Stack.Screen name="forgotPassword" component={forgotPassword} />

        <Stack.Screen name="dashboard" component={dashboard} />

        <Stack.Screen name="cgu" component={cgu} />

        <Stack.Screen name="comments" component={comments} />
        <Stack.Screen name="getHistorique" component={getHistorique} />
        <Stack.Screen name="infoMed" component={infoMed} />

        <Stack.Screen name="startrando" component={startrando} />
        <Stack.Screen name="spot" component={spot} />
        <Stack.Screen name="addreview" component={addreview} />
        <Stack.Screen name="signalspot" component={signalspot} />
        <Stack.Screen name="addspot" component={addspot} />
        <Stack.Screen name="addspotnext" component={addspotnext} />
        <Stack.Screen name="viewpost" component={viewpost} />
        <Stack.Screen name="stats" component={stats} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}