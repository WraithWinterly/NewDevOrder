import React, {createRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import StyledText from './ui/styled/StyledText';
import DropdownIcon from './icons/DropdownIcon';
import {Colors} from 'src/styles/styles';
import {Picker} from '@react-native-picker/picker';
import useAppStore from '../store';

export default function TeamSelector() {
  return <TeamSelectorAndroid />;
}

export function TeamSelectorAndroid() {
  const team = useAppStore(state => state.team);
  const allTeams = useAppStore(state => state.allTeams);
  const setTeam = useAppStore(state => state.setTeam);

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
        <StyledText style={{fontSize: 20}}>
          {/* {team === 'All Teams' ? 'All Teams' : `Team ${team}`} */}
          {team}
        </StyledText>
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
