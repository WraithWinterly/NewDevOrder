import React, {createRef, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import StyledText from './ui/styled/StyledText';
import DropdownIcon from './icons/DropdownIcon';
import {Colors} from 'src/styles/styles';
import {Picker} from '@react-native-picker/picker';

import useTeamsStore, {Team} from 'src/stores/teamsStore';

export default function TeamSelector() {
  return <TeamSelectorAndroid />;
}

export function TeamSelectorAndroid() {
  const selectedTeam = useTeamsStore(state => state.selectedTeam);
  const teams = useTeamsStore(state => state.teams);
  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);

  const pickerRef = createRef<Picker<any>>();

  useEffect(() => {
    if (!selectedTeam) {
      setSelectedTeam(teams?.[0]?.id || '0');
    }
  }, []);

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
        <StyledText style={{fontSize: 20}}>{selectedTeam?.title}</StyledText>
        <DropdownIcon />
      </TouchableOpacity>

      <Picker
        ref={pickerRef}
        selectedValue={selectedTeam?.title}
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
          const team = teams?.find(team => team.title == itemValue);
          if (team) {
            setSelectedTeam(team.id);
          }
        }}>
        {teams?.map((team, i) => (
          <Picker.Item
            label={team.title}
            value={team.title}
            key={`${team}-${team.id}-${i}`}
          />
        ))}
      </Picker>
    </View>
  );
}
