import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  header: {
    // backgroundColor: CONST.APP_THEME_COLOR,
    flexDirection: "row",
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 10,
    height: 50,

  },
  backIconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: 40,
  },
  titleTextStyle: {
    color: '#d3d3d3',
    fontSize: 22,
    textAlign: 'center',
  },
});
