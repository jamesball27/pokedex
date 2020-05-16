import { Resolver } from 'type-graphql';

import PokedexDescription from '../entities/PokedexDescription';

@Resolver((of) => PokedexDescription)
class PokedexDescriptionResolver {}

export default PokedexDescriptionResolver;
