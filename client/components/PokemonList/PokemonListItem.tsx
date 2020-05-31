import React, { useState } from 'react';
import { Menu, Avatar } from 'antd';

import { CLOUD_STORAGE_BASE_ASSETS_PATH } from '../../config';

interface Props {
  collapsed: boolean;
  name: string;
  sprite: string;
}

const PokemonListItem: React.FC<Props> = ({ collapsed, name, sprite }) => (
  <>
    <Avatar
      src={`${CLOUD_STORAGE_BASE_ASSETS_PATH}${sprite}`}
      size={collapsed ? 50 : 80}
      shape="square"
    />
    {!collapsed && <span>{name}</span>}
  </>
);

export default PokemonListItem;
