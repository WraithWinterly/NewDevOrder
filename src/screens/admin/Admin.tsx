import {View} from 'react-native';
import AdminIcon from 'src/components/icons/AdminIcon';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

export default function Admin() {
  return (
    <Layout>
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignItems: 'center',
          gap: 18,
        }}>
        <AdminIcon />
        <View>
          <StyledText>You have access Admin privileges.</StyledText>
          <StyledText>This icon shows you a privileged action.</StyledText>
        </View>
      </View>
    </Layout>
  );
}
