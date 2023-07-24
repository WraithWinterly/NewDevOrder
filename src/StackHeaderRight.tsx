import {View} from 'react-native';
import StyledText from './components/ui/styled/StyledText';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from './StackNavigator';
import {Colors} from './styles/styles';

export default function StackHeaderRight({route}: {route: string}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <View style={{paddingRight: 18}}>
      {route === 'MyWallet' ? (
        <StyledText
          onPress={() => navigation.navigate('MintNFTs')}
          style={{color: Colors.Primary}}>
          Mint NFTs
        </StyledText>
      ) : null}
    </View>
  );
}
