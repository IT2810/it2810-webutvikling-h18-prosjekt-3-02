import React from 'react';
import Storage from 'services/Storage'
import {
    StyleSheet,
    Text,
    View,
    SectionList,
    TextInput,
    TouchableOpacity,
    Button,
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
            <TouchableOpacity onPress={() => console.log('WOW')}>
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
        let key = this.state.sectionIndex;
        let newArr = [{title: '', data: [text], key: key}];
        Storage.setItem(key.toString, newArr);
        key += 1;
        this.setState({sectionIndex: key});
        //this.setState({notes: [...this.state.notes, ...newArr]});

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
                    title={'New Note'}
                    onPress={() => console.log(this.state)}
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
