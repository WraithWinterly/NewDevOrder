import {Picker} from '@react-native-picker/picker';
import {useId, useRef} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from 'src/styles/styles';
import StyledText from './styled/StyledText';
import DropdownIcon from '../icons/DropdownIcon';

type Data = {
  title: string;
  id: string;
};

interface DropdownMenuProps {
  displayText: string;
  selectedValue: string;
  data: Data[];
  onSelect: (itemID: string, itemIndex: number) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
}

export default function DropdownMenu({
  displayText,
  selectedValue,
  data,
  onSelect,
  style,
  disabled = false,
  loading = false,
}: DropdownMenuProps) {
  const pickerRef = useRef<Picker<any>>(null);
  const id = useId();
  return (
    <View style={[{width: '100%'}, style]}>
      <TouchableOpacity
        disabled={disabled}
        style={{
          flexDirection: 'row',
          gap: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: disabled ? Colors.Gray[400] : Colors.Primary,
          borderWidth: 1,
          padding: 16,
          borderRadius: 8,
        }}
        onPress={() => {
          if (pickerRef.current) {
            pickerRef.current.focus();
          }
        }}>
        <StyledText
          style={{fontSize: 20, height: 26, justifyContent: 'center'}}>
          {/* {selectedTeamId
            ? teams?.find(team => team.id === selectedTeamId)?.title
            : 'Select Team'} */}
          {!loading && displayText}
          {loading && <ActivityIndicator color={Colors.Primary} />}
        </StyledText>
        <DropdownIcon />
      </TouchableOpacity>

      <Picker
        ref={pickerRef}
        enabled={!disabled || loading}
        // selectedValue={selectedTeamId}
        selectedValue={selectedValue}
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
        // onValueChange={(itemValue: string, itemIndex: number) => {
        //   if (onSelectTeam) {
        //     onSelectTeam(itemValue);
        //   }
        // }}>
        onValueChange={disabled ? () => {} : onSelect}>
        <Picker.Item
          label={'Select Role...'}
          value={''}
          key={''}
          style={{display: 'none'}}
        />
        {data?.map(data => (
          <Picker.Item
            label={`-  ${data.title}`}
            value={data.id}
            key={`${data.title}-${data.id}-${id}`}
          />
        ))}
      </Picker>
    </View>
  );
}
