import { DefaultUrlSerializer, Params, UrlTree } from '@angular/router';
import { QueryUrlSerializer } from './query-url-serializer';

const defaultUrlSerializer = new DefaultUrlSerializer();

class NativeQueryUrlSerializer extends QueryUrlSerializer {
  parseQueryParams(query: string): undefined | Params {
    return defaultUrlSerializer.parse(query).queryParams;
  }

  serializeQueryParams(queryParams: any): string {
    return defaultUrlSerializer
      .serialize(new UrlTree(undefined, queryParams))
      .slice(1);
  }
}

const nativeUrlSerializer = new NativeQueryUrlSerializer();

describe('QueryUrlSerializer', () => {
  describe('segment', () => {
    describe('parse', () => {
      it('should parse segments the same as DefaultUrlSerializer', () => {
        const url = '/path/to/some';
        const expected = defaultUrlSerializer.parse(url);

        const actual = nativeUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });
    });

    describe('serialize', () => {
      it('should serialize segments the same as DefaultUrlSerializer', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = nativeUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('fragment', () => {
    describe('parse', () => {
      it('should parse fragment the same as DefaultUrlSerializer', () => {
        const url = '/path/to/some#fragment';
        const expected = defaultUrlSerializer.parse(url);

        const actual = nativeUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });
    });

    describe('serialize', () => {
      it('should serialize fragment the same as DefaultUrlSerializer', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some#fragment');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = nativeUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('query', () => {
    describe('parse', () => {
      it('should parse query the same as DefaultUrlSerializer for no query', () => {
        const url = '/path/to/some';
        const expected = defaultUrlSerializer.parse(url);

        const actual = nativeUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for empty query', () => {
        const url = '/path/to/some?';
        const expected = defaultUrlSerializer.parse(url);

        const actual = nativeUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for empty query value', () => {
        const url = '/path/to/some?query=';
        const expected = defaultUrlSerializer.parse(url);

        const actual = nativeUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for single query', () => {
        const url = '/path/to/some?query=value';
        const expected = defaultUrlSerializer.parse(url);

        const actual = nativeUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for multiple queries', () => {
        const url = '/path/to/some?query=value&another=one';
        const expected = defaultUrlSerializer.parse(url);

        const actual = nativeUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for multiple queries with same key', () => {
        const url = '/path/to/some?query=value&query=another';
        const expected = defaultUrlSerializer.parse(url);

        const actual = nativeUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });
    });

    describe('serialize', () => {
      it('should serialize query the same as DefaultUrlSerializer for no query', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = nativeUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for empty query', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some?');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = nativeUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for empty query value', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some?query=');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = nativeUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for single query', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some?query=value');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = nativeUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for multiple queries', () => {
        const urlTree = defaultUrlSerializer.parse(
          '/path/to/some?query=value&another=one',
        );
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = nativeUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for multiple queries with same key', () => {
        const urlTree = defaultUrlSerializer.parse(
          '/path/to/some?query=value&query=another',
        );
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = nativeUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });
    });
  });
});
