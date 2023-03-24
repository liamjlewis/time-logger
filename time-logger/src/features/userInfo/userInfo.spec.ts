import usersReducer, {
    UserInfoState,
  } from './userInfoSlice';
  
  describe('users reducer', () => {
    it('should handle initial state', () => {
      expect(usersReducer(undefined, { type: 'unknown' })).toEqual({
        user: "No user selected.",
        status: 'idle',
      });
    });
  });
