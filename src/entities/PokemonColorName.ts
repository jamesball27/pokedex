import { ObjectType, Field } from 'type-graphql';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import Name from './base/Name';
import PokemonColor from './PokemonColor';

@ObjectType()
@Entity('pokemoncolorname')
class PokemonColorName extends Name {
  @ManyToOne(() => PokemonColor, 'names')
  @JoinColumn({ name: 'pokemon_color_id' })
  color: PokemonColor;
}

export default PokemonColorName;
