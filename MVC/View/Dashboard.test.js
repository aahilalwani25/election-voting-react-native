import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from './Dashboard';

test('renders correctly', () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});
