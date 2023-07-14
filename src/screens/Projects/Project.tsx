import useAppContext from 'src/components/AppContext';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';

export default function Project() {
  const {project} = useAppContext();
  return (
    <Layout>
      <NDO_Text type="header">{project}</NDO_Text>
    </Layout>
  );
}
