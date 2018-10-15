import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TextInput
} from 'react-native';

class UserTextInput extends React.Component{
  render() {
    return(
      <TextInput
        {...this.props}
      />
    )
  }
}

class SectionListBasics extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections = {this.props.sections}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    renderSectionFooter={() => <Text>--------------------------------------------------</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{title: 'stateTest', data: ['HEIEHI']}],
    };
  }

  newNote(text) {
      let newArr = [{title: 'Test1', data: [text]}];
      this.setState({notes: [...this.state.notes, ...newArr]});

  }

  render() {
    return (
      <View style={styles.container}>
          <UserTextInput
              multiline = {true}
              placeholder = {'If it sounds like a snake, it\'s a mistake'}
              numberOfLines = {4}
              selectTextOnFocus = {true}
              onEndEditing={(event) => this.newNote(event.nativeEvent.text)}
          />
          <SectionListBasics
              sections = {
                  this.state.notes
                    }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
  },
  item: {
      padding: 8,
      fontSize: 18,
      backgroundColor: 'rgba(247,247,247,1.0)',
  },
  sectionContentContainer: {
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#73ad21',
  }
});
