import { DefaultUrlSerializer, UrlTree, Params } from '@angular/router';

export abstract class QueryUrlSerializer extends DefaultUrlSerializer {
  abstract parseQueryParams(query: string): undefined | Params;

  abstract serializeQueryParams(queryParams: Params): string;

  override parse(url: string): UrlTree {
    const urlTree = super.parse(url);
    const queryParams = this.parseQueryParams(
      new URL('https://example.com' + url).search,
    );

    return new UrlTree(urlTree.root, queryParams, urlTree.fragment);
  }

  override serialize(tree: UrlTree): string {
    const segment = super.serialize(new UrlTree(tree.root));
    const query = this.serializeQueryParams(tree.queryParams);
    const fragment =
      typeof tree.fragment === `string` ? `#${encodeURI(tree.fragment)}` : '';

    return `${segment}${query}${fragment}`;
  }
}
