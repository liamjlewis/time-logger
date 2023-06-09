import userInfoReducer, {
    UserInfoState,
  } from './userInfoSlice';
  
  describe('users reducer', () => {
    it('should handle initial state', () => {
      expect(userInfoReducer(undefined, { type: 'unknown' })).toEqual({
        user: "No user selected.",
        status: 'idle',
      });
    });
  });
