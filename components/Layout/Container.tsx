import { css } from '@emotion/react';
import React from 'react';

import { Breakpoint, CONTAINER_WIDTH, spacing } from '@Config/constants';

const styles = {
  container: css`
    max-width: ${CONTAINER_WIDTH}px;
    width: 100%;
    margin: 0 auto;

    ${Breakpoint.bigDesktop} {
      padding: 0 ${spacing[64]};
    }

    ${Breakpoint.mobile} {
      padding: 0 ${spacing[24]};
    }
  `,
};

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div css={styles.container}>{children}</div>;
};

export default Container;
