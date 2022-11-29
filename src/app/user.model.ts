// User Singup: RWTH Email로 최초 1회 인증(인증코드 발행 및 입력)
// User Login: Google Authentification(SocialAuthServiceConfig 모듈)

export class User {
  constructor(
    userId: string,  // user id
    nickName: string,  // nickname: 게시물에 표시되는 이름 / 수정 가능
    email: string  // 최초 인증 후 기록
  ){}
}
