module.exports = class UserDto {
  id;
  nickname;
  isActivated;
  roles;
  constructor(model) {
    this.id = model.id;
    this.nickname = model.nickname;
    this.isActivated = model.isActivated;
    this.roles = model.roles;
  }
};