const calcularMediaAluno = require('./calcularMediaAluno');

// Testes para cenários de sucesso
test('deve calcular a média base quando a3 não é informada', () => {
  const media = calcularMediaAluno(7, 8);
  expect(media).toBeCloseTo(7.6);
});

test('deve usar a3 e a1 se essa for a melhor combinação', () => {
  const media = calcularMediaAluno(9, 6, 8);
  expect(media).toBeCloseTo(8.4); // Combinação (a1=9, a3=8)
});

test('deve usar a3 e a2 se essa for a melhor combinação', () => {
  const media = calcularMediaAluno(6, 9, 8);
  expect(media).toBeCloseTo(8.6); // Combinação (a2=9, a3=8)
});

// Testes para cenários de erro (utilizando toThrow)
test('deve lançar um erro se a1 ou a2 forem indefinidas', () => {
  expect(() => calcularMediaAluno(undefined, 7)).toThrow('Notas a1 ou a2 não informadas');
  expect(() => calcularMediaAluno(8, undefined)).toThrow('Notas a1 ou a2 não informadas');
});

test('deve lançar um erro se a1 ou a2 forem negativas', () => {
  expect(() => calcularMediaAluno(-5, 7)).toThrow('Notas a1 ou a2 não podem ser negativas');
  expect(() => calcularMediaAluno(8, -2)).toThrow('Notas a1 ou a2 não podem ser negativas');
});

test('deve lançar um erro se a3 for negativa', () => {
  expect(() => calcularMediaAluno(7, 8, -1)).toThrow('Nota a3 não pode ser negativa');
});