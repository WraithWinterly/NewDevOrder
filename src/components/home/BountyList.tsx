import {TouchableOpacity, View} from 'react-native';
import {Colors} from 'src/styles/styles';
import {fromFireDate, formatTimeAgo} from 'src/utils/utils';
import StyledText from '../ui/styled/StyledText';
import {useEffect, useId, useState} from 'react';
import CashIcon from '../icons/CashIcon';
import TeamsIcon from '../icons/TeamsIcon';
import CalendarIcon from '../icons/CalendarIcon';
import RightArrowIcon from '../icons/RightArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

import useBountyStore from 'src/stores/bountyStore';
import Bubble from '../ui/Bubble';
import CheckIcon from '../icons/CheckIcon';
import WarningIcon from '../icons/WarningIcon';

import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import DropdownIcon from '../icons/DropdownIcon';
import useProjectsStore from 'src/stores/projectsStore';
import {Bounty, BountyStage, Project} from 'src/sharedTypes';

enum SortBy {
  Newest = 'Newest',
  Oldest = 'Oldest',
  HighToLow = '$ High to Low',
  LowToHigh = '$ Low to High',
}
enum SortBy2 {
  OpenBounties = 'Open bounties',
  ClosedBounties = 'Closed bounties',
  AllBounties = 'All bounties',
}

