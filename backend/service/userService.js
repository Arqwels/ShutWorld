const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../error/api-error')
const OrderRank = require('../models/Donate/orderRankModel')
const OrderHistory = require('../dtos/orderHistoryDto')
const RankDonate = require('../models/Donate/ranksModel')

class UserService {
  async registration(nickname,email,password,useragreement) {
    const candidate = await User.findOne({ where: { nickname } });
    if(candidate) {
      throw ApiError.BadRequest(`Пользователь с таким никнеймок ${nickname} уже зарегистрирован!`, {success: false, error: "Nickname busy"})
    }
    const hashPassword = await bcrypt.hash(password, 7)
    const activationLink = uuid.v4()

    const user = await User.create({nickname, email, useragreement, password: hashPassword, activationLink})
    await mailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/mail/activate/${activationLink}`)

    const userDto = new UserDto(user);
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

  async checkPassword(oldPassword, newPassword, userId) {
    const user = await User.findOne({ where: { id: userId } } )

    const isPassEquals = await bcrypt.compare(oldPassword, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль!', 'old-password');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw ApiError.BadRequest('Новый пароль совпадает со старым', 'new-password');
    }
  }

  async changePassword(password, userId) {
    const hashPassword = await bcrypt.hash(password, 7)
    await User.update({ password: hashPassword }, { where: { id: userId } });
  }

  async gettingOrderHistory(nickname) {
    const data = await OrderRank.findAll({
      where: { nickname: nickname }
    });

    if (!data || data.length === 0) {
      throw new ApiError.BadRequest('Данных не найдено', 'missing data');
    }

    const orderHistoryDto = [];

    for (const item of data) {
      const productName = await this.getProductNameById(item.idDonate);
      const orderHistoryItem = new OrderHistory({
        id: item.id,
        orderStatus: item.status,
        nickname: item.nickname,
        price: item.priceDonate,
        paymentMethod: item.paymentMethodLabel,
        productName: productName,
        date: item.createdAt
      });
      orderHistoryDto.push(orderHistoryItem);
    }
    return orderHistoryDto;
  }

  async getProductNameById(productId) {
    try {
      const product = await RankDonate.findOne({
        where: { id: productId }
      });

      if (!product) {
        throw new Error('Продукт с указанным id не найден');
      }

      return product.name;
    } catch (error) {
      console.error('Ошибка при получении имени продукта:', error);
      throw error;
    }
  }
}

module.exports = new UserService();