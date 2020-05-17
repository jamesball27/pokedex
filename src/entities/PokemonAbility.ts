import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import Pokemon from './Pokemon';
import Ability from './Ability';

@ObjectType()
@Entity('pokemonability')
class PokemonAbility {
  @Field(() => Int)
  @Column()
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  isHidden: boolean;

  @Field(() => Int)
  @Column()
  slot: number;

  @Field(() => Ability, { nullable: true })
  @ManyToOne(() => Ability, 'pokemon')
  @JoinColumn()
  ability: Ability;

  @Field(() => Pokemon, { nullable: true })
  @ManyToOne(() => Pokemon, 'abilities')
  @JoinColumn()
  pokemon: Pokemon;
}

export default PokemonAbility;
