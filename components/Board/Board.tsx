import { css } from '@emotion/react';
import React from 'react';

import PlayerHand from '@Components/PlayerHand';
import { Player, useGameContext } from '@Context/GameContext';

const styles = {
  board: css`
    max-width: 1000px;
    min-height: 800px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    position: relative;

    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    grid-template-areas:
      '. . top top top top . .'
      '. . top top top top . .'
      'left left center center center center right right'
      'left left center center center center right right'
      'left left center center center center right right'
      'left left center center center center right right'
      '. . bottom bottom bottom bottom . .'
      '. . bottom bottom bottom bottom . .';
  `,
  top: css`
    grid-area: top;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
  `,
  right: css`
    grid-area: right;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
  `,
  bottom: css`
    grid-area: bottom;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  `,
  left: css`
    grid-area: left;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  `,
};

const Board = () => {
  const { cardsStore } = useGameContext();

  return (
    <div css={styles.board}>
      <div css={styles.top}>
        <PlayerHand cards={cardsStore[Player.player3]} player={Player.player3} />
      </div>
      <div css={styles.right}>
        <PlayerHand cards={cardsStore[Player.player4]} player={Player.player4} />
      </div>
      <div css={styles.bottom}>
        <PlayerHand cards={cardsStore[Player.player1]} player={Player.player1} isMyHand />
      </div>
      <div css={styles.left}>
        <PlayerHand cards={cardsStore[Player.player2]} player={Player.player2} />
      </div>
    </div>
  );
};

export default Board;
