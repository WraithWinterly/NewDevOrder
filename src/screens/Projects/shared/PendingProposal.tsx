import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import MemberBox from 'src/components/MemberBox';
import ForwardArrow from 'src/components/icons/ForwardArrow';
import LeftArrowIcon from 'src/components/icons/LeftArrowIcon';

import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/useMutation';
import Layout from 'src/layout/Layout';
import {
  OfficerConfirmProjectPaidPOSTData,
  ProjectStage,
  RoleType,
} from 'src/sharedTypes';
import useMemberStore from 'src/stores/membersStore';
import useOfficerStore from 'src/stores/officerStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function PendingProposal() {
  const proj = useProjectsStore(state => state.selectedProject);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const role = useMemberStore(state => state.myProfile?.playingRole);
  const myProfile = useMemberStore(state => state.myProfile);

  const fetchItems = useOfficerStore(state => state.fetchItems);
  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.FINANCIAL_OFFICER_PROJECT_PAID),
  );

  async function onSubmitOfficerConfirm() {
    if (!proj?.id) {
      console.error('No project');
      return;
    }

    const data = await mutate({
      projectID: proj?.id,
    } as OfficerConfirmProjectPaidPOSTData);
    if (!!data) {
      navigation.navigate('HomeNavigation');
      fetchItems();
    }
  }

  const [viewBountyButton, setViewBountyButton] = useState<
    'DesignerWorkspaceNavigator' | 'ViewProjectBounties' | null
  >(null);

  // Take them to the right page if they are here
  useEffect(() => {
    if (role === RoleType.BountyDesigner) {
      if (
        proj?.stage === ProjectStage.PendingBountyDesign ||
        proj?.stage === ProjectStage.Ready
      ) {
        setViewBountyButton('DesignerWorkspaceNavigator');
        return;
      } else {
        setViewBountyButton(null);
        return;
      }
    } else if (role === RoleType.Founder || role === RoleType.BountyManager) {
      if ((proj?.bountyIDs?.length || 0) > 0) {
        setViewBountyButton('ViewProjectBounties');
        return;
      }
    } else if (role === RoleType.BountyValidator) {
      if (proj?.stage === ProjectStage.Ready) {
        setViewBountyButton('ViewProjectBounties');
        return;
      } else {
        if ((proj?.bountyIDs?.length || 0) > 0) {
          setViewBountyButton('ViewProjectBounties');
          return;
        }
      }
    }
    setViewBountyButton(null);
  }, [proj]);

  return (
    <Layout>
      <ScrollView>
        <StyledText
          style={{fontSize: 26, fontWeight: 'bold', marginBottom: 22}}>
          {proj?.stage === ProjectStage.Ready
            ? 'Active Project'
            : proj?.stage === ProjectStage.Declined
            ? 'Declined Proposal'
            : 'Pending Proposal'}
        </StyledText>
        {proj?.stage === ProjectStage.PendingOfficer && (
          <StyledText>Pending Financial Officer to Receive Payment</StyledText>
        )}
        {role === RoleType.Founder &&
        proj?.quotePrice &&
        proj.quotePrice > 0 &&
        proj.stage != ProjectStage.PendingBountyMgrQuote ? (
          <View>
            {proj?.stage === ProjectStage.PendingFounderPay && (
              <>
                <StyledText style={{fontSize: 18, marginBottom: 18}}>
                  <Text>Your quote is </Text>
                  <Text style={{fontWeight: 'bold'}}>${proj?.quotePrice}.</Text>
                </StyledText>
                <View
                  style={{
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    marginHorizontal: 12,
                    flex: 1,
                  }}>
                  <StyledButton
                    onPress={() => navigation.navigate('ConfirmAndPay')}>
                    I agree to pay this.
                  </StyledButton>
                </View>
              </>
            )}
            {proj?.stage === ProjectStage.PendingBountyDesign && (
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

        {!!proj &&
          proj?.stage === ProjectStage.PendingOfficer &&
          myProfile?.financialOfficer && (
            <>
              <StyledText style={{fontSize: 18, marginBottom: 12}}>
                Financial Officer
              </StyledText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  paddingBottom: 12,
                }}>
                <ForwardArrow />
                <StyledText>IN: ${proj?.quotePrice}</StyledText>
              </View>
              <StyledText style={{color: Colors.Gray[400]}}>
                You are responsible for collecting this money for NDO.
              </StyledText>
              <View style={{height: 24}} />
              <StyledButton
                loading={loading}
                error={!!error}
                onPress={onSubmitOfficerConfirm}>
                <StyledText style={{color: Colors.BtnTextColor}}>
                  I confirm that NDO has received ${proj?.quotePrice}.
                </StyledText>
              </StyledButton>
              <Separator />
            </>
          )}

        {role != RoleType.Founder &&
          proj?.stage !== ProjectStage.PendingBountyMgrQuote &&
          proj?.stage != ProjectStage.PendingOfficer && (
            <View>
              {/* <Text>
                <StyledText style={{fontSize: 18}}>Quoted for </StyledText>
                <StyledText suspense trigger={proj}>
                  ${proj?.quotePrice}{' '}
                  {proj?.stage === 'PendingBountyDesign' && (
                    <Text style={{fontWeight: 'bold'}}> Already Paid.</Text>
                  )}
                </StyledText>
              </Text> */}
              <Text>
                <StyledText style={{fontSize: 18}}>Paid Funds: </StyledText>
                <StyledText suspense trigger={proj}>
                  ${proj?.totalFunds}{' '}
                  {/* {proj?.stage === ProjectStage.PendingBountyDesign && (
                    <Text style={{fontWeight: 'bold'}}> Already Paid.</Text>
                  )} */}
                </StyledText>
              </Text>

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
        <View>
          {myProfile?.financialOfficer &&
            proj?.stage === ProjectStage.PendingOfficer && (
              <>
                <StyledText style={{fontWeight: 'bold'}}>ID: </StyledText>
                <StyledText suspense trigger={proj}>
                  {proj?.id}
                </StyledText>
              </>
            )}
          <Text>
            <StyledText style={{fontWeight: 'bold'}}>
              Name:&nbsp;&nbsp;&nbsp;&nbsp;
            </StyledText>
            <StyledText suspense trigger={proj}>
              {proj?.title}
            </StyledText>
          </Text>
        </View>
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
        {viewBountyButton && (
          <>
            <StyledButton
              type="normal2"
              onPress={() => {
                navigation.navigate(viewBountyButton);
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <LeftArrowIcon />
                <StyledText style={{fontSize: 18, fontWeight: 'bold'}}>
                  View Bounties
                </StyledText>
              </View>
            </StyledButton>
          </>
        )}
      </ScrollView>
    </Layout>
  );
}
