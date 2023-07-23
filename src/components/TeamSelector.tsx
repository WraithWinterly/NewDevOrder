import React, {createRef, useState} from 'react';
import {
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  View,
  Text,
} from 'react-native';
import NDO_Text from './ndo/NDO_Text';
import DropdownIcon from './images/DropdownIcon';
import {Colors} from 'src/styles/styles';
import useAppContext from './AppProvider';
import {Picker} from '@react-native-picker/picker';

export default function TeamSelector() {
  return <TeamSelectorAndroid />;
}

export function TeamSelectorAndroid() {
  const {team, allTeams, setTeam} = useAppContext();

  const pickerRef = createRef<Picker<any>>();

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: Colors.Primary,
          borderWidth: 1,
          padding: 16,
          borderRadius: 8,
        }}>
        <NDO_Text style={{fontSize: 20}}>
          {/* {team === 'All Teams' ? 'All Teams' : `Team ${team}`} */}
          {team}
        </NDO_Text>
        <DropdownIcon />
      </TouchableOpacity>

      <Picker
        ref={pickerRef}
        selectedValue={team}
        itemStyle={{color: Colors.Text}}
        style={{
          color: Colors.Text,
          height: '100%',
          width: '100%',
          opacity: 0,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
        onValueChange={(itemValue: string, itemIndex: number) => {
          setTeam(itemValue as string);
        }}>
        {allTeams.map((team, i) => (
          <Picker.Item label={team} value={team} key={`$${team}-{id}-${i}`} />
        ))}
      </Picker>
    </View>
  );
}
