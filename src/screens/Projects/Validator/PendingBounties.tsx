import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import BountyList from 'src/components/home/BountyList';
import Layout from 'src/layout/Layout';
import useProjectsStore from 'src/stores/projectsStore';

export default function PendingBounties() {
  const bounties = useProjectsStore(state => state.bountiesForProject);
  // Used to force refresh project info, which will refetch bounties
  const selectedProject = useProjectsStore(state => state.selectedProject);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    if (!selectedProject) return;
    setSelectedProject(selectedProject.id).then(() => {
      setRefreshing(false);
    });
  }

  const [pendingBounties, setPendingBounties] = useState<typeof bounties>([]);

  useEffect(() => {
    setPendingBounties(
      bounties?.filter(
        bounty =>
          bounty.stage === 'PendingApproval' || bounty.testCases.length === 0,
      ),
    );
  }, [bounties]);

  return (
    <Layout>
      <ScrollView>
        {!!pendingBounties && (
          <BountyList
            refreshing={refreshing}
            bounties={pendingBounties}
            onRefresh={onRefresh}
            validatorView
          />
        )}
      </ScrollView>
    </Layout>
  );
}
