const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('calcularMediaAluno', () => {

  test('deve existir', () => {
    expect(calcularMediaAluno).toBeDefined();
  });

  test('deve lançar um erro se a1 ou a2 não forem informadas', () => {
    expect(() => calcularMediaAluno()).toThrow('Notas a1 ou a2 não informadas');
  });

  test('deve lançar um erro se a1 ou a2 forem negativas', () => {
    expect(() => calcularMediaAluno(-1, 5)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(10, -5)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  test('deve calcular a média base quando a3 não é informada', () => {
    const a1 = 7;
    const a2 = 8;
    expect(calcularMediaAluno(a1, a2)).toBeCloseTo(7.6);
  });

  test('deve lançar um erro se a3 for negativa', () => {
    const a1 = 7;
    const a2 = 8;
    const a3 = -5;
    expect(() => calcularMediaAluno(a1, a2, a3)).toThrow('Nota a3 não pode ser negativa');
  });

  test('deve calcular a média final com a melhor combinação (a1 e a3)', () => {
    const a1 = 10;
    const a2 = 5;
    const a3 = 9;
    expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(9.4);
  });

  test('deve calcular a média final com a melhor combinação (a2 e a3)', () => {
    const a1 = 5;
    const a2 = 10;
    const a3 = 9;

    expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(9.4);
  });
});