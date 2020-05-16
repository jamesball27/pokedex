import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinColumn } from 'typeorm';

import PokemonColorName from './PokemonColorName';
import PokemonSpecies from './PokemonSpecies';

@ObjectType()
@Entity('pokemoncolor')
class PokemonColor {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => PokemonColorName, { nullable: true })
  @OneToMany(() => PokemonColorName, 'color')
  names: PokemonColorName[];

  @Field((type) => PokemonSpecies, { nullable: true })
  @OneToMany(() => PokemonSpecies, 'color')
  pokemonSpecies: PokemonSpecies[];
}

export default PokemonColor;
