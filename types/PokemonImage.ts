import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class PokemonImage {
  constructor(private readonly pokemonId: number) {}

  @Field()
  get sprite(): string {
    return `/pokemon/sprites/${this.pokemonId}.png`;
  }

  @Field()
  get nullSprite(): string {
    return '/pokemon/sprites/0.png';
  }
}

export default PokemonImage;
