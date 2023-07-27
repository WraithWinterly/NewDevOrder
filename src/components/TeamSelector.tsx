import React, {createRef, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import StyledText from './ui/styled/StyledText';
import DropdownIcon from './icons/DropdownIcon';
import {Colors} from 'src/styles/styles';
import {Picker} from '@react-native-picker/picker';

import useTeamsStore, {Team} from 'src/stores/teamsStore';
import DropdownMenu from './ui/DropdownMenu';

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
    <DropdownMenu
      data={teams || []}
      onSelect={(itemID, itemIndex) => {
        // console.log(itemID);
        const team = teams?.find(team => team.id == itemID);

        if (team) {
          setSelectedTeam(team.id);
        }
      }}
      displayText={selectedTeam?.title || ''}
      selectedValue={selectedTeam?.id || ''}
    />
  );
}
