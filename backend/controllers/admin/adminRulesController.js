const { RulesTitle, RulesText } = require("../../models/rulesModel");

class AdminRulesController {
  async createrTitleRules(req, res) {
    try {
      const { idTitle, title } = req.body;

      // Проверка на пустые значения
      if (!idTitle || !title) {
        return res.status(400).json({ message: "idTitle и title не должны быть пустыми" });
      }

      // Проверка на существование idTitle
      const existingTitle = await RulesTitle.findOne({ where: { idTitle } });
      if (existingTitle) {
        return res.status(400).json({ message: "idTitle уже существует" });
      }

      // Если все проверки пройдены, создаем новый заголовок
      const newTitle = await RulesTitle.create({ idTitle, title });

      res.status(201).json({ message: "Заголовок успешно создан", data: newTitle });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createrTextRules(req, res) {
    try {
      const { sequence_number, text, punishment, note, idTitle } = req.body;
      console.log(sequence_number, text, punishment, note, idTitle);

      // Проверка на пустые значения
      if (!sequence_number || !text || !idTitle) {
        return res.status(400).json({ error: "Порядковый номер, текст, наказание и idTitle не должны быть пустыми" });
      }

      // Проверим, существует ли заголовок с таким idTitle
      const title = await RulesTitle.findOne({ where: { idTitle } });
      if (!title) {
        return res.status(400).json({ error: 'Заголовок с таким idTitle не найден' });
      }

      // Приведение sequence_number к строке
      const sequenceNumberStr = String(sequence_number);

      // Проверка на существование sequence_number
      const existingRule = await RulesText.findOne({ where: { sequence_number: sequenceNumberStr } });
      if (existingRule) {
        return res.status(400).json({ error: 'Такой порядковый номер уже существует' });
      }

      // Если все проверки пройдены, создаем новое правило
      const newText = await RulesText.create({ sequence_number, text, punishment, note, idTitle });

      res.status(201).json({ message: "Правило успешно создано", data: newText });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AdminRulesController();