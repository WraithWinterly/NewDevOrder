import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';

import TeamSelector from 'src/components/TeamSelector';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';
import useAppStore from 'src/stores/store';

export default function StartBounty() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const selectedFullBounty = useAppStore(state => state.selectedFullBounty);

  return (
    <Layout>
      <View style={{justifyContent: 'space-between', height: '98%'}}>
        <View style={{gap: 10}}>
          <StyledText style={{fontSize: 24}}>Start Bounty</StyledText>
          <StyledText>
            <Text style={{color: Colors.Gray[400]}}>
              {selectedFullBounty?.projectName} /{' '}
            </Text>{' '}
            {selectedFullBounty?.title}
          </StyledText>
          <View
            style={{
              borderBottomColor: Colors.Primary,
              borderBottomWidth: 1,
            }}
          />
          <View style={{height: 24}}></View>
          <StyledText>Choose a team to start this bounty:</StyledText>
          <TeamSelector />
        </View>
        <StyledButton onPress={() => navigation.navigate('HomeNavigation')}>
          Confirm Bounty
        </StyledButton>
      </View>
    </Layout>
  );
}
