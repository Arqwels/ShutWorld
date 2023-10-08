// const jwt = require('jsonwebtoken')
// const tokenModel = require('../models/tokenModel')

// class TokenService {
//   generateTokens(payload) {
//     const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '5s'})
//     const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '10s'})
//     return {
//       accessToken,
//       refreshToken
//     }
//   }

//   validateAccessToken(token) {
//     try {
//       const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
//       return userData;
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         // Токен истек
//         console.log('Access token has expired');
//       } else if (error.name === 'JsonWebTokenError') {
//         // Ошибка валидации токена
//         console.log('Invalid access token');
//       } else {
//         // Другая ошибка
//         console.error('Error validating access token:', error.message);
//       }
//       console.log("Ошибка в валидейтрефрештокене 42");
//       console.log(error);
//       return null;
//     }
//   }
  
//   validateRefreshToken(token) {
//     try {
//       const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
//       return userData;
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         // Токен истек
//         console.log('Refresh token has expired');
//       } else if (error.name === 'JsonWebTokenError') {
//         // Ошибка валидации токена
//         console.log('Invalid refresh token');
//       } else {
//         // Другая ошибка
//         console.error('Error validating refresh token:', error.message);
//       }
//       console.log("Ошибка в валидейтрефрештокене 44");
//       console.log(error);
//       return null;
//     }
//   }
  

//   async saveToken(userId, refreshToken) {
//     try {
//       const tokenData = await tokenModel.findOne({ where: { id: userId } });
//       if (tokenData) {
//         tokenData.refreshToken = refreshToken
//         return tokenData.save()
//       }
//       const token = await tokenModel.create({id: userId, refreshToken})
//       return token;
//     } catch (error) {
//       console.log("Ошибка в backend/service/tokenService = 35");
//       console.log(error);
//     }
//   }

//   async removeToken(refreshToken) {
//     const tokenData = await tokenModel.destroy({ where: { refreshToken } })
//     return tokenData;
//   }

//   async findToken(refreshToken) {
//     try {
//       const tokenData = await tokenModel.findOne({ where: { refreshToken } });
//       console.log('Результат поиска токена в базе данных:', tokenData);
//       return tokenData;
//     } catch (error) {
//       console.log("Ошибка номер 64");
//       console.log(error);
//     }
//   }
  
// }

// module.exports = new TokenService();\




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
      const tokenData = await tokenModel.findOne({
        where: { refreshToken },
      });
      if (!tokenData) {
        const tokenData = await tokenModel.findOne({
          where: { refreshToken },
        });
      }
      return tokenData;
    } catch (error) {
      console.log(error);
    }
  }

//   async findToken(refreshToken) {
//     try {
//       const tokenData = await tokenModel.findOne({ where: { refreshToken } });
//       console.log('Результат поиска токена в базе данных:', tokenData);
//       return tokenData;
//     } catch (error) {
//       console.log("Ошибка номер 64");
//       console.log(error);
//     }
//   }

}

module.exports = new TokenService();
