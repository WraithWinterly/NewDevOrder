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
  if (Platform.OS === 'ios') {
    return <TeamSelectorIOS />;
  } else {
    return <TeamSelectorAndroid />;
  }
}

function TeamSelectorIOS() {
  const {team, allTeams, setTeam} = useAppContext();
  function openActionSheet() {
    if (Platform.OS != 'ios') return;
    const options = [...allTeams, 'Cancel'];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
        title: 'Select Team',
        // destructiveButtonIndex: team ? options.indexOf(team) : undefined,
        tintColor: Colors.Text,
      },
      buttonIndex => {
        if (buttonIndex !== options.length - 1) {
          const selectedTeam = options[buttonIndex];
          setTeam(selectedTeam === 'Cancel' ? team : selectedTeam);
        }
      },
    );
  }

  return (
    <TouchableOpacity onPress={openActionSheet} style={{marginLeft: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
        <NDO_Text style={{fontSize: 20}}>Team {team || 'undefined'}</NDO_Text>
        <DropdownIcon />
      </View>
    </TouchableOpacity>
  );
}

export function TeamSelectorAndroid() {
  const {team, allTeams, setTeam} = useAppContext();

  const pickerRef = createRef<Picker<any>>();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingLeft: 14,
        flex: 1,
        width: '100%',
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
        }}>
        <NDO_Text style={{fontSize: 20}}>Team {team || 'undefined'}</NDO_Text>
        <DropdownIcon />
      </TouchableOpacity>

      <Picker
        ref={pickerRef}
        selectedValue={team || 'No Team'}
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
        onValueChange={(itemValue: string, itemIndex: number) =>
          setTeam(itemValue as string)
        }>
        {/* <Picker.Item label="Dev Test 1FFFFFFF" value="Dev Test 1" /> */}
        {allTeams.map((team, i) => (
          <Picker.Item label={team} value={team} key={`$${team}-{id}-${i}`} />
        ))}
      </Picker>
    </View>
  );
}
