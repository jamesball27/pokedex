import { Resolver } from 'type-graphql';

import TypeName from '../entities/TypeName';

@Resolver(() => TypeName)
class TypeNameResolver {}

export default TypeNameResolver;
