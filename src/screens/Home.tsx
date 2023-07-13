import {Text, View} from 'react-native';

import {baseScreenStyle} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../Main';
import {StackNavigationProp} from '@react-navigation/stack';

import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Text from 'src/components/ndo/NDO_Text';
export default function Home() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <View style={baseScreenStyle.container}>
      <NDO_Text>Hello World</NDO_Text>
      <NDO_Button onPress={() => navigation.navigate('BountyDetails')}>
        <Text>Go to details</Text>
      </NDO_Button>
    </View>
  );
}
