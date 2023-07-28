import {useState} from 'react';
import BountyList from 'src/components/home/BountyList';
import Layout from 'src/layout/Layout';
import useProjectsStore from 'src/stores/projectsStore';

export default function PendingBounties() {
  const bounties = useProjectsStore(state => state.bountiesById);
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

  const shown = bounties?.filter(bounty => bounty.stage === 'ReadyForTests');

  return (
    <Layout>
      <BountyList
        refreshing={refreshing}
        bounties={shown}
        onRefresh={onRefresh}
        validatorView
      />
    </Layout>
  );
}
