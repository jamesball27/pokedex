import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';

import EggGroupName from './EggGroupName';
import PokemonSpecies from './PokemonSpecies';

@ObjectType()
@Entity('egggroup')
class EggGroup {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field((type) => EggGroupName, { nullable: true })
  @OneToMany(() => EggGroupName, 'eggGroup')
  names: EggGroupName[];

  @Field((type) => PokemonSpecies, { nullable: true })
  @ManyToMany(() => PokemonSpecies, 'eggGroups')
  pokemonSpecies: PokemonSpecies[];
}

export default EggGroup;
