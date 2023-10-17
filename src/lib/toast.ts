import {type ColorValue} from 'react-native';
import _Toast from 'react-native-simple-toast';

interface IStylesIOS {
  textColor?: ColorValue;
  backgroundColor?: ColorValue;
}

interface IShowOption {
  message: string;
  duration?: number;
  gravity?: number;
  xOffset?: number;
  yOffset?: number;
  styles?: IStylesIOS;
}

const DEFAULT_IOS_TOAST_STYLES: IStylesIOS = {
  textColor: undefined,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
};

const DEFAULT_OFFSET_X: number = 0;
const DEFAULT_OFFSET_Y: number = -70;

const show = ({
  message,
  duration = _Toast.SHORT,
  gravity = _Toast.BOTTOM,
  xOffset = DEFAULT_OFFSET_X,
  yOffset = DEFAULT_OFFSET_Y,
  styles = DEFAULT_IOS_TOAST_STYLES,
}: IShowOption): void => {
  _Toast.showWithGravityAndOffset(
    message,
    duration,
    gravity,
    xOffset,
    yOffset,
    styles,
  );
};

const Toast = {
  show,
};

export default Toast;
