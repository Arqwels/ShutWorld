const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '24h' });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  }

    validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(id, refreshToken) {
    let tokenData = await tokenModel.findOne({ where: id });
    if (tokenData) {
      // Если токен уже существует для данного пользователя, обновляем его
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    } else {
      // Если токена нет, создаем новый
      tokenData = await tokenModel.create({id, refreshToken});
    }
    return tokenData;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.destroy({
      where: { refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken) {
    try {
      const tokenData = await tokenModel.findOne({refreshToken});
      return tokenData;
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
