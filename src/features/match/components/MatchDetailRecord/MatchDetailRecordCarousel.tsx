import React from 'react';

import styled from '@emotion/native';
import {Dimensions} from 'react-native';

import {Carousel} from '../../../../components/Carousel';
import {Text} from '../../../../components/Text';

interface IMatchDetailRecordCarouselProps {
  data: string[];
}

interface IStyledStyledCarouselItem {
  screenWidth: number;
}

export const MatchDetailRecordCarousel = ({
  data,
}: IMatchDetailRecordCarouselProps): React.JSX.Element => {
  const screenWidth = Math.round(Dimensions.get('window').width);

  const carouselRenderItem = (value: any): React.JSX.Element => {
    return (
      <StyledCarouselItem screenWidth={screenWidth}>
        <Text type="body2" color="gray-0" fontWeight="600" text={value.item} />
      </StyledCarouselItem>
    );
  };

  return <Carousel data={data} renderItem={carouselRenderItem} />;
};

const StyledCarouselItem = styled.View<IStyledStyledCarouselItem>`
  width: ${props => `${props.screenWidth}px`};
  background-color: ${props => props.theme.palette['main-300']};
  padding: 18px 13px;
`;
