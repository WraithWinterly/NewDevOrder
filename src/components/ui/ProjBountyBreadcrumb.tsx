import StyledText from './styled/StyledText';
import {Text} from 'react-native';
import {Bounty, Project} from 'src/sharedTypes';
import {Colors} from 'src/styles/styles';

export default function ProjBountyBreadcrumb({
  bounty,
}: {
  bounty: (Bounty & {project: Project}) | undefined;
}) {
  return (
    <StyledText
      style={{fontSize: 14, marginVertical: 8}}
      suspense
      trigger={bounty}
      shimmerWidth={140}>
      <Text style={{color: Colors.Gray[400]}}>{bounty?.project.title} / </Text>{' '}
      {bounty?.title}
    </StyledText>
  );
}
