import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import Scale from '../utils/Scale';
import Colors from '../assets/Colors';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        height: height,
        width: width,
        zIndex: 25,
    },
    loader: {
        height: Scale(100),
        width: Scale(100),
        borderRadius: Scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
});

const Loader = (props) => (
    // <Container>
    <View style={[styles.container, { marginBottom: props.marginBottom, }]}>
        <View style={styles.loader}>
            <ActivityIndicator
                size="large"
                color={Colors.Blue}
            />
        </View>
    </View>
    // </Container>
);
export default Loader;
