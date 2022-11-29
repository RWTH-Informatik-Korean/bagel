import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('userId1','nickName1','email')).toBeTruthy();
  });
});
