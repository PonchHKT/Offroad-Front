import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Separator2 from '../components/Separator2';
import Separator from '../components/Separator';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import Navbar from '../components/Navbar';
import CustomTitle from '../components/CustomTitle';

export function signalspot({ navigation }) {

    const [comment, setComment] = useState('');

    return (

        <ScrollView>

            <View>
                <Navbar 
                    key={1}
                    dashboard={true}
                    plus={false}
                    plusPress={() => navigation.navigate('addspot')}
                    like={false}
                    likePress={() => navigation.navigate('')}
                    account={false}
                    accountPress={() => navigation.navigate('')}
                />
            </View>

            <Separator/>
            <Separator/>

            <View>
                <CustomTitle
                    key={1}
                    id={1}
                    title={'Signaler un spot'}
                />
            </View>
            
            <View>
                <Text style={styles.commentText}>Décrire votre signalement :</Text>
            </View>

            <View>
                <CustomInput
                    key={1}
                    placeholder={''}
                    valeur={comment}
                    text={(text) => setComment(text)}
                    multiline={true}
                />
            </View>

            <Separator/>
            <Separator2/>
            <Separator/>

            <View>

                <CustomButton
                    key={1}
                    title={'Valider'}
                />

            </View>

        </ScrollView> 

)};

const styles = StyleSheet.create({
    commentText: {
        color: '#606060',
        fontSize: 18,
        marginTop: 20,
        fontWeight: 'bold',
        left: 25,
        bottom: 10,
    },
});