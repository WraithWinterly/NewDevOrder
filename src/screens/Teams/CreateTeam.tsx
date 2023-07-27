import {useEffect, useState} from 'react';
import {View} from 'react-native';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useTeamsStore from 'src/stores/teamsStore';

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [webLink, setWebLink] = useState('https://');

  const setCreateTeamData = useTeamsStore(state => state.setCreateTeamData);

  useEffect(() => {
    setCreateTeamData({
      title: teamName,
      description,
      link: webLink,
    });
  }, [teamName, description, webLink]);

  return (
    <Layout>
      <View style={{height: 64}}></View>
      <View style={{gap: 24}}>
        <StyledTextInput
          value={teamName}
          onChangeText={e => setTeamName(e)}
          placeholder="Team name"
        />
        <StyledTextInput
          value={description}
          onChangeText={e => setDescription(e)}
          placeholder="Short description of your team"
        />
        <StyledTextInput
          value={webLink}
          onChangeText={e => setWebLink(e)}
          placeholder="Link to website"
          isLinkInput
        />
        <View style={{gap: 4, paddingLeft: 4}}>
          <StyledText>Notes:</StyledText>
          <StyledText>
            All entries must have at least three characters.
          </StyledText>
          <StyledText>
            Link to website must be a valid link, starting with http(s)://
          </StyledText>
        </View>
      </View>
    </Layout>
  );
}
