import { Params } from '@angular/router';
import { parse, stringify, IParseOptions, IStringifyOptions } from 'qs';
import { QueryUrlSerializer } from './query-url-serializer';

type QsUrlSerializerOptions = {
  parse: IParseOptions;
  stringify: IStringifyOptions;
};

export const DEFAULT_QS_URL_SERIALIZER_OPTIONS: QsUrlSerializerOptions =
  Object.freeze({
    parse: {
      allowEmptyArrays: false,
    },
    stringify: {
      arrayFormat: 'repeat',
      allowEmptyArrays: false,
    },
  });

export class QsUrlSerializer extends QueryUrlSerializer {
  constructor(
    public options: QsUrlSerializerOptions = DEFAULT_QS_URL_SERIALIZER_OPTIONS,
  ) {
    super();
  }

  override parseQueryParams(query: string): undefined | Params {
    return query.startsWith('?')
      ? parse(query.slice(1), this.options.parse)
      : undefined;
  }

  override serializeQueryParams(queryParams: Params): string {
    return Object.keys(queryParams).length
      ? '?' + stringify(queryParams, this.options.stringify)
      : '';
  }
}
