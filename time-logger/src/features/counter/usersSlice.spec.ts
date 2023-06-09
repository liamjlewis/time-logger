import usersReducer, {
    UsersState,
  } from './usersSlice';
  
  describe('users reducer', () => {
    it('should handle initial state', () => {
      expect(usersReducer(undefined, { type: 'unknown' })).toEqual({
        user: "No user selected.",
        status: 'idle',
      });
    });
  });
