import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class Pokemon {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  base_experience: number;

  @Field()
  height: number;

  @Field()
  is_default: boolean;

  @Field()
  order: number;

  @Field()
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
