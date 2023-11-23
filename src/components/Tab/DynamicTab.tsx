import React, {useEffect, useState} from 'react';

import {Animated, Dimensions, View} from 'react-native';

import {Tab} from './Tab';
import {TabContent} from './TabContent';

const {width} = Dimensions.get('window');

interface TabData {
  title: string;
  tabContent: () => JSX.Element;
}

interface IDynamicTabProps {
  tabs: TabData[];
  defaultActiveTab?: number;
}

export const DynamicTab: React.FC<IDynamicTabProps> = ({
  tabs,
  defaultActiveTab = 0,
}) => {
  const [activeTab, setActiveTab] = useState<number>(defaultActiveTab);

  const translateXValues = tabs.map(_ => new Animated.Value(width));

  const handleSlide = (type: number): void => {
    const animations = tabs.map((_, index) => {
      return Animated.spring(translateXValues[index], {
        toValue: index === type ? 0 : index < type ? -width : width,
        useNativeDriver: false,
      });
    });

    Animated.parallel(animations).start();
  };

  useEffect(() => {
    handleSlide(activeTab);
  }, [activeTab]);

  return (
    <View style={{flex: 1}}>
      <View style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
        <View
          style={{
            position: 'relative',
            flexDirection: 'row',
            marginBottom: 20,
            height: 36,
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

        <View style={{position: 'relative', minHeight: 320}}>
          {tabs.map((tab, index) => (
            <TabContent
              key={index}
              translateXTab={translateXValues[index]}
              style={{position: 'absolute', top: 0, left: 0, right: 0}}>
              {tab.tabContent()}
            </TabContent>
          ))}
        </View>
      </View>
    </View>
  );
};
