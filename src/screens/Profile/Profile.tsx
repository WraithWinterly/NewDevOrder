import {useId} from 'react';
import {Text, View} from 'react-native';
import Bubble from 'src/components/ui/Bubble';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore, {Member} from 'src/stores/membersStore';

export default function Profile() {
  const myProfile = useMemberStore(state => state.myProfile);
  const memberViewing = useMemberStore(state => state.memberViewing);

  return (
    <Layout>
      {!!memberViewing ? (
        <ProfileCard profile={memberViewing} />
      ) : (
        myProfile && <ProfileCard profile={myProfile} />
      )}
    </Layout>
  );
}

function ProfileCard({profile}: {profile: Member}) {
  const id = useId();
  return (
    <View style={{gap: 12, alignItems: 'flex-start'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <StyledText style={{fontSize: 24, fontWeight: '500'}}>
          {profile.name}
        </StyledText>
        <Bubble lowHeight text={`Level ${profile.level}`} />
      </View>

      <StyledText>{profile.tag}</StyledText>
      <View style={{flexWrap: 'wrap', flexDirection: 'row', gap: 14}}>
        {profile.roles.map((role, i) => (
          <Bubble key={`${role}-${i}-${id}`} text={role} />
        ))}
      </View>

      <Text>
        {profile.bountiesWon} bounties won • {profile.teamsJoined} teams joined
        • {profile.membersInvited} members invited
      </Text>
    </View>
  );
}
