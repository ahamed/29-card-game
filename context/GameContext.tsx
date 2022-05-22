import React, { Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';

import { CardStructure } from '@Config/cards';
import { noop, sortCards } from '@Utils/utils';

export enum Player {
  player1 = 'player1',
  player2 = 'player2',
  player3 = 'player3',
  player4 = 'player4',
}

interface Bucket {
  [Player.player1]: CardStructure | null;
  [Player.player2]: CardStructure | null;
  [Player.player3]: CardStructure | null;
  [Player.player4]: CardStructure | null;
}

export interface GameContextType {
  cardsStore: {
    [Player.player1]: CardStructure[];
    [Player.player2]: CardStructure[];
    [Player.player3]: CardStructure[];
    [Player.player4]: CardStructure[];
  };
  currentPlayer: Player;
  bucket: Bucket;
  setCardsStore: Dispatch<SetStateAction<GameContextType['cardsStore']>>;
  setCurrentPlayer: Dispatch<SetStateAction<GameContextType['currentPlayer']>>;
  setBucket: Dispatch<SetStateAction<Bucket>>;
}

const GameContext = React.createContext<GameContextType>({
  cardsStore: {
    [Player.player1]: [],
    [Player.player2]: [],
    [Player.player3]: [],
    [Player.player4]: [],
  },
  currentPlayer: Player.player1,
  bucket: {
    [Player.player1]: null,
    [Player.player2]: null,
    [Player.player3]: null,
    [Player.player4]: null,
  },
  setCardsStore: noop,
  setCurrentPlayer: noop,
  setBucket: noop,
});

export const useGameContext = () => useContext(GameContext);

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [currentPlayer, setCurrentPlayer] = useState(Player.player1);
  const [cardsStore, setCardsStore] = useState<GameContextType['cardsStore']>({
    [Player.player1]: [],
    [Player.player2]: [],
    [Player.player3]: [],
    [Player.player4]: [],
  });
  const [bucket, setBucket] = useState<Bucket>({
    [Player.player1]: null,
    [Player.player2]: null,
    [Player.player3]: null,
    [Player.player4]: null,
  });

  const values = useMemo(() => {
    return {
      cardsStore: {
        [Player.player1]: sortCards(cardsStore[Player.player1]),
        [Player.player2]: sortCards(cardsStore[Player.player2]),
        [Player.player3]: sortCards(cardsStore[Player.player3]),
        [Player.player4]: sortCards(cardsStore[Player.player4]),
      },
      currentPlayer,
      bucket,
      setBucket,
      setCurrentPlayer,
      setCardsStore,
    };
  }, [cardsStore, currentPlayer, bucket]);

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};
