import React from 'react';
import {
    TextInput,
    StyleSheet,
    View,
    Button
} from 'react-native';

export default class NoteScreen extends React.Component {

    render() {
        return (
            <View>
                <TextInput
                    style={styles.titleContainer}
                    placeholder={'Title'}
                />
                <TextInput
                    style={styles.noteContainer}
                    placeholder={'Take a note young Skywalker'}
                    underlineColorAndroid={'transparent'}
                    multiline={true}

                />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1 , marginRight:10}}>
                        <Button
                            onPress={() => console.log('When did this turn into beautiful world???')}
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
                </View>
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
   submitContainer: {
       paddingLeft: 10
   },
   deleteContainer: {
       paddingRight: 10

   }


});
