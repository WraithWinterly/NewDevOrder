import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useAppStore from 'src/store';

export default function TeamByID() {
  const team = useAppStore(state => state.team);
  return (
    <Layout>
      <StyledText type="header">{team}</StyledText>
    </Layout>
  );
}
