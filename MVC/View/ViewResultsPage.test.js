import React from 'react';
import renderer from 'react-test-renderer';
import ViewResultsPage from './ViewResultsPage';

// Mock dependencies and functions used in the component
jest.mock('../Controller/VotingController', () => ({
  VotingController: jest.fn().mockImplementation(() => ({
    calculateVote: jest.fn().mockResolvedValue({party1: 10, party2: 15}),
  })),
}));
jest.mock('../Model/PoliticalParties', () => ({
  PoliticalParties: jest.fn().mockImplementation(() => ({
    parties: [
      {id: 1, name: 'Party 1', picture: 'party1.png'},
      {id: 2, name: 'Party 2', picture: 'party2.png'},
    ],
  })),
}));

describe('ViewResultsPage', () => {
  beforeEach(() => {
    // Clear mock function calls and instances before each test
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer.create(<ViewResultsPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('extracts votes and updates state', async () => {
    const instance = renderer.create(<ViewResultsPage />).getInstance();

    // Simulate componentDidMount and componentDidUpdate lifecycle methods
    await instance.componentDidMount();
    await instance.componentDidUpdate();

    expect(instance.state.data).toEqual({party1: 10, party2: 15});
  });
});
