import userDataReducer, {
    //UserDataState,
  } from './userDataSlice';
  
  describe('users reducer', () => {
    it('should handle initial state', () => {
      expect(userDataReducer(undefined, { type: 'unknown' })).toEqual({
        user: "No user selected.",
        status: 'idle',
      });
    });
  });
