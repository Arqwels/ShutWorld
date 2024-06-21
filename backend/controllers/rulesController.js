const { RulesTitle, RulesText } = require("../models/rulesModel");

class RulesController {
  async getRules(req, res) {
    try {
      // Получаем все заголовки с связанными текстами правил
      const rules = await RulesTitle.findAll({
        include: [
          {
            model: RulesText,
            as: 'texts'
          }
        ]
      });

      // Возвращаем данные в ответе
      res.status(200).json(rules);
    } catch (error) {
      // Обработка ошибок
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RulesController();