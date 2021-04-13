import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import CustomTitle from '../components/CustomTitle'
import Separator from '../components/Separator';

export function cgu({ navigation }) {
    

    return (
        <ScrollView>
            <View>
                <Separator></Separator>
                <Separator></Separator>
                
                <CustomTitle
                    key={1}
                    id={1}
                    title={'Conditions générales d\'utilisation'}
                />

                <Separator></Separator>
                <Separator></Separator>

                <View>
                    <Text style={{padding: 10}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed arcu urna, pulvinar quis nibh eu, aliquet porttitor justo. Duis posuere erat eget malesuada interdum.
                        Duis a sem nec felis congue commodo. Morbi nec pharetra ante. Nunc a nisi et nunc egestas fermentum a eget diam. Maecenas in purus eu orci ornare aliquet. Nunc auctor ac metus ac elementum.
                        Morbi orci dolor, gravida ut congue et, laoreet non nibh. Nulla ullamcorper lobortis risus, quis molestie nunc. Donec imperdiet non orci a elementum. Etiam neque libero, tristique vel mattis nec, porttitor sit amet dolor..
                    </Text>
                </View>
            </View>

            <StatusBar style="auto" hidden={true}/>
        </ScrollView>
    ); 
}

