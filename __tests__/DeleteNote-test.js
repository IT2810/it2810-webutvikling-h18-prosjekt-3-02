import 'react-native';
import React from 'react';
/*import [filen vi skal test] from "../src/[filen vi skal test]";*/

import renderer from 'react-test-renderer';
import HomeScreen from "../screens/HomeScreen";

//deleteAllNotes()

/*test("Note snapshot", ()=> {
    const snap = renderer.create(
        <HomeScreen/>
    ).toJSON();
    expect(snap).toMatchSnapshot();
});*/

test('placeholder', () => {
    expect(2*2).toBe(4);
});

// it('state test delenote', ()=>{
//     let noteData = renderer.create(<HomeScreen/>).getInstance();
//     expect(noteData.change().toEqual())
// });