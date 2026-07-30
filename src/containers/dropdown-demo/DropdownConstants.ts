const SELECT_GAME_OPTIONS = [
    {
      key: 'reddeadredemption2',
      name: 'Red Dead Redemption 2',
      value: 'Red Dead Redemption 2',
    },
    {
      key: 'zeldabreathofthewild',
      name: 'Zelda Breath of the Wild',
      value: 'Zelda Breath of the Wild',
    },
    {
      key: 'thelastofus',
      name: 'The Last of Us',
      value: 'The Last of Us',
    },
    {
      key: 'thewitcher3',
      name: 'The Witcher 3',
      value: 'The Witcher 3',
    },
    {
      key: 'baldursgate3',
      name: 'Baldurs Gate 3',
      value: 'Baldurs Gate 3',
    },
];

export const DROPDOWN_CONSTANTS = {
    initialOptions: SELECT_GAME_OPTIONS,
    defaultPlaceholder: 'Select a Game',
} as const;

export const DROPDOWN_ID = 'game_selector';
export const DROPDOWN_LABEL = 'Select your favourite game from the options below';