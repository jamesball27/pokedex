import { ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import Name from './base/Name';
import Pokedex from './Pokedex';

@ObjectType()
@Entity('pokedexname')
class PokedexName extends Name {
  @ManyToOne(() => Pokedex, 'names')
  pokedex: Pokedex;
}

export default PokedexName;
