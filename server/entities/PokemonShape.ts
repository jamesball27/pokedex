import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinColumn } from 'typeorm';

import PokemonShapeName from './PokemonShapeName';
import PokemonSpecies from './PokemonSpecies';

@ObjectType()
@Entity('pokemonshape')
class PokemonShape {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  // awesome_names

  @Field((type) => PokemonShapeName, { nullable: true })
  @OneToMany(() => PokemonShapeName, 'shape', { eager: true })
  names: PokemonShapeName[];

  @OneToMany(() => PokemonSpecies, 'shape')
  pokemonSpecies: PokemonSpecies[];
}

export default PokemonShape;
