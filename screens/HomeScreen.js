import React from 'react';
import {
    setItem,
    getItem
} from '../services/Storage'
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    TextInput,
    TouchableOpacity,
    Button,
    AsyncStorage
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
            sectionIndex: 0
        };
    }

    indexCounter = 0

    newNote(text) {
      console.log('første hei')
        let newArr = [{title: '', data: [text], key: this.indexCounter}];
        AsyncStorage.setItem(this.indexCounter.toString(), JSON.stringify(newArr));
        this.indexCounter += 1;
        this.setState({sectionIndex: this.indexCounter});
        console.log('første index: ', this.state.sectionIndex, 'Index key er', this.indexCounter)
        this.sectionGetter();
        console.log('HEI')
        //this.setState({notes: [...this.state.notes, ...newArr]});
    }

    async getSections() {
        let sectionArray = [];
        console.log(this.state.sectionIndex)
         for (let i = 0; i<this.indexCounter; i++) {
           console.log('loop');
           const value = await AsyncStorage.getItem(i.toString());
           if (value !== null) {
             sectionArray.push(JSON.parse(value)[0]);
           }
        }
        console.log(sectionArray);
       return sectionArray;
    }

    async sectionGetter() {
      let sec = await this.getSections();
      this.setState({notes: sec});

    }

     deleteAllNotes() {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiRemove(keys, (err) => {
              this.indexCounter = 0
            })
        });
        this.sectionGetter();
     }

    render() {
        return (
            <View style={styles.container}>
                <ListWrapper
                    sections={
                        this.state.notes
                    }
                />
                <Button
                    title={'Delete all notes'}
                    onPress={() => this.deleteAllNotes()}
                />
                <UserTextInput
                    multiline={true}
                    placeholder={'If it sounds like a snake, it\'s a mistake'}
                    numberOfLines={4}
                    selectTextOnFocus={true}
                    onEndEditing={(event) => this.newNote(event.nativeEvent.text)}
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
});
