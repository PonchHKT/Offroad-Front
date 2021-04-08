import React from 'react';
import { View, Text } from "react-native";
import { RadioButton } from 'react-native-paper';

export default function CustomRadio(props) {
    
    return (
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
                value={props.value}
                color={props.color}
                status={props.status}
                onPress={props.action}
            />
            <Text>{props.value}</Text>
        </View>
    )
}