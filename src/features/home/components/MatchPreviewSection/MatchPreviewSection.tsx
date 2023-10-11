import React, {useState} from 'react';

import {Animated, Dimensions, View} from 'react-native';

import {MatchingPreviewDuelBattleSection} from './MatchingPreviewDuelBattleSection';
import {MatchingPreviewTeamBattleSection} from './MatchingPreviewTeamBattleSection';
import {MatchingPreviewTeamSection} from './MatchingPreviewTeamSection';
import {Tab, TabContent} from './Tab';

const {width} = Dimensions.get('window');

export const MatchPreviewSection = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [translateX] = useState(new Animated.Value(0));
  const [translateXTabOne] = useState(new Animated.Value(0));
  const [translateXTabTwo] = useState(new Animated.Value(width));
  const [translateXTabThree] = useState(new Animated.Value(width * 2));

  const handleSlide = (type: number): void => {
    Animated.spring(translateX, {
      toValue: type,
      useNativeDriver: false,
    }).start();

    const tabOne = Animated.spring(translateXTabOne, {
      toValue: type === 0 ? 0 : -width,
      useNativeDriver: false,
    });

    const tabTwo = Animated.spring(translateXTabTwo, {
      toValue: type === 1 ? 0 : type === 2 ? -width : width,
      useNativeDriver: false,
    });

    const tabThree = Animated.spring(translateXTabThree, {
      toValue: type === 2 ? 0 : width * 2,
      useNativeDriver: false,
    });

    Animated.parallel([tabOne, tabTwo, tabThree]).start();
  };

  const tabs = [
    {
      title: '1:1 매칭',
      tabContent: () => (
        <TabContent translateXTab={translateXTabOne}>
          <MatchingPreviewDuelBattleSection />
        </TabContent>
      ),
    },
    {
      title: '팀 매칭',
      tabContent: () => (
        <TabContent translateXTab={translateXTabTwo} translateY={-300}>
          <MatchingPreviewTeamBattleSection />
        </TabContent>
      ),
    },
    {
      title: '매칭안함',
      tabContent: () => (
        <TabContent translateXTab={translateXTabThree} translateY={-600}>
          <MatchingPreviewTeamSection />
        </TabContent>
      ),
    },
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 40,
            marginBottom: 20,
            height: 36,
            position: 'relative',
          }}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              title={tab.title}
              active={activeTab === index}
              onPress={() => {
                setActiveTab(index);
                handleSlide(index);
              }}
            />
          ))}
        </View>

        <View style={{height: 320}}>
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>{tab.tabContent()}</React.Fragment>
          ))}
        </View>
      </View>
    </View>
  );
};
