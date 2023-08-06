import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RoleType} from 'prisma/generated';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import MemberBox from 'src/components/MemberBox';
import BountyList from 'src/components/home/BountyList';
import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';
import {didIApprove} from 'src/utils/utils';

export default function PendingProposal() {
  const proj = useProjectsStore(state => state.selectedProject);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const role = useMemberStore(state => state.myProfile?.playingRole);
  const bounties = useProjectsStore(state => state.bountiesForProject);
  const playingRole = useMemberStore(state => state.myProfile)?.playingRole;

  const [pendingBounties, setPendingBounties] = useState<typeof bounties>([]);
  const [approvedBounties, setApprovedBounties] = useState<typeof bounties>([]);

  useEffect(() => {
    if (playingRole) {
      setPendingBounties(
        bounties?.filter(
          bounty =>
            bounty.stage === 'PendingApproval' &&
            !didIApprove(bounty, playingRole),
        ),
      );
      setApprovedBounties(
        bounties?.filter(
          bounty =>
            bounty.stage === 'PendingApproval' &&
            didIApprove(bounty, playingRole),
        ),
      );
    }
  }, [playingRole, bounties]);

  const [refreshing, setRefreshing] = useState(false);
  return (
    <Layout>
      <ScrollView>
        <StyledText
          style={{fontSize: 26, fontWeight: 'bold', marginBottom: 22}}>
          {proj?.stage === 'Ready' ? 'Active Project' : 'Pending Proposal'}
        </StyledText>
        {role === RoleType.Founder &&
        proj?.quotePrice &&
        proj.quotePrice > 0 &&
        proj.stage != 'PendingBountyMgrQuote' ? (
          <View>
            {proj?.stage === 'PendingFounderPay' && (
              <>
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
              </>
            )}
            {proj?.stage === 'PendingBountyDesign' && (
              <StyledText style={{fontSize: 18, marginBottom: 18}}>
                <Text>
                  You already paid{' '}
                  <Text style={{fontWeight: 'bold'}}>${proj?.quotePrice}</Text>{' '}
                  for this project. The bounty designer is working on it.
                </Text>
              </StyledText>
            )}

            <Separator />
          </View>
        ) : null}

        {role != RoleType.Founder &&
          proj?.stage !== 'PendingBountyMgrQuote' && (
            <View>
              <StyledText style={{fontSize: 18}}>
                Quoted for ${proj?.quotePrice}
                {proj?.stage === 'PendingBountyDesign' && (
                  <Text style={{fontWeight: 'bold'}}> Already Paid.</Text>
                )}
              </StyledText>
              {proj?.stage === 'PendingFounderPay' && (
                <StyledText>Pending Founder Payment</StyledText>
              )}
              <Separator />
            </View>
          )}

        <StyledText style={{fontSize: 18, marginBottom: 12}}>
          Contact information
        </StyledText>

        <View style={{height: 8}}></View>
        <StyledText>
          <Text style={{fontWeight: 'bold'}}>Email: </Text>
          {proj?.email}{' '}
        </StyledText>
        <StyledText>Phone: {proj?.phone} </StyledText>

        {proj?.founder && (
          <>
            <View style={{height: 14}} />
            <StyledText style={{paddingBottom: 4}}>Founder:</StyledText>
            <MemberBox member={proj.founder} />
          </>
        )}

        <Separator />
        <StyledText style={{fontSize: 18, marginBottom: 12}}>
          Project information
        </StyledText>
        <StyledText>
          <Text style={{fontWeight: 'bold'}}>Name: </Text> {proj?.title}
        </StyledText>
        <StyledText>
          <Text style={{fontWeight: 'bold'}}>Details: </Text>
          {proj?.description}
        </StyledText>
        <Separator />
        {role === RoleType.BountyManager &&
          proj?.stage === 'PendingBountyMgrQuote' && (
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
        {pendingBounties &&
          pendingBounties.length > 0 &&
          playingRole != RoleType.BountyDesigner && (
            <View>
              <StyledText
                style={{fontWeight: '500', fontSize: 18, paddingTop: 12}}>
                Your todo: Pending Approvals
              </StyledText>
              <BountyList
                bounties={pendingBounties}
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}></BountyList>
              {!!approvedBounties && approvedBounties.length > 0 && (
                <>
                  <Separator />
                  <StyledText
                    style={{fontWeight: '500', fontSize: 18, paddingTop: 12}}>
                    Approved Bounties
                  </StyledText>
                  <BountyList
                    bounties={approvedBounties}
                    onRefresh={() => setRefreshing(true)}
                    refreshing={refreshing}></BountyList>
                </>
              )}
            </View>
          )}
      </ScrollView>
    </Layout>
  );
}
