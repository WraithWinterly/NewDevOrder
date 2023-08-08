import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import ProjBountyBreadcrumb from 'src/components/ui/ProjBountyBreadcrumb';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useMutation from 'src/hooks/usePost';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {SubmitDeliverablesPostData} from 'src/sharedTypes';
import useBountyStore from 'src/stores/bountyStore';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function SubmitDeliverables() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const selectedFullBounty = useBountyStore(state => state.selectedBounty);
  const teams = useTeamsStore(state => state.teams);
  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);
  const selectedTeam = useTeamsStore(state => state.selectedTeam);
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();
  const viewTeams = teams
    ?.filter(t => t.creatorAddress == walletAddress)
    .filter(team => selectedFullBounty?.participantsTeamIDs?.includes(team.id));

  const [linkToVideoDemo, setLinkToVideoDemo] = useState('');
  const [linkToCode, setLinkToCode] = useState('');

  const {data: dataGetSubmission, loading, error, query} = useQuery();

  const {
    data: dataSubmit,
    loading: loadingSubmit,
    error: errorSubmit,
    mutate: mutateSubmit,
  } = useMutation(getServerEndpoint(Endpoints.SUBMIT_DELIVERABLES));

  useEffect(() => {
    // setSelectedTeam(undefined);
    setSelectedTeam((!!viewTeams && viewTeams[0]?.id) || undefined);
  }, []);

  useEffect(() => {
    if (walletAddress && selectedFullBounty?.id && selectedTeam?.id) {
      query(
        `${getServerEndpoint(Endpoints.GET_SUBMISSION)}/${selectedTeam.id},${
          selectedFullBounty.id
        },${walletAddress}`,
      ).then(data => {
        setLinkToCode(data?.repo);
        setLinkToVideoDemo(data?.videoDemo);
      });
    }
  }, [selectedTeam, walletAddress, selectedFullBounty]);

  async function onSubmit() {
    if (!validate()) {
      console.error('Not validated');
      return;
    }
    if (!selectedFullBounty?.id) {
      console.error('No bounty selected');
      return;
    }
    if (!walletAddress) {
      console.error('No wallet address');
      return;
    }
    if (!selectedTeam?.id) {
      console.error('No team selected');
      return;
    }
    const body: SubmitDeliverablesPostData = {
      bountyID: selectedFullBounty.id,
      repo: linkToCode,
      videoDemo: linkToVideoDemo,
      teamID: selectedTeam.id,
      walletAddress,
    };
    const data = await mutateSubmit(body);
    if (data) {
      navigation.navigate('ViewBounty');
    }
  }
  function validate() {
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (
      linkToCode == '' ||
      linkToVideoDemo == '' ||
      !linkRegex.test(linkToCode) ||
      !linkRegex.test(linkToVideoDemo)
    ) {
      return false;
    }
    return true;
  }

  return (
    <Layout>
      <ScrollView>
        <StyledText style={{fontSize: 24}}>Submit Deliverables</StyledText>
        <ProjBountyBreadcrumb bounty={selectedFullBounty} />
        <StyledText style={{marginBottom: 8, marginTop: 24}}>
          Choose a team to submit deliverables on behalf of:
        </StyledText>
        <DropdownMenu
          disabled={!viewTeams || viewTeams.length == 0}
          data={viewTeams?.map(team => ({id: team.id, title: team.name})) || []}
          onSelect={(itemID, itemIndex) => {
            const v = viewTeams?.find(team => team.id == itemID);

            if (v) {
              setSelectedTeam(v.id);
            }
          }}
          displayText={selectedTeam?.name || 'No Teams Available'}
          selectedValue={selectedTeam?.id || ''}
        />
        <Separator />
        <View style={{gap: 24}}>
          <StyledText style={{color: Colors.Gray[300]}}>
            Deliverables will initially be shared with the Bounty Validator.
            Given the rubrics, they will determined if you have passed all test
            cases. Then, it will go to the Founder for approval.
          </StyledText>

          <StyledText style={{color: Colors.Gray[300]}}>
            If you have passed all test cases and Founder approval, the bounty
            will be rewarded to you.
          </StyledText>

          <StyledTextInput
            onChangeText={e => setLinkToVideoDemo(e)}
            value={linkToVideoDemo}
            label="Link to video demo (Required)"
            placeholder="Enter link here"
            isLinkInput
          />

          <StyledTextInput
            onChangeText={e => setLinkToCode(e)}
            value={linkToCode}
            label="Submission link (Required)"
            placeholder="Link to Github"
            isLinkInput
          />

          <View style={{height: 56}} />
          <StyledButton
            type="normal2"
            onPress={onSubmit}
            enabled={validate()}
            loading={loadingSubmit}
            error={!!errorSubmit}>
            Submit Deliverables
          </StyledButton>
        </View>
      </ScrollView>
    </Layout>
  );
}