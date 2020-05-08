import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';

import Pokemon from './Pokemon';

@ObjectType()
@Entity('pokemonspecies')
class PokemonSpecies {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Int)
  @Column()
  order: number;

  @Field(() => Int)
  @Column()
  genderRate: number;

  @Field(() => Int)
  @Column()
  captureRate: number;

  @Field(() => Int)
  @Column()
  baseHappiness: number;

  @Field()
  @Column()
  isBaby: boolean;

  @Field(() => Int)
  @Column()
  hatchCounter: number;

  @Field()
  @Column()
  hasGenderDifferences: boolean;

  @Field()
  @Column()
  formsSwitchable: boolean;

  @Field((type) => Pokemon, { nullable: true })
  @OneToMany(() => Pokemon, 'species')
  pokemon: Pokemon[];
}

export default PokemonSpecies;
