import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RoleType} from 'prisma/generated';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import MemberBox from 'src/components/MemberBox';
import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function PendingProposal() {
  const proj = useProjectsStore(state => state.selectedProject);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const role = useMemberStore(state => state.myProfile?.playingRole);
  console.log('', proj?.quotePrice);

  return (
    <Layout>
      <ScrollView>
        <StyledText
          style={{fontSize: 26, fontWeight: 'bold', marginBottom: 22}}>
          Pending Proposal
        </StyledText>
        {role === RoleType.Founder &&
        proj?.quotePrice &&
        proj.quotePrice > 0 ? (
          <View>
            <StyledText style={{fontSize: 18, marginBottom: 18}}>
              <Text>Your quote is </Text>
              <Text style={{fontWeight: 'bold'}}>${proj?.quotePrice}.</Text>
            </StyledText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 12,
              }}>
              <StyledButton
                onPress={() => navigation.navigate('ConfirmAndPay')}>
                Confirm and checkout
              </StyledButton>
            </View>
            <Separator />
          </View>
        ) : null}

        {role === RoleType.BountyManager &&
          proj?.stage !== 'WaitingBountyMgrQuote' && (
            <View>
              <StyledText style={{fontSize: 18}}>
                Quoted for ${proj?.quotePrice}
              </StyledText>
              {proj?.stage === 'WaitingFounderPay' && (
                <StyledText>Pending Founder Payment</StyledText>
              )}
              <Separator />
            </View>
          )}

        <StyledText style={{fontSize: 18, marginBottom: 12}}>
          Contact information
        </StyledText>
        {/* <MemberBox member={SAMPLE_MEMBERS[0]} /> */}
        <View style={{height: 8}}></View>
        <StyledText>
          <Text style={{fontWeight: 'bold'}}>Email: </Text>
          {proj?.email}{' '}
        </StyledText>
        <StyledText>Phone: {proj?.phone} </StyledText>
        <Separator />
        <StyledText style={{fontSize: 18, marginBottom: 12}}>
          Project information
        </StyledText>
        <StyledText>
          <Text style={{fontWeight: 'bold'}}>Project Name: </Text> {proj?.title}
        </StyledText>
        <StyledText>
          <Text style={{fontWeight: 'bold'}}>Project Details: </Text>
          {proj?.description}
        </StyledText>
        <Separator />
        {role === RoleType.BountyManager &&
          proj?.stage === 'WaitingBountyMgrQuote' && (
            <View style={{marginTop: 16}}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 4,
                  paddingVertical: 8,
                }}
                onPress={() => {
                  navigation.navigate('AcceptAndSendQuote');
                }}>
                <StyledText style={{color: Colors.Primary, fontSize: 18}}>
                  Accept and send quote to Founder
                </StyledText>
                <RightArrowIcon />
              </TouchableOpacity>
              <Separator customH={8} />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 4,
                  paddingVertical: 8,
                }}
                onPress={() => navigation.navigate('ConfirmDecline')}>
                <StyledText style={{color: Colors.Primary, fontSize: 18}}>
                  Decline proposal
                </StyledText>
                <RightArrowIcon />
              </TouchableOpacity>
              <Separator customH={8} />
            </View>
          )}
      </ScrollView>
    </Layout>
  );
}
