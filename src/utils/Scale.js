import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');
import * as AppConstants from './AppConstants';


export default function (units = 1) {
    return width / AppConstants.SCREEN_WIDTH * units;
}


const verticalScale = size => height / AppConstants.SCREEN_HEIGHT * size;

export { verticalScale };


