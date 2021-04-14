import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, Dimensions, View } from "react-native";
import CustomButton from './CustomButton';
import Note from './Note';
import heart from '../assets/images/heart.png';

import Separator from '../components/Separator2';

const { width: WIDTH } = Dimensions.get('window')

export default function Historique(props) {
    
    const[spot, setSpot] = useState({})
    const[verify, setVerify] = useState(false)

       
    if(!props.note) {

        useEffect(() => {
            try {
                fetch(`https://offroad-app.herokuapp.com/api/spot/unique/${props.spot}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((responseData) => {
                    setSpot(responseData.data.spot)
                })
                .catch((error) =>{
                    console.error(error);
                })
            } catch(e) {
                console.log(e)
            }
        },[])

        if (!spot.note) {
            return <View></View>
        }
    }

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
            paddingBottom: 10,
            marginTop: 10,
        },
        bottom: {
            flex: 1,
            flexDirection: 'row',
            paddingTop: 10,
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        heart: {
            width: 25, 
            height: 25, 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'absolute', 
            top: 21,
            left: 135,
        },
    });   
    
    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
    
    return (
        <View style={styles.container}>
            { props.like ? 
                <View style={styles.heart}>
                    <Image source={heart} style={{width: 25, height: 25,}}/>
                </View>
            :
                <View></View>
            }
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
                        note={props.note ? props.note : spot.note}
                        edit={false}
                        spacing={4}
                        size={25}
                    />
                    <CustomButton
                        key={1}
                        title={'Voir'}
                        width={250}
                        actionsbtn={props.actionsbtn}
                    />
                </View>
            </View>
            
            <Separator />

        </View>
        
    )
}