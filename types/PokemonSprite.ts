import { ObjectType, Field } from 'type-graphql';

@ObjectType()
class PokemonSprite {
  constructor(private readonly pokemonId: number) {}

  @Field()
  get front(): string {
    return `/assets/sprites/pokemon/${this.pokemonId}.png`;
  }

  @Field()
  get model(): string {
    return `/assets/sprites/pokemon/model/${this.pokemonId}.png`;
  }

  get nullSprite(): string {
    return '/assets/sprites/pokemon/0.png';
  }
}

export default PokemonSprite;
