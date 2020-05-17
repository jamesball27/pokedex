import { Resolver } from 'type-graphql';

import PokedexDescription from '../entities/PokedexDescription';

@Resolver(() => PokedexDescription)
class PokedexDescriptionResolver {}

export default PokedexDescriptionResolver;
