import React from 'react';

import styled from '@emotion/native';
import {View} from 'react-native';

import {theme} from '../../../../assets/styles/theme';
import {fireScoreXmlData} from '../../../../assets/svg';
import {Gap} from '../../../../components/Gap';
import {Icon} from '../../../../components/Icon';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';
import {useGetMyProfileDetail} from '../../hooks/profile';

export const ResignationAchievementCard = (): React.JSX.Element => {
  const {data: myProfileDetail} = useGetMyProfileDetail();

  return (
    <StyledCard>
      <StyledHorizontal>
        {myProfileDetail?.profileImg != null ? (
          <StyledProfileImage source={{uri: myProfileDetail.profileImg}} />
        ) : (
          <StyledProfileImagePlaceholder />
        )}
        <Gap size="16px" />
        <View>
          <Text
            text={`그동안 ${myProfileDetail?.name ?? '회원'}님의 활동`}
            color="gray-700"
            type="body1"
            fontWeight="600"
          />
          <Gap size="8px" />
          <StyledHorizontal>
            <Icon
              svgXml={fireScoreXmlData}
              height={20}
              width={20}
              color={theme.palette['main-400']}
            />
            <Text
              text={myProfileDetail?.teamworkRate.toString() ?? '0'}
              color="gray-700"
              type="body2"
              fontWeight="800"
            />
            <Text text="불꽃" color="gray-700" type="body2" />
          </StyledHorizontal>
        </View>
      </StyledHorizontal>

      <Gap size="18px" />
      <Line size="xs" color="gray-300" />
      <Gap size="18px" />

      <View style={{gap: 8}}>
        <StyledHorizontal style={{justifyContent: 'space-between'}}>
          <Text text="활동 일수" type="body2" color="gray-700" />
          <StyledHorizontal style={{gap: 2}}>
            {/* TODO(@minimalKim): 모든 활동일수 갯수 API 요청 */}
            <Text text={'24'} type="body2" color="gray-700" fontWeight="700" />
            <Text text="일" type="body2" color="gray-700" />
          </StyledHorizontal>
        </StyledHorizontal>
        <StyledHorizontal style={{justifyContent: 'space-between'}}>
          <Text text="운동기록" type="body2" color="gray-700" />
          {/* TODO(@minimalKim): 모든 운동기록 갯수 API 요청 */}
          <StyledHorizontal style={{gap: 2}}>
            <Text text={'24'} type="body2" color="gray-700" fontWeight="700" />
            <Text text="회" type="body2" color="gray-700" />
          </StyledHorizontal>
        </StyledHorizontal>
        <StyledHorizontal style={{justifyContent: 'space-between'}}>
          {/* TODO(@minimalKim): /user-field/completed 사용 */}
          <Text text="매칭" type="body2" color="gray-700" />
          <StyledHorizontal style={{gap: 2}}>
            <Text text={'24'} type="body2" color="gray-700" fontWeight="700" />
            <Text text="회" type="body2" color="gray-700" />
          </StyledHorizontal>
        </StyledHorizontal>
        {/* NOTE: 뱃시 MVP 제외 */}
      </View>
    </StyledCard>
  );
};

const StyledHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const StyledCard = styled.View`
  padding: 20px 24px;
  border-radius: 22px;
  border: 1px solid ${({theme}) => theme.palette['gray-300']};
`;

const StyledProfileImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const StyledProfileImagePlaceholder = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.palette['gray-300']};
`;
