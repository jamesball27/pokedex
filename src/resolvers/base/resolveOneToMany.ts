import { Repository } from 'typeorm';

interface ResolverOpts<T> {
  repository: Repository<T>;
  relation: string;
  parentId: number;
}

async function resolveOneToMany<T>(opts: ResolverOpts<T>): Promise<T[]> {
  const { repository, relation, parentId } = opts;
  return repository.find({
    relations: [relation],
    where: { [relation]: { id: parentId } },
  });
}

export default resolveOneToMany;
