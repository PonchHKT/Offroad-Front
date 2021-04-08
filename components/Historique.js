import React from 'react';
import { Image, ScrollView, StyleSheet, Text, Dimensions, View } from "react-native";
import CustomButton from './CustomButton';
import Note from './Note';

import Separator from '../components/Separator2';

const { width: WIDTH } = Dimensions.get('window')

export default function Historique(props) {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 10,
            width: WIDTH - 50,
            paddingLeft: 20
        },
        container2: {
            paddingBottom: 10,
        },
        title: {
            fontSize: 22,
            paddingBottom: 10
        },
        bottom: {
            flex: 1,
            flexDirection: 'row',
            paddingTop: 10,
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    });   
    
    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.title}>{convertDate(props.date)}</Text>
                { props.image ? 
                    <Image 
                    
                    />
                :
                    <Text>
                        {props.text}
                    </Text>
                }
                <View style={styles.bottom}>
                    <Note 
                        key={props.id}
                        note={props.note}
                        edit={false}
                        spacing={4}
                        size={25}
                    />
                    <CustomButton
                        key={1}
                        title={'Voir'}
                        width={250}
                    />
                </View>
            </View>
            
            <Separator />

        </View>
        
    )
}