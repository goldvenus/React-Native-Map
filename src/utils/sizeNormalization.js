import { PixelRatio, Platform } from "react-native";
export function sizeNormalization(size) {
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(size))
    } else {
        if (PixelRatio.get() >= 4) {
            return Math.round(PixelRatio.roundToNearestPixel(size)) - 4
        }
        else if (PixelRatio.get() >= 3 && PixelRatio.get() < 4) {
            return Math.round(PixelRatio.roundToNearestPixel(size))
        }
        else if (PixelRatio.get() > 2 && PixelRatio.get() < 3) {
            return Math.round(PixelRatio.roundToNearestPixel(size)) - 2
        }
        else if (PixelRatio.get() == 2) {
            return Math.round(PixelRatio.roundToNearestPixel(size))
        }
        else {
            return Math.round(PixelRatio.roundToNearestPixel(size)) - 4
        }

    }
}

