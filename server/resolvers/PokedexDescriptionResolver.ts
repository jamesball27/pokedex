import { Resolver } from 'type-graphql';

import PokedexDescription from '../../types/PokedexDescription';

@Resolver(() => PokedexDescription)
class PokedexDescriptionResolver {}

export default PokedexDescriptionResolver;
