import React from 'react';

import styled from '@emotion/native';

import {type TPalette, type TTypography} from '../../assets/styles/emotion';
import {Text} from '../Text';

interface ICommonTag {
  type: 'xs' | 'sm' | 'md' | 'lg';
  fontWeight?: string;
  hasBorder: boolean;
  color?: TPalette;
  backgroundColor: TPalette;
  borderColor: TPalette;
}

export interface ITagProps extends ICommonTag {
  text: string;
}

export interface ITagsProps extends ICommonTag {
  texts: string[];
}

interface ITagTypeStyle {
  textType: TTypography;
  padding: string;
}

const tagTypeStyle: Record<string, ITagTypeStyle> = {
  xs: {
    textType: 'body3',
    padding: '2px 0px',
  },
  sm: {
    textType: 'body3',
    padding: '2px 6px',
  },
  md: {
    textType: 'body2',
    padding: '6px 18px',
  },
  lg: {
    textType: 'body1',
    padding: '8px 15px',
  },
};

const StyledTags = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const StyledTag = styled.View<ICommonTag>`
  background-color: ${props => props.theme.palette[props.backgroundColor]};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => tagTypeStyle[props.type].padding};
  border-width: 2px;
  border-color: ${props =>
    props.hasBorder
      ? props.theme.palette[props.borderColor]
      : props.theme.palette[props.backgroundColor]};
`;

export const Tag = ({
  type,
  hasBorder = false,
  color = 'gray-0',
  backgroundColor = 'gray-950',
  borderColor = 'gray-950',
  fontWeight = '700',
  text,
}: ITagProps): React.JSX.Element => {
  return (
    <StyledTags>
      <StyledTag
        type={type}
        hasBorder={hasBorder}
        backgroundColor={backgroundColor}
        borderColor={borderColor}>
        <Text
          type={tagTypeStyle[type].textType}
          color={color}
          fontWeight={fontWeight}
          text={text}
        />
      </StyledTag>
    </StyledTags>
  );
};

export const Tags = ({
  type,
  hasBorder = false,
  color = 'gray-0',
  backgroundColor = 'gray-950',
  borderColor = 'gray-950',
  fontWeight = '700',
  texts,
}: ITagsProps): React.JSX.Element => {
  return (
    <StyledTags>
      {texts.map((text, idx) => (
        <Tag
          key={`tag-${idx}`}
          type={type}
          hasBorder={hasBorder}
          color={color}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
          fontWeight={fontWeight}
          text={text}
        />
      ))}
    </StyledTags>
  );
};
