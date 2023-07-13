import {View} from 'react-native';
import {Button, Text} from 'react-native';
import {baseScreenStyle} from '../../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../Main';
import {StackNavigationProp} from '@react-navigation/stack';

export default function BountyDetails() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <View style={baseScreenStyle.container}>
      <Text>Hello Bounties</Text>
      <Button
        onPress={() => navigation.navigate('Home')}
        title="Go to home"></Button>
    </View>
  );
}
