import { colors } from '../color';

describe('Color Palette', () => {
  test('Should have defined colors', () => {
    expect(colors).toBeDefined();
  });

  test('Should have defined text color', () => {
    expect(colors.text).toBeDefined();
  });

  test('Should have defined background color', () => {
    expect(colors.background).toBeDefined();
  });

  test('Should have defined border color', () => {
    expect(colors.border).toBeDefined();
  });

  test('Should have defined tint color', () => {
    expect(colors.tint).toBeDefined();
  });

  test('Should have defined separator color', () => {
    expect(colors.separator).toBeDefined();
  });

  test('Should have defined error color', () => {
    expect(colors.error).toBeDefined();
  });

  test('Should have defined error background color', () => {
    expect(colors.errorBackground).toBeDefined();
  });

  test('Should have defined gold color', () => {
    expect(colors.gold).toBeDefined();
  });

  test('Should have defined accent color', () => {
    expect(colors.accent).toBeDefined();
  });

  test('Should have defined dark gold color', () => {
    expect(colors.darkgold).toBeDefined();
  });

  test('Should have defined dark yellow color', () => {
    expect(colors.darkYellow).toBeDefined();
  });

  test('Should have defined blue color', () => {
    expect(colors.blue).toBeDefined();
  });
});
