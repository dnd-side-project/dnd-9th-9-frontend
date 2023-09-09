import React, {useState} from 'react';

import styled from '@emotion/native';
import {TouchableOpacity, View} from 'react-native';

import {informationXmlData} from '../../../../assets/svg';
import {BottomSheet} from '../../../../components/BottomSheet';
import {CheckBox} from '../../../../components/CheckBox';
import {Gap} from '../../../../components/Gap';
import {Icon} from '../../../../components/Icon';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';

interface IMatchFilterItemProps {
  filterKey: 'memberCount' | 'goal' | 'period' | 'skillLevel' | 'strength';
  isCheck: boolean;
  label: string;
  onPressCheckBox: (
    key: 'memberCount' | 'goal' | 'period' | 'skillLevel' | 'strength',
  ) => void;
  children?: JSX.Element;
}

const BottomSheetContentMemberCount = (): React.JSX.Element => {
  return (
    <View>
      <Text
        type="body2"
        fontWeight="700"
        text="Q. 팀 인원수 최소-최대 인원은 몇명인가요?"
      />
      <Gap size="20px" />
      <Text
        type="body3"
        color="gray-700"
        fontWeight="400"
        text="최소인원수는 2명"
      />
      <Gap size="10px" />
      <Text
        type="body3"
        color="gray-700"
        fontWeight="400"
        text="최대 인원수는 10명 입니다. "
      />
      <Gap size="30px" />
    </View>
  );
};

const BottomSheetContentSkillLevel = (): React.JSX.Element => {
  return (
    <View>
      <Text
        type="body2"
        fontWeight="700"
        text="Q. 운동레벨의 기준은 무엇인가요?"
      />
      <Gap size="20px" />
      <Text
        type="body3"
        color="gray-700"
        fontWeight="400"
        text={`사람들마다 느끼는 기준이 다르기때문에,\n참고용으로 생각해주시면 됩니다`}
      />
      <Gap size="10px" />
      <Text
        type="body3"
        color="gray-700"
        fontWeight="400"
        text="초보 : 운동에 대해 어려움을 느낌"
      />
      <Gap size="10px" />
      <Text
        type="body3"
        color="gray-700"
        fontWeight="400"
        text="보통 : 운동을 숙지"
      />
      <Gap size="10px" />
      <Text
        type="body3"
        color="gray-700"
        fontWeight="400"
        text="보통 이상 : 운동 숙지 및 주기적인 운동"
      />
      <Gap size="10px" />
      <Text
        type="body3"
        color="gray-700"
        fontWeight="400"
        text="고수 : PT 없이 운동 가능"
      />
      <Gap size="30px" />
    </View>
  );
};

export const MatchFilterItem = ({
  filterKey,
  isCheck,
  label,
  onPressCheckBox,
  children,
}: IMatchFilterItemProps): React.JSX.Element => {
  const [informationModalVisible, setInformationModalVisible] = useState(false);

  const getInformationModalContent = (): React.JSX.Element => {
    switch (filterKey) {
      case 'memberCount':
        return <BottomSheetContentMemberCount />;
      case 'skillLevel':
        return <BottomSheetContentSkillLevel />;
      default:
        return <></>;
    }
  };

  return (
    <StyledMatchFilterItem>
      <StyledFlexWrapper style={{justifyContent: 'space-between'}}>
        <StyledFlexWrapper>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onPressCheckBox(filterKey);
            }}>
            <CheckBox isCheck={isCheck} />
          </TouchableOpacity>
          <Text type="body1" color="gray-950" fontWeight="500" text={label} />
        </StyledFlexWrapper>
        {(filterKey === 'skillLevel' || filterKey === 'memberCount') && (
          <TouchableOpacity
            onPress={() => {
              setInformationModalVisible(true);
            }}>
            <Icon svgXml={informationXmlData} />
          </TouchableOpacity>
        )}
      </StyledFlexWrapper>
      <Gap size="16px" />
      {children}
      <Gap size="33px" />
      <Line size="sm" />

      {(filterKey === 'skillLevel' || filterKey === 'memberCount') && (
        <BottomSheet
          isOpened={informationModalVisible}
          onOpen={() => {
            setInformationModalVisible(true);
          }}
          onClose={() => {
            setInformationModalVisible(false);
          }}>
          {getInformationModalContent()}
        </BottomSheet>
      )}
    </StyledMatchFilterItem>
  );
};

const StyledMatchFilterItem = styled.View`
  padding: 33px 16px 0 16px;
`;

const StyledFlexWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
