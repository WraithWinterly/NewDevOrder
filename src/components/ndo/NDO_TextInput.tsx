import {TextInput} from 'react-native';
import {Colors} from 'src/styles/styles';

interface TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

export function NDO_TextInput({
  onChangeText,
  value,
  placeholder,
  secureTextEntry = false,
}: TextInputProps) {
  return (
    <TextInput
      style={{
        borderColor: Colors.Primary,
        borderWidth: 1,
        padding: 16,
        color: Colors.Text,
      }}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}
