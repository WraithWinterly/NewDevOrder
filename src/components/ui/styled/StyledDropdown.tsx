import {ReactNode, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import StyledText from './StyledText';
import CollapsibleArrow from 'src/components/icons/CollapsibleArrow';
import Collapsible from 'react-native-collapsible';
import Separator from '../Separator';

export function DropdownSection({
  title,
  suspense = false,
  trigger,
  children,
}: {
  title: string;
  suspense?: boolean;
  trigger?: any;
  children: ReactNode;
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
          <StyledText
            style={{fontSize: 20, fontWeight: '500'}}
            suspense={suspense}
            trigger={trigger}
            shimmerWidth={180}>
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
