import { DS_LINK, PLAY_ROUTE, RULES_ROUTE, SHOP_ROUTE, VK_LINK, USER_AGREEMENT_ROUTE } from '../../utils/consts';

export const LinksSocial = [
  {
    id: 0,
    labelText: "Вконтакте",
    to: VK_LINK
  },
  {
    id: 1,
    labelText: "Discord",
    to: DS_LINK
  }
];

export const LinksPages = [
  {
    id: 0,
    labelText: "Правила",
    to: RULES_ROUTE
  },
  {
    id: 1,
    labelText: "Магазин",
    to: SHOP_ROUTE
  },
  {
    id: 2,
    labelText: "Как начать играть?",
    to: PLAY_ROUTE
  },
  {
    id: 3,
    labelText: "Пользовательское соглашение",
    to: USER_AGREEMENT_ROUTE
  }
];