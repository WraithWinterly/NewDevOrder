import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import asyncStorage from '@react-native-async-storage/async-storage';

import useMemberStore from 'src/stores/membersStore';

export default function WelcomeComplete() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);

  function onPress() {
    fetchMyProfile();
    asyncStorage.setItem('hasCompletedWelcome', 'true').then(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeNavigation'}],
      });
    });
  }

  return (
    <Layout>
      <View style={{gap: 18, paddingTop: 60}}>
        <StyledText type="header" style={{paddingBottom: 24}}>
          Welcome aboard! You've successfully minted your pass.
        </StyledText>
        <StyledText>
          Ready to explore what the NewDevOrder has to offer? Find exciting new
          bounties to complete and collaborate with fellow bounty hunters!
        </StyledText>
        <StyledButton onPress={onPress}>Explore the app</StyledButton>
      </View>
    </Layout>
  );
}
