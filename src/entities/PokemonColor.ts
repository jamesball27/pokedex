import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

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

  @Field(() => PokemonColorName, { nullable: true })
  @OneToMany(() => PokemonColorName, 'color', { eager: true })
  names: PokemonColorName[];

  @OneToMany(() => PokemonSpecies, 'color')
  pokemonSpecies: PokemonSpecies[];
}

export default PokemonColor;
