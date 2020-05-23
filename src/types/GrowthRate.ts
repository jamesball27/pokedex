import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

import PokemonSpecies from './PokemonSpecies';
import GrowthRateDescription from './GrowthRateDescription';

@ObjectType()
@Entity('growthrate')
class GrowthRate {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  formula: string;

  @Field(() => GrowthRateDescription, { nullable: true })
  @OneToMany(() => GrowthRateDescription, 'growthRate', { eager: true })
  descriptions: GrowthRateDescription[];
  // levels

  @OneToMany(() => PokemonSpecies, 'growthRate')
  pokemonSpecies: PokemonSpecies[];
}

export default GrowthRate;
