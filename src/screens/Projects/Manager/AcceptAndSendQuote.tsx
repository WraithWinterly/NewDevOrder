import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useProjectsStore from 'src/stores/projectsStore';

export default function AcceptAndSendQuote() {
  const [quoteAmount, setQuoteAmount] = useState('');
  const founderSetQuotePrice = useProjectsStore(
    state => state.founderSetQuotePrice,
  );
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  // Show the cash icon in the input field
  useEffect(() => {
    if (quoteAmount[0] !== '$') {
      setQuoteAmount(`$${quoteAmount}`);
    }
  }, [quoteAmount]);

  function onSubmit() {
    // Set quote price and remove the cash icon upon submission for our data purposes
    const number = Number(quoteAmount.replace('$', ''));
    if (number > 0) {
      Keyboard.dismiss();
      founderSetQuotePrice(number);
      navigation.navigate('HomeNavigation');
    }
  }

  return (
    <Layout>
      <StyledText style={{fontSize: 26, fontWeight: 'bold', marginBottom: 22}}>
        Accept and send quote to Founder
      </StyledText>
      <StyledText style={{fontSize: 18, marginBottom: 18}}>
        The quote will be sent to Founder for approval.
      </StyledText>
      <StyledTextInput
        onChangeText={e => setQuoteAmount(e)}
        value={quoteAmount}
        placeholder="Enter quote for project"
        numberInput></StyledTextInput>
      <View style={{height: 24}}></View>
      <StyledButton onPress={onSubmit}>Send to Founder</StyledButton>
    </Layout>
  );
}
