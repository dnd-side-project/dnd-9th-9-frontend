import {useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  AppleHealthKit,
  observeNewWorkout,
  HealthInputOptions,
} from '../../lib/AppleHealthKit';

export function RecordsTabScreen() {
  // example code
  useEffect(() => {
    const options: HealthInputOptions = {
      // TODO: time 관련 library
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
      anchor: 'base64encodedstring',
    };

    AppleHealthKit.getAnchoredWorkouts(options, (err, results) => {
      console.log(results.data);
    });

    observeNewWorkout(() => {
      AppleHealthKit.getAnchoredWorkouts(options, (err, results) => {
        console.log(results.data);
      });
    });
  }, []);

  return (
    <View>
      <Text>운동 기록 뷰</Text>
    </View>
  );
}
