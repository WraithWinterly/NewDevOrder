import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import MemberBox from 'src/components/MemberBox';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import {SAMPLE_MEMBERS} from 'src/stores/membersStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function ConfirmAndPay() {
  const proj = useProjectsStore(state => state.selectedProject);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  function onClickConfirmPayButton() {
    navigation.navigate('HomeNavigation');
  }
  return (
    <Layout>
      <View style={{height: '90%', justifyContent: 'space-around'}}>
        <View>
          <StyledText
            style={{fontSize: 26, fontWeight: 'bold', marginBottom: 22}}>
            Confirm and pay
          </StyledText>
          <StyledText style={{fontSize: 18, marginBottom: 18}}>
            Your quote is{' '}
            <Text style={{fontWeight: 'bold'}}>${proj?.quotePrice}</Text>.
          </StyledText>
          <StyledText>
            This amount is non-refundable. Once we've secured your funds, your
            proposal will be sent over to the Bounty Designer. When the Bounty
            Design Document is completed, you will need to review and approve
            that it meets your requirements. Then, it will be posted on the NDO
            app for Bounty Hunters to complete.
          </StyledText>
        </View>

        <StyledButton onPress={onClickConfirmPayButton}>
          <StyledText style={{fontSize: 18, color: Colors.BtnTextColor}}>
            Confirm and pay{' '}
            <Text style={{fontWeight: '500'}}>${proj?.quotePrice}</Text>.
          </StyledText>
        </StyledButton>
      </View>
    </Layout>
  );
}
