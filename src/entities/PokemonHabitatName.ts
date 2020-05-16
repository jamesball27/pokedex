import { ObjectType, Field } from 'type-graphql';
import { Entity, ManyToOne, JoinColumn } from 'typeorm';

import Name from './base/Name';
import PokemonHabitat from './PokemonHabitat';

@ObjectType()
@Entity('pokemonhabitatname')
class PokemonHabitatName extends Name {
  @Field((type) => PokemonHabitat, { nullable: true })
  @ManyToOne(() => PokemonHabitat, 'names')
  @JoinColumn({ name: 'pokemon_habitat_id' })
  habitat: PokemonHabitat;
}

export default PokemonHabitatName;
