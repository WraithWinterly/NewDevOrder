import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/Main';
import useAppContext from 'src/components/AppProvider';

import TeamSelector from 'src/components/TeamSelector';
import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';

export default function StartBounty() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const {project, selectedFullBounty} = useAppContext();
  return (
    <Layout>
      <View style={{justifyContent: 'space-between', height: '98%'}}>
        <View style={{gap: 10}}>
          <NDO_Text style={{fontSize: 24}}>Start Bounty</NDO_Text>
          <NDO_Text>
            <Text style={{color: Colors.Gray[400]}}>
              {selectedFullBounty?.projectName} /{' '}
            </Text>{' '}
            {selectedFullBounty?.title}
          </NDO_Text>
          <View
            style={{
              borderBottomColor: Colors.Primary,
              borderBottomWidth: 1,
            }}
          />
          <View style={{height: 24}}></View>
          <NDO_Text>Choose a team to start this bounty:</NDO_Text>
          <TeamSelector />
        </View>
        <NDO_Button onPress={() => navigation.navigate('HomeNavigation')}>
          Confirm Bounty
        </NDO_Button>
      </View>
    </Layout>
  );
}
