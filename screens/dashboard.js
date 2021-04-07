import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import Navbar from '../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IconButton } from 'react-native-paper';

export function dashboard({ navigation }) {
    
    const [spot, setSpot] = useState({ value: [] })

    function logout() {
        Alert.alert('You have been disconnected')
        try {
          AsyncStorage.removeItem('token')
          navigation.navigate('login')
        } catch (e) {
          console.log(e)
        }
      }

    return (
        <ScrollView>
            <View>
                <Navbar 
                    key={1}
                    id={1}
                    dashboard={true}
                    plus={false}
                    plusPress={() => navigation.navigate('')}
                    like={false}
                    likePress={() => navigation.navigate('')}
                    account={false}
                    accountPress={() => navigation.navigate('')}
                />
            </View>
            <IconButton
                icon={"plus-circle"}
                size={30}
                color={'black'}
                onPress={() => logout()}
            />
            <IconButton
                icon={"folder"}
                size={30}
                color={'black'}
                onPress={() => navigation.navigate('spot')}
            />
            <IconButton
                icon={"eye"}
                size={30}
                color={'black'}
                onPress={() => navigation.navigate('cgu')}
            />
            <StatusBar style="auto" />
        </ScrollView>
    ); 
  }

const styles = StyleSheet.create({
    
});

