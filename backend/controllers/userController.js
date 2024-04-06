const userService = require('../service/userService');
const {validationResult} = require('express-validator');
const ApiError = require('../error/api-error');
const User = require('../models/userModel');
const mailService = require('../service/mailService');

const lastMailSentTimes = {};

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при вылидации', errors.array()))
      }
      const {nickname, email, password, useragreement} = req.body;
      const userData = await userService.registration(nickname, email, password, useragreement, next);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при вылидации', errors.array()))
      }
      const {nickname, password} = req.body;
      const userData = await userService.login(nickname, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async sendMailMessage(req, res, next) {
    //! Нужно будет исправить КД для отправки сообщений или почитать хотя бы про это
    const MINUTE_IN_MS = 60000;
    const COOLDOWN_TIME = 5 * MINUTE_IN_MS;
    
    try {
      const userId = req.user.id;

      // Проверяем, существует ли уже время последней отправки для этого пользователя
      if (!(userId in lastMailSentTimes)) {
        lastMailSentTimes[userId] = 0; // Если нет, инициализируем его
      }

      const findUser = await User.findOne({ where: { id: userId } } )

      if (!findUser) {
        return res.status(400).json({ status: false, message: "Пользователь не найден!" })
      }
      const { activationLink, email } = findUser;

      if (findUser.isActivated) {
        return res.status(400).json({ status: false, message: "У вас уже активирована почта!" })
      }

      // Проверяем, прошло ли 5 минут с момента последней отправки
      if (Date.now() - lastMailSentTimes[userId] >= COOLDOWN_TIME) {
        await mailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/mail/activate/${activationLink}`)
        console.log("Сообщение успешно отправлено, пошёл на кд!");
        lastMailSentTimes[userId] = Date.now(); // Обновляем время последней отправки для этого пользователя
        return res.status(200).json({ status: true, message: "Сообщение отправлено!"});
      } else {
        // Если письмо отправлено менее 5 минут назад, возвращаем ошибку
        return res.status(400).json({ status: false, message: "Пожалуйста, подождите перед повторной отправкой." });
      }
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true});
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при вылидации', errors.array()))
      }

      const { oldPassword, newPassword, repeatedNewPassword } = req.body;
      const userId = req.user.id;

      const findUser = await User.findOne({ where: { id: userId } } )
      if (!findUser) {
        return res.status(400).json({ status: false, message: "Пользователь не найден!" })
      }
      // Проверка на схожесть новых паролей друг на друга
      if (newPassword !== repeatedNewPassword) {
        return res.status(400).json({ status: false, message: "Новый пароль и повторный пароль не совпадают!" })
      }
      // Проверка тот ли старый пароль у пользователя, и не совпадают ли старый и новые пароли
      await userService.checkPassword(oldPassword, newPassword, userId);
      // Обновление пароля
      await userService.changePassword(newPassword, userId);

      return res.status(200).json({ status: true, message: "Пароль успешно изменён!"});
    } catch (error) {
      next(error)
    }
  }

  async gettingOrderHistory(req, res, next) {
    try {
      const userNickname = req.user.nickname;

      const findUser = await User.findOne({ where: { nickname: userNickname } } )
      if (!findUser) {
        return res.status(400).json({ status: false, message: "Пользователь не найден!" })
      }

      const result = await userService.gettingOrderHistory(userNickname);

      return res.status(200).json({ status: true, result})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController();