import useAppContext from 'src/components/AppProvider';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';

export default function TeamByID() {
  const {team} = useAppContext();
  return (
    <Layout>
      <NDO_Text type="header">{team}</NDO_Text>
    </Layout>
  );
}
