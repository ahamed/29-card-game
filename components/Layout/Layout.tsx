import { css } from '@emotion/react';
import React from 'react';

import ControlPanel from '@Components/ControlPanel';
import Container from '@Components/Layout/Container';

const styles = {
  layout: css`
    display: grid;
    grid-template-columns: 1fr 1000px 1fr;
    min-height: 100%;
  `,
  main: css`
    display: grid;
    height: 100%;
    min-height: 100%;
  `,
  controlPanel: css`
    width: 100%;
    height: 100%;
    border-left: 1px solid #ddd;
    padding: 56px 20px;
  `,
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div css={styles.layout}>
      <div />
      <main css={styles.main}>
        <Container>{children}</Container>
      </main>
      <div css={styles.controlPanel}>
        <ControlPanel />
      </div>
    </div>
  );
};

export default Layout;
