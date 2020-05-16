import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinColumn } from 'typeorm';

import PokemonHabitatName from './PokemonHabitatName';
import PokemonSpecies from './PokemonSpecies';

@ObjectType()
@Entity('pokemonhabitat')
class PokemonHabitat {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => PokemonHabitatName, { nullable: true })
  @OneToMany(() => PokemonHabitatName, 'habitat', { eager: true })
  names: PokemonHabitatName[];

  @OneToMany(() => PokemonSpecies, 'shape')
  pokemonSpecies: PokemonSpecies[];
}

export default PokemonHabitat;
