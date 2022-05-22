import { CardStructure, cards as cardsData } from '@Config/cards';

export const noop = () => {};

export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== undefined && value !== null;
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const range = (total: number) => Array.from({ length: total }, (_, i) => i);

export const pickRandomCardsFrom = (cardsArray: CardStructure[], numberOfCardToPick = 4) => {
  const firstDeal = range(numberOfCardToPick);

  const pickArray = [];

  for (const _ of firstDeal) {
    const randomIndex = getRandom(0, cardsArray.length);
    const card = cardsArray[randomIndex];

    pickArray.push(card);
    cardsArray.splice(randomIndex, 1);
  }

  return pickArray;
};

export const sortCards = (cards: CardStructure[]) => {
  const sortedCardsGroup = cards.reduce<{ [key: string]: CardStructure[] }>((acc, card) => {
    acc[card.type] ||= [];
    acc[card.type].push(card);
    return acc;
  }, {});

  for (const key in sortedCardsGroup) {
    sortedCardsGroup[key].sort((a, b) => a.weight - b.weight);
  }

  return ['hearts', 'spades', 'diamonds', 'clubs']
    .map((type) => {
      if (sortedCardsGroup.hasOwnProperty(type)) {
        return sortedCardsGroup[type];
      }

      return null;
    })
    .filter(isDefined)
    .flat();
};

export const cardsArray = [...Object.values(cardsData)];
export const refillCardsArray = () => cardsArray.push(...Object.values(cardsData));
