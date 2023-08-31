import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useId, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function AddSections() {
  const project = useProjectsStore(state => state.selectedProject);
  const create = useBountyStore(state => state.createBountyData);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [sections, setSections] = useState<
    {
      header: string;
      content: string;
    }[]
  >(convertFromHeaderSections(create?.headerSections));
  const id = useId();

  function addSection() {
    setSections([...sections, {header: '', content: ''}]);
  }

  const createBountyData = useBountyStore(state => state.createBountyData);
  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );

  function onSubmit() {
    if (!createBountyData) {
      console.error('Missing create bounty data!');
      return;
    }
    setCreateBountyData({
      ...createBountyData,
      headerSections: convertToHeaderSections(),
    });
    navigation.navigate('ViewBounty', {
      isDesignerCreation: true,
    });
  }

  function convertToHeaderSections() {
    const obj: {[x: string]: string[]} = {};

    sections.forEach(section => {
      obj[section.header] = section.content.split('\n');
    });

    return obj;
  }

  function convertFromHeaderSections(obj: any) {
    const arr = [];

    for (const header in obj) {
      if (Object.hasOwnProperty.call(obj, header)) {
        arr.push({header: header, content: obj[header].join('\n')});
      }
    }

    return arr;
  }

  return (
    <Layout>
      <StyledText
        style={{marginTop: -12, paddingBottom: 32, color: Colors.Gray[400]}}>
        {project?.title} / {create?.title}
      </StyledText>
      <ScrollView>
        <View style={{gap: 24}}>
          {sections.map((section, index) => (
            <View key={`section-${index}-${id}`} style={{gap: 12}}>
              <StyledTextInput
                placeholder="Enter header content"
                label="Header"
                onChangeText={e =>
                  setSections(prev => {
                    const sections = [...prev];
                    sections[index].header = e;
                    return sections;
                  })
                }
                value={section.header}
              />
              <StyledTextInput
                placeholder="Enter content"
                label="Content"
                onChangeText={e =>
                  setSections(prev => {
                    const sections = [...prev];
                    sections[index].content = e;
                    return sections;
                  })
                }
                value={section.content}
                multiLine
              />
              <Separator />
            </View>
          ))}
          <StyledButton onPress={addSection} type="normal2">
            Add Section
          </StyledButton>
          <StyledButton onPress={onSubmit}>Review Bounty</StyledButton>
          <View style={{height: 64}}></View>
        </View>
      </ScrollView>
    </Layout>
  );
}
