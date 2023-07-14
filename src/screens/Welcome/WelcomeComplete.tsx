import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View} from 'react-native';
import {StackParamList} from 'src/Main';
import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';

import asyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeComplete() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  function onPress() {
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
        <NDO_Text type="header" style={{paddingBottom: 24}}>
          Welcome aboard! You've successfully minted your pass.
        </NDO_Text>
        <NDO_Text>
          Ready to explore what the NewDevOrder has to offer? Find exciting new
          bounties to complete and collaborate with fellow bounty hunters!
        </NDO_Text>
        <NDO_Button onPress={onPress}>Explore the app</NDO_Button>
      </View>
    </Layout>
  );
}
