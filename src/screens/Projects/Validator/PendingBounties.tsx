import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import BountyList from 'src/components/home/BountyList';
import Layout from 'src/layout/Layout';
import useProjectsStore from 'src/stores/projectsStore';

export default function PendingBounties() {
  const bounties = useProjectsStore(state => state.bountiesForProject);

  const [pendingBounties, setPendingBounties] = useState<typeof bounties>([]);

  useEffect(() => {
    setPendingBounties(
      bounties?.filter(
        bounty =>
          bounty.stage === 'PendingApproval' ||
          (bounty.stage === 'Active' && bounty.testCases.length === 0),
      ),
    );
  }, [bounties]);

  return (
    <Layout>
      <ScrollView>
        {!!pendingBounties && (
          <BountyList bounties={pendingBounties} validatorView />
        )}
      </ScrollView>
    </Layout>
  );
}
