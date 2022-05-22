import { css } from '@emotion/react';
import { Button } from '@nextui-org/react';
import produce from 'immer';
import React from 'react';

import { Player, useGameContext } from '@Context/GameContext';
import { StyledText } from '@Utils/styledComponents';
import { cardsArray, pickRandomCardsFrom } from '@Utils/utils';

const styles = {
  panelButtons: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
};

const ControlPanel = () => {
  const { cardsStore, setCardsStore } = useGameContext();
  return (
    <div>
      <StyledText h1 size={48} weight="bold">
        Control Panel
      </StyledText>

      <div css={styles.panelButtons}>
        <Button
          color="gradient"
          shadow
          animated
          onClick={() => {
            if (Object.keys(cardsStore).some((key) => cardsStore[key as Player].length > 0)) {
              return;
            }

            setCardsStore(
              produce((draft) => {
                draft[Player.player1] = pickRandomCardsFrom(cardsArray);
                draft[Player.player2] = pickRandomCardsFrom(cardsArray);
                draft[Player.player3] = pickRandomCardsFrom(cardsArray);
                draft[Player.player4] = pickRandomCardsFrom(cardsArray);
              }),
            );
          }}
        >
          New Game
        </Button>

        <Button
          color="gradient"
          shadow
          animated
          onClick={() => {
            if (cardsStore[Player.player1].length === 0) {
              alert('Please start a new game first');
              return;
            }

            if (cardsStore[Player.player1].length >= 8) {
              return;
            }

            setCardsStore(
              produce((draft) => {
                draft[Player.player1].push(...pickRandomCardsFrom(cardsArray));
                draft[Player.player2].push(...pickRandomCardsFrom(cardsArray));
                draft[Player.player3].push(...pickRandomCardsFrom(cardsArray));
                draft[Player.player4].push(...pickRandomCardsFrom(cardsArray));
              }),
            );
          }}
        >
          2nd Deal
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
