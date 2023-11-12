import React, {useEffect} from 'react';

import Splash from 'react-native-splash-screen';

export const SplashScreen = (): React.JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      Splash.hide();
    }, 1500);
  }, []);

  return <></>;
};
