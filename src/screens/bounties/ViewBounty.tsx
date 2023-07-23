import {TouchableOpacity, View} from 'react-native';

import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import Collapsible from 'react-native-collapsible';
import {useId, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import CollapsibleArrow from 'src/components/icons/CollapsibleArrow';
import TeamsIcon from 'src/components/icons/TeamsIcon';
import CalendarIcon from 'src/components/icons/CalendarIcon';
import CashIcon from 'src/components/icons/CashIcon';
import {Colors} from 'src/styles/styles';
import {formatTimeAgo} from 'src/utils/utils';
import StyledButton from 'src/components/ui/styled/StyledButton';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from 'src/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {FullBounty} from 'src/types/types';
import useAppStore from 'src/store';

export default function ViewBounty() {
  const bounty = useAppStore(state => state.selectedFullBounty);
  const setSelectedFullBounty = useAppStore(
    state => state.setSelectedFullBounty,
  );

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();

  return (
    <Layout>
      <ScrollView>
        {!!bounty && (
          <View style={{flexDirection: 'column', gap: 10}}>
            <StyledText style={{fontWeight: 'bold', fontSize: 28}}>
              {bounty.title}
            </StyledText>
            <StyledText
              style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
              {formatTimeAgo(bounty.postDate)}
            </StyledText>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
              }}>
              <View
                style={{
                  backgroundColor: '#4F378B',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 2,
                }}>
                <StyledText
                  style={{
                    padding: 8,
                    borderRadius: 100,
                  }}>
                  {bounty.projectName}
                </StyledText>
              </View>

              <View
                style={{
                  backgroundColor: '#485844',
                  borderRadius: 12,
                  paddingHorizontal: 18,
                  paddingVertical: 2,
                  justifyContent: 'center',
                }}>
                <StyledText>
                  {bounty.active ? 'Accepting Submissions' : 'Not Active'}
                </StyledText>
              </View>
              <View
                style={{
                  backgroundColor: '#4A4458',
                  borderRadius: 12,
                  paddingHorizontal: 24,
                  paddingVertical: 2,
                  height: 44,
                  justifyContent: 'center',
                }}>
                <StyledText>{bounty.type}</StyledText>
              </View>
            </View>

            <View style={{height: 12}}></View>
            <DropdownSection title="Bounty Overview">
              <View style={{flexDirection: 'column', gap: 10}}>
                <StyledText>{bounty.description}</StyledText>
                <View
                  style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                  <CashIcon />
                  <StyledText style={{fontWeight: '500'}}>
                    Bonty Reward: {bounty.reward} SOL
                  </StyledText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    alignItems: 'center',
                    paddingTop: 2,
                  }}>
                  <CalendarIcon />
                  <StyledText>
                    Deadline: {bounty.deadline.toDateString()}
                  </StyledText>
                </View>
                <View
                  style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                  <TeamsIcon small />
                  <StyledText>
                    Teams Currently Hacking: {bounty.teamCount}
                  </StyledText>
                </View>
              </View>
            </DropdownSection>

            {Object.keys(bounty.headerSections).map((section, i) => (
              <DropdownSection title={section} key={`${id}-${i}`}>
                {bounty.headerSections[section].map((text, index) => (
                  <StyledText key={index}>- {text}</StyledText>
                ))}
              </DropdownSection>
            ))}

            {/* Founder */}
            <View
              style={{
                padding: 16,
                backgroundColor: Colors.BackgroundLighter,
                borderRadius: 20,
                marginBottom: 38,
              }}>
              <StyledText style={{fontSize: 20, fontWeight: 'bold'}}>
                Meet the founder - {bounty.founder.name}
              </StyledText>
              <StyledText style={{color: Colors.Gray[400]}}>
                {bounty.founder.tag}
              </StyledText>
              <StyledText style={{paddingTop: 4}}>
                {bounty.founder.bio}
              </StyledText>
            </View>
          </View>
        )}

        <StyledButton onPress={() => navigation.navigate('StartBounty')}>
          Start Bounty
        </StyledButton>
        <View style={{paddingVertical: 30}}></View>
      </ScrollView>
    </Layout>
  );
}

function DropdownSection({
  title,

  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setCollapsed(prev => !prev)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <StyledText style={{fontSize: 20, fontWeight: '500'}}>
            {title}
          </StyledText>
          <CollapsibleArrow faceDown={!collapsed} />
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>{children}</Collapsible>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#79747E',
          padding: 8,

          marginBottom: 14,
        }}></View>
    </>
  );
}
