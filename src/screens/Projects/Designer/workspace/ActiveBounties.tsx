import {useState} from 'react';
import {ScrollView} from 'react-native';
import BountyList from 'src/components/home/BountyList';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useProjectsStore from 'src/stores/projectsStore';

export default function ActiveBounties() {
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

  const shown = bounties?.filter(bounty => bounty.stage === 'Active');

  return (
    <Layout>
      <ScrollView>
        {shown && (
          <>
            <BountyList bounties={shown} designerView noSort2 />
            {shown?.length === 0 && (
              <StyledText
                style={{
                  textAlign: 'center',
                  marginTop: 32,
                  fontWeight: '500',
                  fontSize: 18,
                }}>
                There are no drafts currently.
              </StyledText>
            )}
          </>
        )}
      </ScrollView>
    </Layout>
  );
}
