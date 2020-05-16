import { ObjectType, Field } from 'type-graphql';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import Name from './base/Name';
import PokemonShape from './PokemonShape';

@ObjectType()
@Entity('pokemonshapename')
class PokemonShapeName extends Name {
  @ManyToOne(() => PokemonShape, 'names')
  @JoinColumn({ name: 'pokemon_shape_id' })
  shape: PokemonShape;
}

export default PokemonShapeName;
