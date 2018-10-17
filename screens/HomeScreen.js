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

    newNote(text) {
        let indexKey = this.state.sectionIndex;
        let newArr = [{title: '', data: [text], key: indexKey.toString()}];
        AsyncStorage.setItem(indexKey.toString(), JSON.stringify(newArr));
        indexKey += 1;
        this.setState({sectionIndex: indexKey});
        //this.setState({notes: [...this.state.notes, ...newArr]});
    }

    async getSections() {
        let sectionArray = [];
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    let value = JSON.parse(store[i][1]);
                    sectionArray.push(value)
                    //console.log('1');
                    //console.log(sectionArray[0])
                })
            });
        });
       return sectionArray;
    }

     async deleteAllNotes() {
        console.log('ok');
        console.log(await this.getSections());
        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiRemove(keys, (err) => {
        //         this.setState({sectionIndex: 0})
        //     })
        // });
    }

    render() {
        return (
            <View style={styles.container}>
                <ListWrapper
                    sections={
                        this.state.notes
                        //this.getSections()
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
