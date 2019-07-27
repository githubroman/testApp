import React from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from "react-navigation";
import { observer } from "mobx-react";
import PoloniexStore from '../stores/PoloniexStore';
import globalStyle from '../styles/globalStyle';

let intervalTimer = null;

const ErrorMessage = (props) => <View style={globalStyle.errorContainer}><Text>{props.message}</Text></View>

@observer
class QuotesTable extends React.Component {
  render() {
    const keys = this.props.store.lastData ? Object.keys(this.props.store.lastData) : null;
    if (keys || this.props.store.error)
      return (
        <View>
          {this.props.store.error && <ErrorMessage message={this.props.store.error} />}
          <ScrollView contentContainerStyle={globalStyle.quotesTableContainer}>
            <View>
              <Text style={globalStyle.quotesTableHeaderText}>Название</Text>
              { keys.map((key) => {
                return <Text key={key} style={globalStyle.quotesTableText}>{ key }</Text>
              }) }
            </View>
            <View>
              <Text style={globalStyle.quotesTableHeaderText}>last</Text>
              { keys.map((key) => {
                return <Text key={key} style={globalStyle.quotesTableText}>{ this.props.store.lastData[key].last }</Text>
              }) }
            </View>
            <View>
              <Text style={globalStyle.quotesTableHeaderText}>highestBid</Text>
              { keys.map((key) => {
                return <Text key={key} style={globalStyle.quotesTableText}>{ this.props.store.lastData[key].highestBid }</Text>
              }) }
            </View>
            <View>
              <Text style={globalStyle.quotesTableHeaderText}>percentChange</Text>            
              { keys.map((key) => {
                return <Text key={key} style={globalStyle.quotesTableText}>{ this.props.store.lastData[key].percentChange }</Text>
              }) }
            </View>            
          </ScrollView>
        </View>
        
      )
    else
      return (
        <View style={globalStyle.waitingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
  }
}

export default QuotesScreen = withNavigationFocus(class extends React.Component {
  componentDidMount() {
    PoloniexStore.getLastValues();
  }
  componentDidUpdate() {
    if (this.props.isFocused)
      intervalTimer = setInterval(() => {
        PoloniexStore.getLastValues();
      }, 5000);
    else
      clearInterval(intervalTimer);
  }
  render() {
    return (
      <View style={globalStyle.quotesScreenContainer}>
        <QuotesTable store={PoloniexStore} />
      </View>
    );
  }
})

QuotesScreen.navigationOptions = {
  header: null,
};
