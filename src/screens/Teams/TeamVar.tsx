import {useId} from 'react';
import {Linking, View} from 'react-native';
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
      <View>
        <StyledText suspense trigger={selectedTeam} shimmerWidth={240}>
          {selectedTeam?.description}
        </StyledText>
        <View style={{flexDirection: 'row', gap: 12, marginTop: 12}}>
          <Bubble
            lowHeight
            text={`${selectedTeam?.members?.length || '...'} Members`}
            suspense
            trigger={selectedTeam}
          />
          <TouchableOpacity
            style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}
            onPress={() =>
              selectedTeam?.link && Linking.openURL(selectedTeam.link)
            }>
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
          {/* Suspense Skeleton */}
          {!selectedTeam && (
            <View style={{gap: 12}}>
              <MemberBox
                member={undefined}
                rightChildren={<Bubble suspense trigger={undefined} />}
              />
              <MemberBox
                member={undefined}
                rightChildren={<Bubble suspense trigger={undefined} />}
              />
            </View>
          )}
          <FlatList
            data={selectedTeam?.members}
            keyExtractor={(item, index) =>
              `${item.walletAddress}-${index}-${id}`
            }
            ItemSeparatorComponent={() => <View style={{height: 12}}></View>}
            renderItem={({item: member}) => (
              <MemberBox
                member={member}
                rightChildren={
                  <Bubble
                    type="transparent"
                    text={
                      member.walletAddress === selectedTeam?.creatorAddress
                        ? 'Creator'
                        : 'Member'
                    }
                  />
                }></MemberBox>
            )}></FlatList>
        </View>
      </View>
    </Layout>
  );
}
