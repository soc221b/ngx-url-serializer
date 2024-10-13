import { DefaultUrlSerializer } from '@angular/router';
import { QsUrlSerializer } from './qs-url-serializer';

const defaultUrlSerializer = new DefaultUrlSerializer();
const qsUrlSerializer = new QsUrlSerializer();

describe('QsUrlSerializer', () => {
  describe('query', () => {
    describe('parse', () => {
      it('should parse nested query', () => {
        const url = '/path/to/some?a%5Bb%5D=c';
        const expected = defaultUrlSerializer.parse(url);
        expected.queryParams = { a: { b: 'c' } };

        const actual = qsUrlSerializer.parse(url);

        expect(actual).toEqual(expected);
      });

      describe('default options', () => {
        it('should use allowEmptyArrays=false', () => {
          const url = '/path/to/some?foo[]&bar=baz';
          const expected = defaultUrlSerializer.parse(url);
          expected.queryParams = { foo: [''], bar: 'baz' };

          const actual = qsUrlSerializer.parse(url);

          expect(actual).toEqual(expected);
        });
      });
    });

    describe('serialize', () => {
      it('should serialize nested query', () => {
        const expected = '/path/to/some?a%5Bb%5D=c';
        const urlTree = defaultUrlSerializer.parse(expected);
        urlTree.queryParams = { a: { b: 'c' } };

        const actual = qsUrlSerializer.serialize(urlTree);

        expect(actual).toEqual(expected);
      });

      describe('default options', () => {
        it('should use arrayFormat="repeat"', () => {
          const expected = '/path/to/some?a=1&a=2';
          const urlTree = defaultUrlSerializer.parse(expected);
          urlTree.queryParams = { a: [1, 2] };

          const actual = qsUrlSerializer.serialize(urlTree);

          expect(actual).toEqual(expected);
        });

        it('should use allowEmptyArrays=false', () => {
          const expected = '/path/to/some?bar=baz';
          const urlTree = defaultUrlSerializer.parse(expected);
          urlTree.queryParams = { foo: [], bar: 'baz' };

          const actual = qsUrlSerializer.serialize(urlTree);

          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
