import { css } from '@emotion/react';
import React from 'react';

import { CardStructure } from '@Config/cards';
import { cardHeight, cardWidth } from '@Config/constants';
import { styleUtils } from '@Utils/styleUtils';

const styles = {
  card: (hasHoverAnimation: boolean) => css`
    ${styleUtils.resetButton};
    width: ${cardWidth}px;
    height: ${cardHeight}px;
    position: relative;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    transition: 0.5s;
    cursor: pointer;

    ${hasHoverAnimation &&
    css`
      &:hover {
        transform: translateY(-20px);
      }
    `}
  `,
  cardFace: css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: all 0.5s;
  `,
  frontFace: (src: string, showCard: boolean) => css`
    background-image: url(${src});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    ${!showCard &&
    css`
      transform: rotateY(180deg);
    `}
  `,
  backFace: (showCard: boolean) => css`
    background-image: url(/cards/backface.png);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: rotateY(-180deg);

    ${!showCard &&
    css`
      transform: rotateY(0deg);
    `}
  `,
};

interface CardProps {
  card: CardStructure & {
    isShow: boolean;
  };
  onClick?: () => void;
  hasHoverAnimation?: boolean;
}

const Card = ({ card, onClick, hasHoverAnimation = false }: CardProps) => {
  return (
    <button type="button" css={styles.card(hasHoverAnimation)} onClick={onClick}>
      <div css={[styles.cardFace, styles.frontFace(card.image, card.isShow)]} />
      <div css={[styles.cardFace, styles.backFace(card.isShow)]} />
    </button>
  );
};

export default Card;
