import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {VotingController} from './VotingController';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

jest.mock('axios');

describe('VotingController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('checkIfUserVotedBefore', () => {
    it('should return true if the user has voted before', async () => {
      // Mock AsyncStorage response
      AsyncStorage.getItem.mockResolvedValue('mocked_cnic');

      // Mock axios response
      const axiosResponse = [
        {party: 'party1'},
        {party: 'party2'},
        {party: 'party3'},
      ];
      axios.get.mockResolvedValue({data: axiosResponse});

      const controller = new VotingController();
      const result = await controller.cheeckIfUserVotedBefore();

      expect(result).toBe(true);
      expect(AsyncStorage.getItem).toBeCalledWith('cnic');
      expect(axios.get).toBeCalledWith(
        'http://mocked_network_address:3000/api/voting/mocked_cnic',
      );
    });

    it('should return false if the user has not voted before', async () => {
      AsyncStorage.getItem.mockResolvedValue('mocked_cnic');
      axios.get.mockResolvedValue({data: null});

      const controller = new VotingController();
      const result = await controller.cheeckIfUserVotedBefore();

      expect(result).toBe(false);
      expect(AsyncStorage.getItem).toBeCalledWith('cnic');
      expect(axios.get).toBeCalledWith(
        'http://mocked_network_address:3000/api/voting/mocked_cnic',
      );
    });
  });

  describe('submitVote', () => {
    it('should return true if the vote is submitted successfully', async () => {
      AsyncStorage.getItem.mockResolvedValue('mocked_cnic');
      axios.post.mockResolvedValue({data: true});

      const controller = new VotingController();
      const result = await controller.submitVote('party1');

      expect(result).toBe(true);
      expect(AsyncStorage.getItem).toBeCalledWith('cnic');
      expect(axios.post).toBeCalledWith(
        'http://mocked_network_address:3000/api/submitVote/',
        {
          cnic: 'mocked_cnic',
          party: 'party1',
        },
      );
    });

    it('should return false if the vote submission fails', async () => {
      AsyncStorage.getItem.mockResolvedValue('mocked_cnic');
      axios.post.mockResolvedValue({data: false});

      const controller = new VotingController();
      const result = await controller.submitVote('party1');

      expect(result).toBe(false);
      expect(AsyncStorage.getItem).toBeCalledWith('cnic');
      expect(axios.post).toBeCalledWith(
        'http://mocked_network_address:3000/api/submitVote/',
        {
          cnic: 'mocked_cnic',
          party: 'party1',
        },
      );
    });
  });

  describe('calculateVote', () => {
    it('should return an array of vote counts for each party', async () => {
      const axiosResponse = [
        {'count(party)': 10},
        {'count(party)': 20},
        {'count(party)': 15},
      ];
      axios.get.mockResolvedValue({data: axiosResponse});

      const controller = new VotingController();
      const result = await controller.calculateVote();

      expect(result).toEqual([10, 20, 15]);
      expect(axios.get).toBeCalledWith(
        'http://mocked_network_address:3000/api/countVotes/1',
      );
      expect(axios.get).toBeCalledWith(
        'http://mocked_network_address:3000/api/countVotes/2',
      );
      expect(axios.get).toBeCalledWith(
        'http://mocked_network_address:3000/api/countVotes/3',
      );
    });
  });
});
