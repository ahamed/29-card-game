import { css } from '@emotion/react';
import produce from 'immer';
import React from 'react';

import Card from '@Components/Card';
import { CardStructure } from '@Config/cards';
import { cardHeight } from '@Config/constants';
import { Player, useGameContext } from '@Context/GameContext';
import { StyledText } from '@Utils/styledComponents';

const gapBetweenTwoCards = 40;

const styles = {
  playerHandWrapper: css`
    text-align: center;
    position: relative;
    width: 100%;
    height: 100%;
  `,
  playerName: css`
    font-size: 24px;
    font-weight: bold;
    line-height: 56px;
  `,
  cardsContainer: (player: Player) => css`
    position: relative;
    width: 100%;
    height: 100%;
    ${player === Player.player2 &&
    css`
      transform-origin: ${cardHeight / 2}px ${cardHeight / 2}px;
      transform: rotate(90deg);
    `}
    ${player === Player.player4 &&
    css`
      transform-origin: ${cardHeight / 2}px ${cardHeight / 2}px;
      transform: rotate(90deg);
    `}
  `,
  cardWrapper: (index: number, isPicked: boolean, player: Player) => css`
    position: absolute;
    left: ${index * gapBetweenTwoCards}px;
    transition: 0.3s linear;

    ${isPicked &&
    css`
      ${player === Player.player1 &&
      css`
        transform: translate(150px, -250px);
        left: 0px;
      `}
      ${player === Player.player2 &&
      css`
        transform: translate(120px, -270px);
        left: 0px;
      `}
      ${player === Player.player3 &&
      css`
        transform: translate(150px, 250px);
        left: 0px;
      `}
      ${player === Player.player4 &&
      css`
        transform: translate(120px, 270px);
        left: 0px;
      `}
    `}
  `,
};

interface PlayerHandProps {
  cards: CardStructure[];
  player: Player;
  isMyHand?: boolean;
}

const generatePlayerName = (player: Player) => {
  switch (player) {
    case Player.player1:
      return 'Player 1 (South)';
    case Player.player2:
      return 'Player 2 (West)';
    case Player.player3:
      return 'Player 3 (North)';
    case Player.player4:
      return 'Player 4 (East)';
  }
};

const PlayerHand = ({ cards, player, isMyHand = false }: PlayerHandProps) => {
  const { setCardsStore, bucket, setBucket } = useGameContext();

  return (
    <div css={styles.playerHandWrapper}>
      <div css={styles.playerName}>
        <StyledText h3>{generatePlayerName(player)}</StyledText>
      </div>
      <div css={styles.cardsContainer(player)}>
        {cards.map((card, index) => {
          return (
            <div key={card.name} css={styles.cardWrapper(index, card.isPicked, player)}>
              <Card
                card={{ ...card, isShow: true }}
                hasHoverAnimation={isMyHand}
                onClick={() => {
                  if (card.isPicked || cards.length < 8 || bucket[player] !== null) {
                    return;
                  }

                  setBucket(
                    produce((draft) => {
                      draft[player] = card;
                    }),
                  );

                  setCardsStore(
                    produce((draft) => {
                      const pickedCard = draft[player].find((c) => c.name === card.name);

                      if (pickedCard) {
                        pickedCard.isPicked = true;
                      }
                    }),
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerHand;
