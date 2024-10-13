import { UrlSerializer, DefaultUrlSerializer, UrlTree } from '@angular/router';
import { parse, stringify, IParseOptions, IStringifyOptions } from 'qs';

type QsUrlSerializerOptions = {
  parse: IParseOptions;
  stringify: IStringifyOptions;
};

const defaultQsUrlSerializerOptions: QsUrlSerializerOptions = {
  parse: {},
  stringify: {
    // The DefaultUrlSerializer does not add indices to array query parameters
    indices: false,
  },
};

export class QsUrlSerializer
  extends DefaultUrlSerializer
  implements UrlSerializer
{
  constructor(
    public options: QsUrlSerializerOptions = defaultQsUrlSerializerOptions,
  ) {
    super();
  }

  override parse(url: string): UrlTree {
    const urlTree = super.parse(url);
    const query = parse(url.split('?')[1], this.options.parse);
    return new UrlTree(urlTree.root, query, urlTree.fragment);
  }

  override serialize(tree: UrlTree): string {
    const urlTree = new UrlTree(tree.root, {}, tree.fragment);
    const urlWithoutQuery = super.serialize(urlTree);
    const [segment, fragment] = urlWithoutQuery.split('#');
    const query = stringify(tree.queryParams, this.options.stringify);
    return query
      ? `${segment}?${query}${fragment ? `#${fragment}` : ''}`
      : urlWithoutQuery;
  }
}
