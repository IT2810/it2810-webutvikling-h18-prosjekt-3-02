import React from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Button,
    AsyncStorage,
    KeyboardAvoidingView
} from 'react-native';

export default class NoteScreen extends React.Component {

    title = ''
    note = ''
    indexCounter = 0

    newNote() {
        let newArr = [{title: this.title, data: [this.text], key: this.indexCounter}];
        AsyncStorage.setItem(this.indexCounter.toString(), JSON.stringify(newArr));
        this.indexCounter += 1;
}

    render() {
        return (
            <View>
                <TextInput
                    style={styles.titleContainer}
                    placeholder={'Title'}
                    onChangeText={(text) => this.title = text}
                />
                <TextInput
                    style={styles.noteContainer}
                    placeholder={'Take a note young Skywalker'}
                    underlineColorAndroid={'transparent'}
                    multiline={true}
                    onChangeText={(text) => this.note = text}

                />
                <KeyboardAvoidingView style={styles.buttonContainer} behavior="padding" enabled>
                    <View style={{flex:1 , marginRight:10}}>
                        <Button
                            onPress={() => this.newNote()}
                            title="Submit"
                            color="#15846f"
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Button
                            onPress={() => console.log('When did this turn into I love you???')}
                            title="Delete"
                            color="#aa3206"
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        )

    }

}

const styles = StyleSheet.create({
   titleContainer: {
       paddingTop: 40,
       paddingBottom: 20,
       paddingLeft: 10,
       fontWeight: 'bold',
       fontSize: 20,
   },
   noteContainer: {
       paddingTop: 10,
       paddingBottom: 20,
       paddingLeft: 10,
       fontSize: 16,
   },
   buttonContainer: {
       flexDirection: 'row',
   },
   deleteContainer: {
       paddingRight: 10

   }


});
