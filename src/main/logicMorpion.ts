export function verifyScore(g: Array<Array<number>>, num : number) {
    let cpt = 0;
    for (let l = 0; l < g.length; l++) {
      for (let k = 0; k < g[l].length; k++) {
        if (g[l][k] === num) cpt += num;
      }
    }
    return cpt === 3 || cpt === 6;
};

export function multiply(g: Array<Array<number>>, num: number){
    const grilles = [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 1],
      ],
      [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
      ],
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
      [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
      ],
    ];

    for (let model of grilles) {
      const newGrid = model.map((row, i) =>
        row.map((cell, j) => cell * g[i][j])
      );
      if (verifyScore(newGrid, num)) return true;
    }
    return false;
  };

  export function clean(g: Array<Array<number>>, num: number){
    return g.map((row) => row.map((cell) => (cell === num ? cell : 0)));
  }