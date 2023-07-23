import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useAppStore from 'src/store';

export default function ProjectByID() {
  const project = useAppStore(state => state.project);

  return (
    <Layout>
      <StyledText type="header">{project}</StyledText>
    </Layout>
  );
}
