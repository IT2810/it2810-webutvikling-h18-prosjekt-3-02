import React from 'react';
import NoteScreen from '../NoteScreen'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer
    .create(<NoteScreen/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});