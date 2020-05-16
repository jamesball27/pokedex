import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm';

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

  @Field((type) => GrowthRateDescription, { nullable: true })
  @OneToMany(() => GrowthRateDescription, 'growthRate')
  descriptions: GrowthRateDescription[];
  // levels

  @Field((type) => PokemonSpecies, { nullable: true })
  @OneToMany(() => PokemonSpecies, 'growthRate')
  pokemonSpecies: PokemonSpecies[];
}

export default GrowthRate;
