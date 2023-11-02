import React from 'react';

import styled from '@emotion/native';
import {Controller} from 'react-hook-form';

import {Text} from '../../../../../components/Text';
import {Textfield} from '../../../../../components/Textfield/Textfield';
import {type IFormSectionProps} from '../../../../../screens/my';
export const ModifyWeightSection = ({
  control,
  trigger,
  formState,
}: IFormSectionProps): React.JSX.Element => {
  return (
    <StyledSection>
      <StyledFieldContainer>
        <Controller
          control={control}
          name="weight"
          rules={{
            required: '몸무게를 입력해주세요',
            onChange: () => {
              void trigger('weight');
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Textfield
              label="몸무게"
              placeholder="0"
              keyboardType="numeric"
              textAlign="center"
              type="head2"
              maxLength={3}
              isError={formState.errors.weight != null}
              value={value?.toString()}
              onBlur={onBlur}
              onChangeText={text => {
                onChange(+text.toString().replace(/[^0-9]+/g, ''));
              }}
              errorMessage={formState.errors.weight?.message}
              rightElement={() => <Text text="kg" type="body2" />}
            />
          )}
        />
      </StyledFieldContainer>
    </StyledSection>
  );
};

const StyledSection = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  background-color: white;
`;

const StyledFieldContainer = styled.View`
  padding: 0 16px;
  gap: 20px;
`;
