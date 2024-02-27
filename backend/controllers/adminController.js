const User = require("../models/userModel");

class AdminController {
	async getUsers(req, res) {
		try	{
			const users = await User.findAll()
			res.json(users)
		} catch (e) {
			console.log(e);
		}
	}

  async addRoleToUser(req, res) {
    try {
      const { userId, role } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      await User.update({ roles: [...user.roles, role] }, { where: { id: userId } });
      return res.status(200).json({ message: `Роль ${role} успешно добавлена пользователю ${user.nickname}` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Произошла ошибка при добавлении роли пользователю' });
    }
  }

  async removeRoleFromUser(req, res) {
    try {
      const { userId, role } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      user.roles = user.roles.filter(r => r !== role);
      await user.save();
      return res.status(200).json({ message: `Роль ${role} успешно удалена у пользователя ${user.nickname}` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Произошла ошибка при удалении роли пользователя' });
    }
  }
}

module.exports = new AdminController();