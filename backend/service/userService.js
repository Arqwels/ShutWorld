const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../error/api-error')

class UserService {
  async registration(nickname,email,password,useragreement) {
    const candidate = await User.findOne({ where: { nickname } });
    if(candidate) {
      throw ApiError.BadRequest(`Пользователь с таким никнеймок ${nickname} уже зарегистрирован!`, {success: false, error: "Nickname busy"})
    }
    const hashPassword = await bcrypt.hash(password, 7)
    const activationLink = uuid.v4()

    const user = await User.create({nickname, email, useragreement, password: hashPassword, activationLink})
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/mail/activate/${activationLink}`)

    const userDto = new UserDto(user); // id, nickname, isActivated
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {...tokens, user: userDto}
  }

  async activate(activationLink) {
    const user = await User.findOne({ where: { activationLink } })
    if(!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации')
    }
    user.isActivated = true;
    await user.save();
  }

  async login(nickname, password) {
    const user = await User.findOne({ where: { nickname }})
    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден!', ['user']);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль!', ['password']);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto};
  }

  // Данный logout нужен для удаления refreshToken`а из cookie
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    try {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      console.log("Ошибка в bakend/service/userService = 25")
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto};
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserService();