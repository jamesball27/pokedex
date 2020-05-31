import React from 'react';
import { Tag } from 'antd';
import {
  cyan,
  geekblue,
  gold,
  green,
  grey,
  lime,
  magenta,
  orange,
  purple,
  red,
  volcano,
} from '@ant-design/colors';
import { Name } from '../../../types/Type';

// generated from /util/findMatchingAntDesignColor
const typeColors: { [K in Name]: string } = {
  bug: lime[5],
  dark: grey[5],
  dragon: purple[5],
  electric: gold[4],
  fairy: red[2],
  fighting: red[6],
  fire: volcano[4],
  flying: purple[3],
  ghost: grey[4],
  grass: green[4],
  ground: orange[3],
  ice: cyan[2],
  normal: grey[0],
  poison: purple[4],
  psychic: magenta[4],
  rock: lime[4],
  steel: geekblue[2],
  water: geekblue[4],
  unknown: grey[2],
  shadow: grey[8],
};

interface Props {
  name: Name;
  localeName: string;
}

const TypeTag: React.FC<Props> = ({ name, localeName }) => (
  <Tag color={typeColors[name]}>{localeName}</Tag>
);

export default TypeTag;
