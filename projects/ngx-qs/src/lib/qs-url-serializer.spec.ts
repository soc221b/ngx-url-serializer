import { QsUrlSerializer } from './qs-url-serializer';
import { DefaultUrlSerializer } from '@angular/router';

describe('QsUrlSerializer', () => {
  const urlSerializer = new QsUrlSerializer();
  const defaultUrlSerializer = new DefaultUrlSerializer();

  describe('segment', () => {
    describe('parse', () => {
      it('should parse segments the same as DefaultUrlSerializer', () => {
        const url = '/path/to/some';
        const expected = defaultUrlSerializer.parse(url);

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });
    });

    describe('serialize', () => {
      it('should serialize segments the same as DefaultUrlSerializer', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('fragment', () => {
    describe('parse', () => {
      it('should parse fragment the same as DefaultUrlSerializer', () => {
        const url = '/path/to/some#fragment';
        const expected = defaultUrlSerializer.parse(url);

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });
    });

    describe('serialize', () => {
      it('should serialize fragment the same as DefaultUrlSerializer', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some#fragment');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('query', () => {
    describe('parse', () => {
      it('should parse query the same as DefaultUrlSerializer for no query', () => {
        const url = '/path/to/some';
        const expected = defaultUrlSerializer.parse(url);

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for empty query', () => {
        const url = '/path/to/some?';
        const expected = defaultUrlSerializer.parse(url);

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for empty query value', () => {
        const url = '/path/to/some?query=';
        const expected = defaultUrlSerializer.parse(url);

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for single query', () => {
        const url = '/path/to/some?query=value';
        const expected = defaultUrlSerializer.parse(url);

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for multiple queries', () => {
        const url = '/path/to/some?query=value&another=one';
        const expected = defaultUrlSerializer.parse(url);

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse query the same as DefaultUrlSerializer for multiple queries with same key', () => {
        const url = '/path/to/some?query=value&query=another';
        const expected = defaultUrlSerializer.parse(url);

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      it('should parse nested query', () => {
        const url = '/path/to/some?a%5Bb%5D=c';
        const expected = defaultUrlSerializer.parse(url);
        expected.queryParams = { a: { b: 'c' } };

        const actual = urlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });
    });

    describe('serialize', () => {
      it('should serialize query the same as DefaultUrlSerializer for no query', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for empty query', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some?');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for empty query value', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some?query=');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for single query', () => {
        const urlTree = defaultUrlSerializer.parse('/path/to/some?query=value');
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for multiple queries', () => {
        const urlTree = defaultUrlSerializer.parse(
          '/path/to/some?query=value&another=one',
        );
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize query the same as DefaultUrlSerializer for multiple queries with same key', () => {
        const urlTree = defaultUrlSerializer.parse(
          '/path/to/some?query=value&query=another',
        );
        const expected = defaultUrlSerializer.serialize(urlTree);

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      it('should serialize nested query', () => {
        const expected = '/path/to/some?a%5Bb%5D=c';
        const urlTree = defaultUrlSerializer.parse(expected);
        urlTree.queryParams = { a: { b: 'c' } };

        const actual = urlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });
    });
  });
});
