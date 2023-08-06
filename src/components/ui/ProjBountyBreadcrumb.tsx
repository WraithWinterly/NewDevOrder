import {Bounty, Project} from 'prisma/generated';
import StyledText from './styled/StyledText';
import {Text} from 'react-native';
import {Colors} from 'src/styles/styles';

export default function ProjBountyBreadcrumb({
  bounty,
}: {
  bounty: (Bounty & {project: Project}) | undefined;
}) {
  return (
    <StyledText style={{fontSize: 14, marginVertical: 8}}>
      <Text style={{color: Colors.Gray[400]}}>{bounty?.project.title} / </Text>{' '}
      {bounty?.title}
    </StyledText>
  );
}
