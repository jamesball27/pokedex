import { Resolver } from 'type-graphql';

import PokemonSprite from '../../types/PokemonSprite';

@Resolver(() => PokemonSprite)
class PokemonSpriteResolver {}

export default PokemonSpriteResolver;
