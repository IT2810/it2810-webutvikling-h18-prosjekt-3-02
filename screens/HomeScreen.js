import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SectionList,
  TextInput
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
/*import Header from "../components/Header/Header";*/
import { Header } from "react-native-elements";


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

  static navigationOptions = {
    header: null,
  };

  newNote(text) {
      let newArr = [{title: 'Test1', data: [text]}];
      this.setState({notes: [...this.state.notes, ...newArr]});

  }

  /*handleOptionPress = () =>{
      console.log("some message, change message");
  };*/

  render() {
    return (
      <View style={styles.container}>
          <Header /*onPress={this.handleOptionPress()}*/
                  leftComponent={{icon: "menu", color: "#fff"}}
                  centerComponent={{text: "GeoNotes", style: {color: "#fff"}}}
                  outerContainerStyles={{backgroundColor: "#E62117"}}
          />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.getStartedContainer}>
                {this._maybeRenderDevelopmentModeWarning()}

                <Text style={styles.getStartedText}>Get started by opening</Text>

                <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
                    <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
                </View>

                <UserTextInput
                    multiline = {true}
                    defaultValue = {'If it sounds like a snake, it\'s a mistake'}
                    numberOfLines = {4}
                    selectTextOnFocus = {true}
                    onChangeText={(text) => this.newNote(text)}/>

              <SectionListBasics
                  sections = {
                     this.state.notes
                    }
              />
            </View>

          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
      height: 44,
      backgroundColor: 'rgba(247,247,247,1.0)',
  },
  sectionContentContainer: {
      borderRadius: 25,
      borderWidth: 2,
      borderColor: '#73ad21',
  }
});
