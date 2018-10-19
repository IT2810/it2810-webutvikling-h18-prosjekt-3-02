import React from 'react';
import {NavigationEvents} from 'react-navigation'
import Loc from '../services/Location'
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TextInput,
  TouchableOpacity,
  Button,
  AsyncStorage,
} from 'react-native';

class UserTextInput extends React.Component {
    render() {
        return (
            <TextInput
                {...this.props}
            />
        )
    }
}

class MyListItem extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity onPress={() => console.log(this.key)}>
                <Text
                    style={styles.item}>
                    {this.props.text}
                </Text>
            </TouchableOpacity>
        )
    }
}

class ListWrapper extends React.PureComponent {
    _renderItem = ({item}) => (
        <MyListItem
            text={item}
        />
    );

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.props.sections}
                    renderItem={this._renderItem}
                    renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
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
            notes: [],
            index: 0,
            inLocation: false
        };
    }

    componentDidMount() {
      const locationGetter = new Loc();
      this.setState({inLocation: locationGetter._getLocationAsync()})
    }


    newNote(text) {
        let newArr = [{title: '', data: [text], key: this.indexCounter}];
        AsyncStorage.setItem(this.indexCounter.toString(), JSON.stringify(newArr));
        this.indexCounter += 1;
        this.sectionGetter();
        //this.setState({notes: [...this.state.notes, ...newArr]});
    }

    async getSections(keys) {
        let sectionArray = [];
         for (let i = 0; i<keys; i++) {
           const value = await AsyncStorage.getItem(i.toString());
           if (value !== null) {
             let note = JSON.parse(value)[0]
             if(note['key'] || this.state.inLocation) {
              sectionArray.push(note);
             }
           }
        }
       return sectionArray;
    }

    async sectionGetter() {
      let sec = [];
      let keyLength = 3;
      await AsyncStorage.getAllKeys((err, keys) => {
        keyLength = keys.length
      });
      sec = await this.getSections(keyLength+2)
      this.setState({notes: sec, index: keyLength});
    }

    async deleteAllNotes() {
       await AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiRemove(keys, (err) => {
            })
        });
        this.sectionGetter();
     }


    render() {
      const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
              <NavigationEvents
                onWillFocus={() => this.sectionGetter()}
              />
                <ListWrapper
                    sections={
                        this.state.notes
                    }
                />
              <View style={styles.buttonContainer}>
                <View style={{flex:1 , marginRight:10}}>
                  <Button
                      title={'New note'}
                      color="#15846f"
                      onPress={() => navigate('NewNote', {index: this.state.index})}
                  />
                </View>
                <View style={{flex:1}}>
                  <Button title={'Delete all notes'}
                          color="#aa3206"
                          onPress={() => this.deleteAllNotes()}/>
                </View>
              </View>
                {/*<UserTextInput*/}
                    {/*multiline={true}*/}
                    {/*placeholder={'If it sounds like a snake, it\'s a mistake'}*/}
                    {/*numberOfLines={4}*/}
                    {/*selectTextOnFocus={true}*/}
                    {/*onEndEditing={(event) => this.newNote(event.nativeEvent.text)}*/}
                {/*/>*/}
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
    buttonContainer: {
      flexDirection: 'row',
      paddingBottom: 50
    },
});
