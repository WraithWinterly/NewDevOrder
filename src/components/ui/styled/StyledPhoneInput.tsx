import {Colors} from 'src/styles/styles';
import _InternalPhoneInputField from '../_InternalPhoneInput';
import {View} from 'react-native';

export default function StyledPhoneInput({
  phoneNumber,
  setPhoneNumber,
  setCountryCode,
}: {
  phoneNumber: string;
  setPhoneNumber: (text: string) => void;
  setCountryCode: (text: string) => void;
}) {
  return (
    <View>
      <_InternalPhoneInputField
        defaultValue={phoneNumber}
        textInputProps={{
          placeholderTextColor: Colors.Gray[400],
          style: {
            fontSize: 14,
          },
        }}
        defaultCode="US"
        layout="first"
        placeholder="Your phone number"
        containerStyle={{
          width: '100%',
        }}
        countryPickerButtonStyle={{
          backgroundColor: Colors.Background,
          borderColor: Colors.BorderColor,
          borderWidth: 1,
          borderRightWidth: 0,
        }}
        flagButtonStyle={{
          borderColor: Colors.BorderColor,
          marginRight: -8,
        }}
        textContainerStyle={{
          backgroundColor: Colors.Background,
          borderColor: Colors.BorderColor,
          borderWidth: 1,
          paddingVertical: 6,
        }}
        textInputStyle={{
          color: Colors.Text,
        }}
        codeTextStyle={{
          color: Colors.Gray[400],
          fontSize: 14,
        }}
        onChangeText={text => {
          setPhoneNumber(text);
        }}
        onChangeCountry={country => {
          setCountryCode(`+${country.callingCode[0]}`);
        }}
        disableArrowIcon
        withDarkTheme
        withShadow
      />
    </View>
  );
}
