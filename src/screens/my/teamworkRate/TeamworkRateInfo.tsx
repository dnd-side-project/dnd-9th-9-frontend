import React from 'react';

import styled from '@emotion/native';
import {SafeAreaView} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {fireScoreXmlData} from '../../../assets/svg';
import {Gap} from '../../../components/Gap';
import {Icon} from '../../../components/Icon';
import {Text} from '../../../components/Text';
import {TopBar} from '../../../components/TopBar';
import {FLAMES} from '../../../features/my/const';

export const TeamworkRateInfo = (): React.JSX.Element => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: theme.palette['gray-0']}} />
      <TopBar showBackButton headerText="불꽃 히스토리" />
      <StyledScrollView>
        <StyledVertical style={{padding: 18, paddingTop: 30}}>
          <StyledVertical gap={8}>
            <StyledHorizontal gap={8}>
              <Icon
                width={20}
                height={26}
                svgXml={fireScoreXmlData}
                color={theme.palette['main-400']}
              />
              <Text
                text="불꽃은 어떻게 얻나요?"
                fontWeight="700"
                color="gray-800"
              />
            </StyledHorizontal>
            <Text
              text="불꽃은 매칭에 참여한 이후 다른 사람들로부터 좋은 평가를 받으면 주어져요. 매칭을 열정적으로 참여할수록 높은불꽃 점수를 얻을 가능성이 높아져요. 대결에서 이기지 못하더라도 상대방이나 팀원이 나를 좋게 평가하면 불꽃을 많이 얻을 수 있으니 낙담하거나 포기하지 마세요!"
              color="gray-800"
              lineHeight="22.4px"
            />
          </StyledVertical>
          <Gap size="16px" />

          <StyledVertical gap={10}>
            <StyledVertical gap={4}>
              <Text
                text="· 1:1 대결의 경우"
                fontWeight="700"
                color="gray-800"
              />
              <StyledDescription>
                <Text
                  text="대결했던 상대방이 대결 후 나를 평가해요."
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>

            <StyledVertical gap={4}>
              <Text
                text="· 팀 대결, 매칭 없는 팀의 경우"
                fontWeight="700"
                color="gray-800"
              />
              <StyledDescription>
                <Text
                  text="함께 달려왔던 팀원들이 평가한 팀워크를 합산한 후 평균값만큼의 불꽃을 얻어요."
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>

            <StyledVertical gap={4}>
              <Text text="· 불꽃 레벨 계산" fontWeight="700" color="gray-800" />
              <StyledDescription>
                <Text
                  text="내가 참여한 모든 매칭 당 받은 불꽃의 평균이 나의 최종 불꽃 레벨로 계산돼요."
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>
          </StyledVertical>
          <Gap size="40px" />

          {/* <View style={{height: 48, width: 48, backgroundColor: 'red'}} /> */}

          <StyledVertical gap={8}>
            <StyledHorizontal gap={8}>
              <Icon
                width={20}
                height={26}
                svgXml={fireScoreXmlData}
                color={theme.palette['main-400']}
              />
              <Text
                text="승률은 어떻게 높이나요?"
                fontWeight="700"
                color="gray-800"
              />
            </StyledHorizontal>
            <Text
              text="1:1 매칭이나 팀 매칭에서 많은 승리를 거둘수록 나의 승률이 높아져요. 매칭 없는 팀에서의 활동은 승률에 영향을 미치지 않아요."
              color="gray-800"
              lineHeight="22.4px"
            />
          </StyledVertical>
          <Gap size="40px" />

          <StyledVertical gap={28}>
            <StyledHorizontal gap={8}>
              <Icon
                width={20}
                height={26}
                svgXml={fireScoreXmlData}
                color={theme.palette['main-400']}
              />
              <Text text="불꽃 종류" fontWeight="700" color="gray-800" />
            </StyledHorizontal>

            <StyledVertical gap={2}>
              <StyledHorizontal gap={8}>
                <StyledCircle backgroundColor={theme.palette.black}>
                  <Icon
                    width={16}
                    height={22}
                    svgXml={fireScoreXmlData}
                    color={FLAMES.white.color}
                  />
                </StyledCircle>
                <Text
                  text={FLAMES.white.title}
                  fontWeight="700"
                  color="gray-800"
                />
              </StyledHorizontal>
              <StyledDescription style={{marginLeft: 40}}>
                <Text
                  text={FLAMES.white.description}
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>

            <StyledVertical gap={2}>
              <StyledHorizontal gap={8}>
                <StyledCircle borderWidth={2}>
                  <Icon
                    width={16}
                    height={22}
                    svgXml={fireScoreXmlData}
                    color={FLAMES.black.color}
                  />
                </StyledCircle>
                <Text
                  text={FLAMES.black.title}
                  fontWeight="700"
                  color="gray-800"
                />
              </StyledHorizontal>
              <StyledDescription style={{marginLeft: 40}}>
                <Text
                  text={FLAMES.black.description}
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>

            <StyledVertical gap={2}>
              <StyledHorizontal gap={8}>
                <StyledCircle borderWidth={2}>
                  <Icon
                    width={16}
                    height={22}
                    svgXml={fireScoreXmlData}
                    color={FLAMES.purple.color}
                  />
                </StyledCircle>
                <Text
                  text={FLAMES.purple.title}
                  fontWeight="700"
                  color="gray-800"
                />
              </StyledHorizontal>
              <StyledDescription style={{marginLeft: 40}}>
                <Text
                  text={FLAMES.purple.description}
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>

            <StyledVertical gap={2}>
              <StyledHorizontal gap={8}>
                <StyledCircle borderWidth={2}>
                  <Icon
                    width={16}
                    height={22}
                    svgXml={fireScoreXmlData}
                    color={FLAMES.blue.color}
                  />
                </StyledCircle>
                <Text
                  text={FLAMES.blue.title}
                  fontWeight="700"
                  color="gray-800"
                />
              </StyledHorizontal>
              <StyledDescription style={{marginLeft: 40}}>
                <Text
                  text={FLAMES.blue.description}
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>

            <StyledVertical gap={2}>
              <StyledHorizontal gap={8}>
                <StyledCircle borderWidth={2}>
                  <Icon
                    width={16}
                    height={22}
                    svgXml={fireScoreXmlData}
                    color={FLAMES.red.color}
                  />
                </StyledCircle>
                <Text
                  text={FLAMES.red.title}
                  fontWeight="700"
                  color="gray-800"
                />
              </StyledHorizontal>
              <StyledDescription style={{marginLeft: 40}}>
                <Text
                  text={FLAMES.red.description}
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>

            <StyledVertical gap={2}>
              <StyledHorizontal gap={8}>
                <StyledCircle borderWidth={2}>
                  <Icon
                    width={16}
                    height={22}
                    svgXml={fireScoreXmlData}
                    color={FLAMES.green.color}
                  />
                </StyledCircle>
                <Text
                  text={FLAMES.green.title}
                  fontWeight="700"
                  color="gray-800"
                />
              </StyledHorizontal>
              <StyledDescription style={{marginLeft: 40}}>
                <Text
                  text={FLAMES.green.description}
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>

            <StyledVertical gap={2}>
              <StyledHorizontal gap={8}>
                <StyledCircle backgroundColor={theme.palette['gray-100']}>
                  <Icon
                    width={16}
                    height={22}
                    svgXml={fireScoreXmlData}
                    color={FLAMES.gray.color}
                  />
                </StyledCircle>
                <Text
                  text={FLAMES.gray.title}
                  fontWeight="700"
                  color="gray-800"
                />
              </StyledHorizontal>
              <StyledDescription style={{marginLeft: 40}}>
                <Text
                  text={FLAMES.gray.description}
                  color="gray-600"
                  lineHeight="22.4px"
                />
              </StyledDescription>
            </StyledVertical>
          </StyledVertical>
        </StyledVertical>
      </StyledScrollView>
    </>
  );
};

const StyledHorizontal = styled.View<{gap?: number}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({gap}) => gap};
`;

const StyledVertical = styled.View<{gap?: number}>`
  display: flex;
  gap: ${({gap}) => gap};
`;

const StyledScrollView = styled.ScrollView`
  background-color: ${({theme}) => theme.palette['gray-0']};
  flex: 1;
`;

const StyledDescription = styled.View`
  margin-left: 10px;
`;

const StyledCircle = styled.View<{
  backgroundColor?: string;
  borderWidth?: number;
}>`
  background-color: ${({backgroundColor}) => backgroundColor};
  border-width: ${({borderWidth}) => borderWidth};
  border-color: ${({theme}) => theme.palette['gray-100']};
  border-radius: 16px;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
