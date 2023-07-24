import {View} from 'react-native';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

export default function Teams() {
  return (
    <Layout>
      <View style={{height: 20}}></View>
      <StyledButton>Create new team</StyledButton>
      <Separator />
      <StyledText>Teams Created</StyledText>
    </Layout>
  );
}

function TeamCard({
  title,
  members,
  description,
}: {
  title: string;
  members: string;
  description: string;
}) {
  return (
    <View style={{padding: 12}}>
      <View style={{flexDirection: 'row'}}>
        <StyledText>{title}</StyledText>
        <StyledText>{members}</StyledText>
      </View>

      <StyledText>{description}</StyledText>
    </View>
  );
}
