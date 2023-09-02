import React, {useState} from 'react';

import styled from '@emotion/native';
import {type NativeStackScreenProps} from '@react-navigation/native-stack';
import dayjs from 'dayjs';

import {Button} from '../../../components/Button';
import {CheckBox} from '../../../components/CheckBox';
import {ConfirmModal} from '../../../components/Modal';
import {Text} from '../../../components/Text';
import {
  ImagePreviewer,
  InformationSection,
} from '../../../features/record/components/CreateWorkoutMemo';
import {usePostExercise} from '../../../features/record/hooks/exercise';
import {useSaveHealthKitExercise} from '../../../features/record/hooks/healthKit';
import {type RecordStackParamList} from '../../../navigators/RecordNavigator';
import useStore from '../../../store/client/useStore';

type Props = NativeStackScreenProps<RecordStackParamList, 'CreateWorkoutMemo'>;

export const CreateWorkoutMemoScreen = ({
  navigation,
}: Props): React.JSX.Element => {
  const [memoContent, setMemoContent] = useState('');
  const [isMemoPublic, setIsMemoPublic] = useState<boolean>(true);
  const [memoImgFile, setMemoImgFile] = useState<string | null>(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const {workoutForm, resetWorkoutForm} = useStore();

  const {mutateAsync: postExercise} = usePostExercise();
  const {mutateAsync: saveHealthKitExercise} = useSaveHealthKitExercise();

  const handlePressSubmit = (): void => {
    if (
      workoutForm.type === null ||
      workoutForm.hour === null ||
      workoutForm.minute === null
    )
      return;

    const body = {
      isMemoPublic,
      burnedCalorie: workoutForm.energyBurned,
      durationMinute: workoutForm.hour * 60 + workoutForm.minute,
      exerciseDate: dayjs().format('YYYY-MM-DD'),
      sports: workoutForm.type,
    };

    const optionalData = [memoContent, isMemoPublic, memoImgFile];
    optionalData.forEach(value => {
      const key = Object.keys({value})[0];
      Object.assign(body, {key, value});
    });

    void postExercise({
      body,
    });

    // TODO: 연동된 유저인지 확인 필요
    void saveHealthKitExercise({
      type: workoutForm.type,
      startDate: dayjs()
        .add(workoutForm.hour * -1, 'hour')
        .add(workoutForm.minute * -1, 'minute')
        .toISOString(),
      endDate: dayjs().toISOString(),
    });

    setIsOpenModal(true);
  };

  const handlePressConfirm = (): void => {
    setIsOpenModal(false);
    resetWorkoutForm();
    navigation.popToTop();
  };

  return (
    <StyledView>
      <StyledScrollView>
        <StyledMemoSection>
          <StyledTitleContainer>
            <Text text="메모하기" type="head3" fontWeight="600" />
            <Text text="[선택]" type="body2" fontWeight="600" />
          </StyledTitleContainer>

          <StyledPhotosContainer>
            <ImagePreviewer
              imageUri={memoImgFile}
              onChangeImageUri={uri => {
                setMemoImgFile(uri);
              }}
            />
          </StyledPhotosContainer>

          <StyledTextInput
            editable
            multiline
            numberOfLines={7}
            maxLength={200}
            onChangeText={text => {
              setMemoContent(text);
            }}
            value={memoContent}
          />

          <Text
            text="메모 공개여부"
            type="body2"
            fontWeight="600"
            style={{marginTop: 26}}
          />
          <Text
            text="비공개일 경우, 사진도 공개되지 않아요."
            type="body3"
            color="gray-600"
            style={{marginTop: 6}}
          />

          <StyledPublicCheckboxContainer>
            <CheckBox
              label="공개"
              isCheck={isMemoPublic}
              onPress={() => {
                setIsMemoPublic(true);
              }}
            />
            <CheckBox
              label="비공개"
              isCheck={!isMemoPublic}
              onPress={() => {
                setIsMemoPublic(false);
              }}
            />
          </StyledPublicCheckboxContainer>
        </StyledMemoSection>
        <InformationSection />
      </StyledScrollView>

      <StyledButtonWrapper>
        <Button
          text={
            memoContent.length > 0 && memoImgFile != null ? '완료' : '건너뛰기'
          }
          onPress={handlePressSubmit}
        />
      </StyledButtonWrapper>

      <ConfirmModal
        visible={isOpenModal}
        title="운동기록이 저장되었어요."
        subTitle="내 기록은 매칭된 팀에도 자동으로 등록돼요."
        handleConfirm={handlePressConfirm}
      />
    </StyledView>
  );
};

const StyledView = styled.ScrollView`
  flex: 1;
`;

const StyledScrollView = styled.ScrollView`
  background-color: ${({theme}) => theme.palette['gray-50']};
`;

const StyledMemoSection = styled.View`
  background-color: ${({theme}) => theme.palette['gray-0']};
  padding: 0 16px;
`;

const StyledTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledPhotosContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 42px;
`;

const StyledTextInput = styled.TextInput`
  background-color: ${({theme}) => theme.palette['gray-50']};
  padding: 16px;
  height: 192px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  border-radius: ${({theme}) => theme.borderRadius.md};
  margin-top: 18px;
  color: ${({theme}) => theme.palette['gray-700']};
`;

const StyledPublicCheckboxContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  margin: 26px 0;
`;

const StyledButtonWrapper = styled.View`
  flex: 1;
`;
