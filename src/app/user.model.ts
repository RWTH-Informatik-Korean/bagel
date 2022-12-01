// User Singup: Authentification via RWTH mail(Verification code sent and enter the code)
// User Login: Google Authentification(SocialAuthServiceConfig Module from Aungular)

export class User {
  constructor(
    userId: string,  // user id
    userName: string,  // userName: name showed on card / editable
    email: string,  // RWTH email(store after verify for sing up)
    isSignedup: boolean  // information required when loggin in
  ){}
}
