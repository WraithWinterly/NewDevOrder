import {ReactNode} from 'react';
import {Platform, TextInput, View} from 'react-native';
import {Colors} from 'src/styles/styles';

interface TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  icon?: ReactNode;
  secureTextEntry?: boolean;
}

export function StyledTextInput({
  onChangeText,
  value,
  placeholder,
  icon = null,
  secureTextEntry = false,
}: TextInputProps) {
  return (
    <View>
      <TextInput
        placeholderTextColor={Colors.Text}
        style={{
          borderColor: Colors.Primary,
          borderWidth: 1,
          padding: 16,
          color: Colors.Text,

          paddingLeft: !!icon ? 44 : 16,
        }}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
      {!!icon && (
        <View
          style={{
            position: 'absolute',
            left: 14,
            top: Platform.OS === 'ios' ? 12 : 18,
            alignItems: 'center',
          }}>
          {icon}
        </View>
      )}
    </View>
  );
}
