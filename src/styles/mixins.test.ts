import { css } from 'styled-components';
import { sizeQuery, media, font } from './mixins';

describe('style mixins', (): void => {
  it('sizeQuery', (): void => {
    expect(
      sizeQuery(
        1024,
        css`color: red;`
      )
    ).toEqual('@media (min-width: 1024px){color: red;}');
  });

  it('media', (): void => {
    expect(
      media.sm(
        css`color: red;`
      )
    ).toContain('@media (min-width: 320px){color: red;}');

    expect(
      media.md(
        css`color: green;`
      )
    ).toEqual('@media (min-width: 768px){color: green;}');

    expect(
      media.lg(
        css`color: blue;`
      )
    ).toEqual('@media (min-width: 1024px){color: blue;}');

    expect(
      media.xl(
        css`color: black;`
      )
    ).toEqual('@media (min-width: 1280px){color: black;}');

    expect(
      media.xxl(
        css`color: white;`
      )
    ).toEqual('@media (min-width: 1440px){color: white;}');
  });

  it('font', (): void => {
    const result = font({ lineHeight: 1.6, size: 1.2 });

    expect(result).toContain('font-size: 1.2rem;');
    expect(result).toContain('line-height: 1.6rem;');
  });
});
