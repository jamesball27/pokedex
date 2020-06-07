import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
class PokemonSpeciesSearchResult {
  @Field()
  name: string;

  @Field(() => Int)
  speciesId: number;
}

export default PokemonSpeciesSearchResult;
