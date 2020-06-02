export const verifyMultipleChecks = (lugares, layout) => {
  let count = 0;
  lugares.forEach((lugar) => {
    layout.forEach((linha) => {
      linha.forEach((coluna, i) => {
        if (coluna && coluna.number === lugar.number) {
          if (linha[i + 1]) {
            count = !linha[i + 1].selecionado ? count + 1 : count;
          }
          if (linha[i - 1]) {
            count = !linha[i - 1].selecionado ? count + 1 : count;
          }
        }
      });
    });
  });
  return !(count > 0);
};
