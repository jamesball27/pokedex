import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
class Pokemon {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  base_experience: number;

  @Field(() => Int)
  height: number;

  @Field()
  is_default: boolean;

  @Field(() => Int)
  order: number;

  @Field(() => Int)
  weight: number;

  // location_area_encounters:
  // abilities:
  // forms:
  // game_indices
  // held_items
  // moves
  // sprites
  // species
  // stats
  // types
}

export default Pokemon;
