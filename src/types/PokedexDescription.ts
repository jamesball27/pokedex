import { ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';

import Description from './base/Description';
import Pokedex from './Pokedex';

@ObjectType()
@Entity('pokedexdescription')
class PokedexDescription extends Description {
  @ManyToOne(() => Pokedex, 'pokedex')
  pokedex: Pokedex;
}

export default PokedexDescription;