export default function BountyList({
  bounties,
  designerView,
  validatorView,
  noSort2,
}: {
  bounties: (Bounty & {
    project: Project;
  })[];
  designerView?: boolean;
  validatorView?: boolean;
  noSort2?: boolean;
}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();
  const id2 = useId();

  const setSelectedFullBounty = useBountyStore(
    state => state.setSelectedBounty,
  );
  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );

  const selectedProject = useProjectsStore(state => state.selectedProject);

  const [sorting, setSorting] = useState(SortBy.Newest);

  const [sorting2, setSorting2] = useState(
    noSort2 ? SortBy2.AllBounties : SortBy2.OpenBounties,
  );

  const [sortedBounties, setSortedBounties] = useState(bounties);

  useEffect(() => {
    let sorted = [...bounties];
    if (sorting === 'Newest') {
      sorted.sort(
        (a, b) =>
          fromFireDate(b.startDate).getTime() -
          fromFireDate(a.startDate).getTime(),
      );
    } else if (sorting === 'Oldest') {
      sorted.sort(
        (a, b) =>
          fromFireDate(a.startDate).getTime() -
          fromFireDate(b.startDate).getTime(),
      );
    } else if (sorting === '$ High to Low') {
      sorted.sort((a, b) => b.reward - a.reward);
    } else if (sorting === '$ Low to High') {
      sorted.sort((a, b) => a.reward - b.reward);
    }
    if (!noSort2) {
      if (sorting2 === 'Open bounties') {
        sorted = sorted.filter(bounty => bounty.stage === BountyStage.Active);
      } else if (sorting2 === 'Closed bounties') {
        sorted = sorted.filter(
          bounty => bounty.stage === BountyStage.Completed,
        );
      }
    }
    setSortedBounties(sorted);
  }, [sorting, sorting2, bounties]);

  return (
    <>
      {/* Sort by Menus */}
      {bounties.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 8,
          }}>
          <Menu style={{marginTop: 12, flex: noSort2 === true ? 0.5 : 1}}>
            <MenuTrigger>
              <View
                style={{
                  borderColor: Colors.BorderColor,
                  borderWidth: 2,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                }}>
                <StyledText style={{flex: 1}} truncate>
                  Sort by {sorting}
                </StyledText>
                <View style={{paddingTop: 4}}>
                  <DropdownIcon />
                </View>
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  backgroundColor: Colors.BackgroundLighter,
                  marginTop: 40,

                  borderRadius: 12,
                },
                optionsWrapper: {
                  backgroundColor: Colors.BackgroundDarker,
                  padding: 10,
                  borderRadius: 12,
                  width: 280,
                  gap: 10,
                },
              }}>
              <MenuOption onSelect={() => setSorting(SortBy.Newest)}>
                <View>
                  <StyledText
                    style={{
                      color:
                        sorting === SortBy.Newest
                          ? Colors.Primary
                          : Colors.Text,
                    }}>
                    Newest
                  </StyledText>
                </View>
              </MenuOption>
              <MenuOption onSelect={() => setSorting(SortBy.Oldest)}>
                <View>
                  <StyledText
                    style={{
                      color:
                        sorting === SortBy.Oldest
                          ? Colors.Primary
                          : Colors.Text,
                    }}>
                    Oldest
                  </StyledText>
                </View>
              </MenuOption>
              <MenuOption onSelect={() => setSorting(SortBy.HighToLow)}>
                <View>
                  <StyledText
                    style={{
                      color:
                        sorting === SortBy.HighToLow
                          ? Colors.Primary
                          : Colors.Text,
                    }}>
                    Bounty Reward (High to Low)
                  </StyledText>
                </View>
              </MenuOption>
              <MenuOption onSelect={() => setSorting(SortBy.LowToHigh)}>
                <View>
                  <StyledText
                    style={{
                      color:
                        sorting === SortBy.LowToHigh
                          ? Colors.Primary
                          : Colors.Text,
                    }}>
                    Bounty Reward (Low to High)
                  </StyledText>
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
          {!noSort2 && (
            <Menu style={{marginTop: 12, flex: 1}}>
              <MenuTrigger>
                <View
                  style={{
                    borderColor: Colors.BorderColor,
                    borderWidth: 2,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 12,
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                  }}>
                  <StyledText style={{flex: 1}} truncate>
                    {sorting2}
                  </StyledText>
                  <View style={{paddingTop: 4}}>
                    <DropdownIcon />
                  </View>
                </View>
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    backgroundColor: Colors.BackgroundLighter,
                    marginTop: 40,

                    borderRadius: 12,
                  },
                  optionsWrapper: {
                    backgroundColor: Colors.BackgroundDarker,
                    padding: 10,
                    borderRadius: 12,
                    width: 280,
                    gap: 10,
                  },
                }}>
                <MenuOption onSelect={() => setSorting2(SortBy2.OpenBounties)}>
                  <View>
                    <StyledText
                      style={{
                        color:
                          sorting2 === SortBy2.OpenBounties
                            ? Colors.Primary
                            : Colors.Text,
                      }}>
                      Open bounties
                    </StyledText>
                  </View>
                </MenuOption>
                <MenuOption
                  onSelect={() => setSorting2(SortBy2.ClosedBounties)}>
                  <View>
                    <StyledText
                      style={{
                        color:
                          sorting2 === SortBy2.ClosedBounties
                            ? Colors.Primary
                            : Colors.Text,
                      }}>
                      Closed bounties
                    </StyledText>
                  </View>
                </MenuOption>
                <MenuOption onSelect={() => setSorting2(SortBy2.AllBounties)}>
                  <View>
                    <StyledText
                      style={{
                        color:
                          sorting2 === SortBy2.AllBounties
                            ? Colors.Primary
                            : Colors.Text,
                      }}>
                      All bounties
                    </StyledText>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          )}
        </View>
      )}

      {sortedBounties.map((bounty, index) => (
        <View
          key={`${bounty.id}-${index}-${id}`}
          style={{
            backgroundColor: Colors.BackgroundLighter,
            padding: 18,
            borderRadius: 10,
            marginVertical: 10,
            gap: 8,
          }}>
          <StyledText style={{fontWeight: 'bold', fontSize: 20}}>
            {bounty.title}
          </StyledText>
          {designerView && bounty.stage === 'Active' && (
            <YouPostedThisBounty date={bounty.startDate} />
          )}
          {bounty.stage === 'Active' && (
            <StyledText
              style={{
                color: Colors.Text2,
                fontSize: 14,
                paddingVertical: 2,
              }}>
              Posted {formatTimeAgo(fromFireDate(bounty.startDate))}
            </StyledText>
          )}
          {validatorView &&
            bounty.stage === 'Active' &&
            (bounty.testCases.length === 0 ? (
              <BountyWarning text="Required action: Add test cases" />
            ) : (
              <BountyWarning text="Required action: Review Submissions" />
            ))}
          {bounty.stage === 'PendingApproval' && (
            <BountyWarning text="Pending Approval" />
          )}
          {/* {validatorView && bounty.stage === 'Active' && (
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                alignItems: 'center',
                paddingVertical: 8,
              }}>
              <WarningIcon />
              <StyledText>
                There are submissions that need to be reviewed.
              </StyledText>
            </View>
          )} */}

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}>
            <Bubble type="purple" text={bounty.project?.title} />
            {bounty.stage === 'Active' && (
              <Bubble type="green" text="Accepting Submissions" />
            )}
            {bounty.stage === 'Completed' && (
              <Bubble type="green" text="Completed" />
            )}

            {bounty.types.map((type, index) => (
              <Bubble type="normal" text={type} key={`type-${index}-${id2}`} />
            ))}
          </View>
          <StyledText
            style={{
              color: Colors.Text2,
              fontSize: 14,
              paddingVertical: 2,
            }}>
            {bounty.description}
          </StyledText>

          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <CashIcon />
            <StyledText style={{fontWeight: '500'}}>
              Bounty Reward: {bounty.reward} USD
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
              Deadline: {fromFireDate(bounty.deadline).toDateString()}
            </StyledText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 6,
              alignItems: 'center',
            }}>
            <TeamsIcon small />
            <StyledText>
              Teams Currently Hacking: {bounty.participantsTeamIDs.length}
            </StyledText>
          </View>
          {((bounty.stage === BountyStage.Active &&
            !designerView &&
            !validatorView) ||
            bounty.stage === 'Completed') && (
            <RoundArrowButton
              title="View Details"
              onPress={() => {
                setSelectedFullBounty(bounty.id);
                navigation.navigate('ViewBounty');
              }}
            />
          )}

          {designerView &&
            (bounty.stage === 'Draft' ? (
              <RoundArrowButton
                title="Continue Editing"
                onPress={() => {
                  setCreateBountyData({
                    aboutProject: bounty.aboutProject || '',
                    deadline: bounty.deadline,
                    description: bounty.description,

                    headerSections: bounty.headerSections,
                    id: bounty.id,
                    startDate: bounty.startDate,
                    projectID: bounty.projectID || selectedProject?.id || '',
                    reward: bounty.reward,
                    title: bounty.title,
                    types: bounty.types,
                  });
                  navigation.navigate('CreateBounty', {
                    existingID: bounty.id,
                  });
                }}
              />
            ) : (
              bounty.stage === 'Active' && (
                <RoundArrowButton
                  title="View Submissions"
                  onPress={() => {
                    setSelectedFullBounty(bounty.id);
                    navigation.navigate('ViewBounty');
                  }}
                />
              )
            ))}
          {validatorView &&
            bounty.stage === 'Active' &&
            (bounty.testCases.length === 0 ? (
              <RoundArrowButton
                title="View Bounty"
                onPress={() => {
                  setSelectedFullBounty(bounty.id);
                  navigation.navigate('ViewBounty', {
                    isValidator: true,
                  });
                }}
              />
            ) : (
              <RoundArrowButton
                title="View Submissions"
                onPress={() => {
                  setSelectedFullBounty(bounty.id);
                  navigation.navigate('ViewBounty', {
                    isValidator: true,
                  });
                }}
              />
            ))}
          {bounty.stage === 'PendingApproval' && (
            <RoundArrowButton
              title="View Approvals"
              onPress={() => {
                setSelectedFullBounty(bounty.id);
                navigation.navigate('ViewBounty');
              }}
            />
          )}
        </View>
      ))}
      {sortedBounties.length === 0 && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 64,
          }}>
          <StyledText style={{fontSize: 22, fontWeight: '500'}}>
            No Bounties were found.
          </StyledText>
        </View>
      )}
    </>
  );
}

function BountyWarning({text}: {text: string}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        paddingVertical: 8,
      }}>
      <WarningIcon />
      <StyledText>{text}</StyledText>
    </View>
  );
}

function RoundArrowButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 24,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginHorizontal: 22,
        paddingTop: 12,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          paddingVertical: 12,
          paddingHorizontal: 22,
          borderColor: Colors.BorderColor,
          borderWidth: 1,
          borderRadius: 50,
          width: '100%',
        }}
        onPress={onPress}>
        <StyledText
          style={{
            color: '#D0BCFF',
            alignItems: 'center',
          }}>
          {title}
        </StyledText>
        <RightArrowIcon />
      </TouchableOpacity>
    </View>
  );
}

function YouPostedThisBounty({date}: {date: Date}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        paddingVertical: 8,
      }}>
      <CheckIcon />
      <StyledText>
        You posted this bounty {formatTimeAgo(fromFireDate(date))}.
      </StyledText>
    </View>
  );
}
