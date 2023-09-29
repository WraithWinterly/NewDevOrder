import {ReactNode} from 'react';
import {Text} from 'react-native';
import {Platform, TextInput, View} from 'react-native';
import {Colors} from 'src/styles/styles';

interface TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  icon?: ReactNode;
  secureTextEntry?: boolean;
  isLinkInput?: boolean;
  noAutoCapitalize?: boolean;
  multiLine?: boolean;
  numberInput?: boolean;
  label?: string;
}

export default function StyledTextInput({
  onChangeText,
  value,
  placeholder,
  icon = null,
  secureTextEntry = false,
  noAutoCapitalize = false,
  isLinkInput = false,
  multiLine = false,
  numberInput = false,
  label,
}: TextInputProps) {
  return (
    <View>
      {!!label && (
        <View
          style={{
            position: 'absolute',
            top: -10,
            left: 8,
            backgroundColor: Colors.Background,
            zIndex: 2,
            paddingHorizontal: 4,
          }}>
          <Text
            style={{
              fontWeight: '300',
              fontSize: 13,
              color: Colors.Gray[300],
            }}>
            {label}
          </Text>
        </View>
      )}
      <TextInput
        placeholderTextColor={Colors.Gray[400]}
        autoCorrect={!isLinkInput}
        autoCapitalize={isLinkInput || noAutoCapitalize ? 'none' : undefined}
        autoComplete={isLinkInput ? 'url' : undefined}
        style={{
          borderColor: Colors.BorderColor,
          borderWidth: 1,
          padding: 16,
          color: Colors.Text,

          paddingLeft: !!icon ? 44 : 16,
        }}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        multiline={multiLine}
        keyboardType={numberInput ? 'numeric' : 'default'}
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
