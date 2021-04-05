import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {Picker} from '@react-native-picker/picker';
const { width: WIDTH } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome';

const GPicker = () => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.input}>
      <Icon
        name="sort-down"
        type="MaterialIcons"
        style={styles.pickerIcon}
      />
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      > 
      <Picker.Item label="Choose gender.." value="choose" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Pd" value="others" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    width: 265,
    height: 50,
    color: 'black',
    bottom: 5,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: '#ecf0f1',
    color: 'black',
    marginHorizontal: 25,
    borderWidth: 0.8,
    borderColor: 'black',
    marginBottom: 15,
  },
  pickerIcon: {
    color: 'black',
    position: "absolute",
    bottom: 16,
    right: 12,
    fontSize: 20,
    zIndex: 10,
 },
});

export default GPicker;
