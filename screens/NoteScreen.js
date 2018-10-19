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
  constructor(props) {
    super(props);
    this.state = {
      sTitle: '',
      sNote: ''
    };
  }

  componentDidMount() {
    if (this.props.key !== null) {

    }
  }

    title = ''
    note = ''
    unBound = true

    newNote(index) {
        let newArr = [{title: this.title, data: [this.note], key: this.unBound}];
        AsyncStorage.setItem(index.toString(), JSON.stringify(newArr));
    }

    render() {
      const {navigate} = this.props.navigation;
      const index = this.props.navigation.getParam('index', 0)
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
                            onPress={() => {
                              this.newNote(index);
                              navigate('Home')
                            }}
                            title="Submit"
                            color="#15846f"
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Button
                            onPress={() => console.log(this.unBound)}
                            title="Discard"
                            color="#aa3206"
                        />
                    </View>
                </KeyboardAvoidingView>
              <Button title={'Only see this note at school'} onPress={() => {this.unBound = false}}/>
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
     paddingBottom: 50
   },
   deleteContainer: {
       paddingRight: 10

   }


});
