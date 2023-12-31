import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import BountyList from 'src/components/home/BountyList';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useProjectsStore from 'src/stores/projectsStore';

export default function Completed() {
  const bounties = useProjectsStore(state => state.bountiesForProject);
  // Used to force refresh project info, which will refetch bounties

  const [shownBounties, setShownBounties] = useState<typeof bounties>([]);

  useEffect(() => {
    setShownBounties(
      bounties?.filter(
        bounty =>
          bounty.stage === 'Completed' || bounty.stage === 'PendingApproval',
      ),
    );
  }, [bounties]);

  return (
    <Layout>
      <ScrollView>
        <BountyList bounties={shownBounties} designerView noSort2 />
        {shownBounties?.length === 0 && (
          <StyledText
            style={{
              textAlign: 'center',
              marginTop: 32,
              fontWeight: '500',
              fontSize: 18,
            }}>
            There are no completed bounties currently.
          </StyledText>
        )}
      </ScrollView>
    </Layout>
  );
}
