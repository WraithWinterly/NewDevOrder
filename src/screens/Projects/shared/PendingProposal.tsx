import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import MemberBox from 'src/components/MemberBox';
import BountyList from 'src/components/home/BountyList';
import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import {RoleType} from 'src/sharedTypes';
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
  const [activeBounties, setActiveBounties] = useState<typeof bounties>([]);
  const [completedBounties, setCompletedBounties] = useState<typeof bounties>(
    [],
  );

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
      setActiveBounties(bounties?.filter(bounty => bounty.stage === 'Active'));
      setCompletedBounties(
        bounties?.filter(bounty => bounty.stage === 'Completed'),
      );
    }
  }, [playingRole, bounties]);

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
              <Text>
                <StyledText style={{fontSize: 18}}>Quoted for </StyledText>
                <StyledText suspense trigger={proj}>
                  ${proj?.quotePrice}{' '}
                  {proj?.stage === 'PendingBountyDesign' && (
                    <Text style={{fontWeight: 'bold'}}> Already Paid.</Text>
                  )}
                </StyledText>
              </Text>

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
        <Text>
          <StyledText style={{fontWeight: 'bold'}}>
            Email:&nbsp;&nbsp;
          </StyledText>
          <StyledText suspense trigger={proj}>
            {proj?.email}
          </StyledText>
        </Text>
        <Text>
          <StyledText style={{fontWeight: 'bold'}}>Phone: </StyledText>
          <StyledText suspense trigger={proj}>
            {proj?.phone}
          </StyledText>
        </Text>

        <>
          <View style={{height: 14}} />
          <StyledText style={{paddingBottom: 4}}>Founder:</StyledText>
          <MemberBox member={proj?.founder} />
        </>

        <Separator />
        <StyledText style={{fontSize: 18, marginBottom: 12}}>
          Project information
        </StyledText>
        <Text>
          <StyledText style={{fontWeight: 'bold'}}>
            Name:&nbsp;&nbsp;&nbsp;&nbsp;
          </StyledText>
          <StyledText suspense trigger={proj}>
            {proj?.title}
          </StyledText>
        </Text>
        <Text>
          <StyledText style={{fontWeight: 'bold'}}>Details: </StyledText>
          <StyledText suspense trigger={proj}>
            {proj?.description}
          </StyledText>
        </Text>
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
        {playingRole != RoleType.BountyDesigner && (
          <View>
            {pendingBounties && pendingBounties.length > 0 && (
              <>
                <StyledText
                  style={{fontWeight: '500', fontSize: 18, paddingTop: 12}}>
                  Your todo: Pending Approvals
                </StyledText>
                <BountyList bounties={pendingBounties} noSort2></BountyList>
                <Separator />
              </>
            )}

            {!!approvedBounties && approvedBounties.length > 0 && (
              <>
                <StyledText
                  style={{fontWeight: '500', fontSize: 18, paddingTop: 12}}>
                  Approved Bounties
                </StyledText>
                <BountyList bounties={approvedBounties} noSort2></BountyList>
                <Separator />
              </>
            )}
            {!!activeBounties && activeBounties.length > 0 && (
              <>
                <StyledText
                  style={{fontWeight: '500', fontSize: 18, paddingTop: 12}}>
                  Active Bounties
                </StyledText>
                <BountyList bounties={activeBounties} noSort2></BountyList>
                <Separator />
              </>
            )}
            {!!completedBounties && completedBounties.length > 0 && (
              <>
                <StyledText
                  style={{fontWeight: '500', fontSize: 18, paddingTop: 12}}>
                  Completed Bounties
                </StyledText>
                <BountyList bounties={completedBounties} noSort2></BountyList>
                <Separator />
              </>
            )}
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
