import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default StyleSheet.create({
  quotesScreenContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quotesTableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10,
  },
  errorContainer: {
    height: 30,
    backgroundColor: 'red',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quotesTableText: {
    fontSize: 12
  },
  quotesTableHeaderText: {
    fontWeight: 'bold'
  }
});