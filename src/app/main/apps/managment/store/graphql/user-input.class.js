export default class UserInputClass {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password;
    this.emailConfirmed = user.emailConfirmed;
    this.role = user.role;
    this.userBanStatus = user.userBanStatus;
    this.voucherCode = user.voucherCode;
    this.provider = user.provider;
  }
}
