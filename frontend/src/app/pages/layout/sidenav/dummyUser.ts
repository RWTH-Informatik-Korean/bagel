export interface dummyUser {
  userId?: string;
  username: string;
  googleID?: string;
  avatarUrl: string;
  isSignedup?: boolean;
  islogged?: boolean;
}

export const USERS: dummyUser = 
  {
    username: 'Jinny',
    avatarUrl: '../../assets/images/Avatar_1.png',
    googleID: 'hyejin.kang@rwth-aachen.de',
    islogged: true,
  }

