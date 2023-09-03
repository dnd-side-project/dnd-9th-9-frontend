import React, {useEffect, useState} from 'react';

import styled from '@emotion/native';
import {useNavigation} from '@react-navigation/native';
import {type NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FlatList, SafeAreaView, ScrollView, View} from 'react-native';

import {theme} from '../../../assets/styles/theme';
import {FilterButton} from '../../../components/Button/FilterButton';
import {Gap} from '../../../components/Gap';
import {ListItem} from '../../../components/List';
import {Searching} from '../../../components/Searching';
import {Text} from '../../../components/Text';
import {MatchingFloating} from '../../../features/match/components';
import {MatchFieldTypeFilterRadio} from '../../../features/match/components/MatchFilter';
import {useGetInfiniteFieldList} from '../../../features/match/hooks/field';
import {type IFieldListPaginationParams} from '../../../features/match/types';
import {type MatchStackParamList} from '../../../navigators/MatchNavigator';

export const MatchListScreen = ({
  pageSize,
  pageNumber,
  fieldType,
  goal,
  memberCount,
  period,
  skillLevel,
  strength,
}: IFieldListPaginationParams): React.JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MatchStackParamList>>();

  const [keyword, setKeyword] = useState('');
  const [activeFloating, setActiveFloating] = useState(false);

  const {
    data: fieldListData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetInfiniteFieldList({
    pageSize,
    pageNumber,
    fieldType,
    goal,
    memberCount,
    period,
    skillLevel,
    strength,
    keyword,
  });

  const totalListCount = fieldListData?.pages[0]?.totalCount ?? 0;

  const isFilterActive =
    goal.length > 0 ||
    (memberCount != null && memberCount > 0) ||
    period.length > 0 ||
    skillLevel.length > 0 ||
    strength.length > 0;

  useEffect(() => {
    void refetch();
  }, [keyword]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.palette['gray-0']}}>
      <ScrollView>
        <Gap size="20px" />
        <Searching
          placeholder="매칭 제목을 검색해주세요."
          handleSearch={keyword => {
            setKeyword(keyword);
          }}
        />

        <MatchFieldTypeFilterRadio
          pageSize={pageSize}
          pageNumber={pageNumber}
          fieldType={fieldType}
          goal={goal}
          memberCount={memberCount}
          period={period}
          skillLevel={skillLevel}
          strength={strength}
          keyword={keyword}
        />

        <StyledFlexView>
          <Text
            type="body3"
            text={`총 ${totalListCount}개의 매칭`}
            color="gray-700"
          />
          <FilterButton
            isActive={isFilterActive}
            onPress={() => {
              navigation.navigate('MatchFilter', {
                fieldType,
                goal,
                memberCount,
                period,
                skillLevel,
                strength,
                keyword: '',
              });
            }}
          />
        </StyledFlexView>

        {totalListCount <= 0 ? (
          <View>
            <Gap size="140px" />
            <Text
              type="body2"
              textAlign="center"
              color="gray-600"
              fontWeight="600"
              text="조건에 맞는 매칭이 없습니다."
            />
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={fieldListData?.pages.map(page => page.fieldsInfos).flat()}
            keyExtractor={(item, idx) => `match-${item.id}-${idx}`}
            renderItem={({item}) => (
              <ListItem
                key={`match-item-${item?.id}`}
                id={item?.id}
                currentSize={item?.currentSize}
                fieldType={item?.fieldType}
                goal={item?.goal}
                maxSize={item?.maxSize}
                name={item?.name}
                period={item?.period}
                profileImg={item?.profileImg}
                skillLevel={item?.skillLevel}
              />
            )}
            onEndReached={() => {
              if ((hasNextPage ?? false) && !isFetchingNextPage) {
                console.log('onEndReached 다음 패칭');
                void fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.7}
          />
        )}
      </ScrollView>

      <MatchingFloating
        isActive={activeFloating}
        openMenu={() => {
          setActiveFloating(true);
        }}
        closeMenu={() => {
          setActiveFloating(false);
        }}
        createMatch={() => {
          navigation.navigate('TeamInformation');
        }}
        autoMatch={() => {
          navigation.navigate('AutoMatch');
        }}
      />
    </SafeAreaView>
  );
};

const StyledFlexView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
`;
