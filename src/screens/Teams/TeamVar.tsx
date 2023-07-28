import {useId} from 'react';
import {View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native';
import MemberBox from 'src/components/MemberBox';
import LinkIcon from 'src/components/icons/LinkIcon';
import Bubble from 'src/components/ui/Bubble';
import Separator from 'src/components/ui/Separator';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import useTeamsStore from 'src/stores/teamsStore';

export default function TeamVar() {
  const selectedTeam = useTeamsStore(state => state.selectedTeam);
  const id = useId();

  return (
    <Layout>
      {!!selectedTeam && (
        <View>
          <StyledText>{selectedTeam.description}</StyledText>
          <View style={{flexDirection: 'row', gap: 12, marginTop: 12}}>
            <Bubble lowHeight text={`${selectedTeam.memberCount} Members`} />
            <TouchableOpacity
              style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
              <LinkIcon />
              <StyledText>Website</StyledText>
            </TouchableOpacity>
          </View>

          <Separator />

          <View>
            <StyledText
              style={{fontSize: 18, marginBottom: 8, fontWeight: '500'}}>
              Members
            </StyledText>
            {/* <FlatList
              data={selectedTeam.members}
              keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
              ItemSeparatorComponent={() => <View style={{height: 12}}></View>}
              renderItem={({item: member}) => (
                <MemberBox
                  member={member}
                  rightChildren={
                    <Bubble type="transparent" text="Member" />
                  }></MemberBox>
              )}></FlatList> */}
          </View>
        </View>
      )}
    </Layout>
  );
}
