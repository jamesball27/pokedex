import { Resolver } from 'type-graphql';

import TypeName from '../entities/TypeName';

@Resolver((of) => TypeName)
class TypeNameResolver {}

export default TypeNameResolver;
