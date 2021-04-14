import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AdMobInterstitial } from 'expo-ads-admob';

import { login } from './screens/auth/login';
import { register } from './screens/auth/register';
import { forgotPassword } from './screens/auth/forgotPassword';

import { dashboard } from './screens/dashboard';
import { cgu } from './screens/cgu';

import { infoMed } from './screens/profile/infoMed';
import { stats } from './screens/profile/stats';
import { profil } from './screens/profile/profil.js'
import { comments } from './screens/profile/comments';
import { getHistorique } from './screens/profile/historique';

import { like } from './screens/like';

import { spot } from './screens/spot/spot';
import { startrando } from './screens/spot/startrando';
import { addreview } from './screens/spot/addreview';
import { signalspot } from './screens/spot/signalspot';
import { viewpost } from './screens/spot/viewpost';

import { addspot } from './screens/addSpot/addspot1';
import { addspotnext } from './screens/addSpot/addspot2';

import { splash } from './screens/splashscreen';
import { welcome } from './screens/welcome.js';

const Stack = createStackNavigator();

export default function App() {

    const [interstitialAdId, setInterstitialAdId] = useState()
    const [verify, setVerify] = useState(false)
    
    if (verify == false) {
        Platform.OS === 'ios' ? setInterstitialAdId('ca-app-pub-4225220371128640/7899370197') : setInterstitialAdId('ca-app-pub-4225220371128640/1856706025')
        setVerify(true);
        Ads;
    }

    const Ads = async() => {
        await AdMobInterstitial.setAdUnitID(interstitialAdId);
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
        await AdMobInterstitial.showAdAsync();
    }

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

        <Stack.Screen name="like" component={like} />

        <Stack.Screen name="startrando" component={startrando} />
        <Stack.Screen name="spot" component={spot} />
        <Stack.Screen name="addreview" component={addreview} />
        <Stack.Screen name="signalspot" component={signalspot} />
        <Stack.Screen name="addspot" component={addspot} />
        <Stack.Screen name="addspotnext" component={addspotnext} />
        <Stack.Screen name="viewpost" component={viewpost} />
        <Stack.Screen name="stats" component={stats} />
        <Stack.Screen name="profil" component={profil} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}