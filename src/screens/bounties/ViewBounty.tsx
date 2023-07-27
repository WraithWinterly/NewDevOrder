import {TouchableOpacity, View} from 'react-native';

import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import Collapsible from 'react-native-collapsible';
import {useId, useState} from 'react';
import {ScrollView} from 'react-native';
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
import useBountyStore from 'src/stores/bountyStore';
import Separator from 'src/components/ui/Separator';
import Bubble from 'src/components/ui/Bubble';

export default function ViewBounty() {
  const bounty = useBountyStore(state => state.selectedFullBounty);

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
              <Bubble type="purple" text={bounty.projectName} />

              {bounty.stage === 'Active' && (
                <Bubble type="green" text="Accepting Submissions" />
              )}

              <Bubble type="normal" text={bounty.type} />
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
      <Separator />
    </>
  );
}
