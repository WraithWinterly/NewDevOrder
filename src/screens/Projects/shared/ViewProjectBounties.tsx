import {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import BountyList from 'src/components/home/BountyList';
import WarningIcon from 'src/components/icons/WarningIcon';
import Separator from 'src/components/ui/Separator';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';
import useProjectsStore from 'src/stores/projectsStore';
import {didIApprove} from 'src/utils/utils';

export default function ViewProjectBounties() {
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
        {(!bounties ||
          // Weird logic but prevents flicker
          (bounties.length > 0 &&
            !pendingBounties &&
            !approvedBounties &&
            !activeBounties)) && (
          <>
            <StyledText
              style={{fontWeight: '500', fontSize: 18, paddingTop: 12}}
              suspense
              trigger={null}
              shimmerWidth={180}>
              Loading
            </StyledText>
            <BountyList bounties={undefined} noSort2></BountyList>
            <Separator />
          </>
        )}
        {!!bounties &&
          bounties?.length !=
            (pendingBounties?.length || 0) +
              (approvedBounties?.length || 0) +
              (activeBounties?.length || 0) +
              (completedBounties?.length || 0) && (
            <View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <WarningIcon />
                <StyledText style={{width: '90%'}}>
                  There are{' '}
                  {bounties?.length -
                    ((pendingBounties?.length || 0) +
                      (approvedBounties?.length || 0) +
                      (activeBounties?.length || 0) +
                      (completedBounties?.length || 0))}{' '}
                  draft bounties currently not shown.
                </StyledText>
              </View>
              <Separator />
            </View>
          )}
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
      </ScrollView>
    </Layout>
  );
}
