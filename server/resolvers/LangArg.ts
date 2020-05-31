import { ArgsType, Field } from 'type-graphql';

@ArgsType()
class LangArg {
  @Field({ nullable: true, defaultValue: 'en' })
  lang: string;
}

export default LangArg;
