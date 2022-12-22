// User Singup: Authentification via RWTH mail(Verification code sent and enter the code)
// User Login: Google Authentification(SocialAuthServiceConfig Module from Aungular)

export class User {
  userId: string;  // user id
  userName: string;  // userName: name showed on card / editable
  email: string;  // RWTH email(store after verify for sing up)
  userPictureUrl: string;  // URL for user profile photo (optional) 
  isSignedup: boolean;  // information required when loggin in
  
  constructor(userId: string, userName: string, email: string, userPictureUrl: string, isSignedup: boolean){
    this.userId = userId;
    this.userName = userName;
    this.email = email;
    // this property must set the default value (if user don't set own picture)
    this.userPictureUrl = userPictureUrl;
    this.isSignedup = false;
  }
}
