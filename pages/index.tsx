import { css } from '@emotion/react';
import type { NextPage } from 'next';

import Board from '@Components/Board';
import { StyledText } from '@Utils/styledComponents';

const styles = {
  wrapper: css`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  `,
  button: css`
    margin-top: 40px;
  `,
};

const Home: NextPage = () => {
  return (
    <div css={styles.wrapper}>
      <StyledText h1 weight={'bold'} size={60}>
        Play 29 Card Game
      </StyledText>
      <Board />
    </div>
  );
};

export default Home;
