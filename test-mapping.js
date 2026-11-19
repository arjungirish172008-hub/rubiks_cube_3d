import Cube from 'cubejs';

function getFaceletIndex(face, x, y, z) {
  let row, col, faceOffset;
  if (face === 'U') {
    faceOffset = 0;
    row = z + 1;
    col = x + 1;
  } else if (face === 'R') {
    faceOffset = 9;
    row = 1 - y;
    col = 1 - z;
  } else if (face === 'F') {
    faceOffset = 18;
    row = 1 - y;
    col = x + 1;
  } else if (face === 'D') {
    faceOffset = 27;
    row = 1 - z;
    col = x + 1;
  } else if (face === 'L') {
    faceOffset = 36;
    row = 1 - y;
    col = z + 1;
  } else if (face === 'B') {
    faceOffset = 45;
    row = 1 - y;
    col = 1 - x;
  }
  return faceOffset + row * 3 + col;
}

const faces = [
  { name: 'U', normal: [0, 1, 0] },
  { name: 'R', normal: [1, 0, 0] },
  { name: 'F', normal: [0, 0, 1] },
  { name: 'D', normal: [0, -1, 0] },
  { name: 'L', normal: [-1, 0, 0] },
  { name: 'B', normal: [0, 0, -1] }
];

function createInitialStickers() {
  const stickers = [];
  for (let face of faces) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (face.name === 'U' && y === 1) stickers.push({ color: 'U', x, y, z, nx: 0, ny: 1, nz: 0 });
          if (face.name === 'D' && y === -1) stickers.push({ color: 'D', x, y, z, nx: 0, ny: -1, nz: 0 });
          if (face.name === 'R' && x === 1) stickers.push({ color: 'R', x, y, z, nx: 1, ny: 0, nz: 0 });
          if (face.name === 'L' && x === -1) stickers.push({ color: 'L', x, y, z, nx: -1, ny: 0, nz: 0 });
          if (face.name === 'F' && z === 1) stickers.push({ color: 'F', x, y, z, nx: 0, ny: 0, nz: 1 });
          if (face.name === 'B' && z === -1) stickers.push({ color: 'B', x, y, z, nx: 0, ny: 0, nz: -1 });
        }
      }
    }
  }
  return stickers;
}

function getFaceString(stickers) {
  const arr = new Array(54);
  for (const s of stickers) {
    let face;
    if (s.ny === 1) face = 'U';
    else if (s.nx === 1) face = 'R';
    else if (s.nz === 1) face = 'F';
    else if (s.ny === -1) face = 'D';
    else if (s.nx === -1) face = 'L';
    else if (s.nz === -1) face = 'B';
    const idx = getFaceletIndex(face, s.x, s.y, s.z);
    arr[idx] = s.color;
  }
  return arr.join('');
}

function rotateStickers(stickers, move) {
  const base = move[0];
  const isPrime = move.includes("'");
  const is2 = move.includes('2');
  const turns = is2 ? 2 : (isPrime ? 3 : 1);

  for (let t = 0; t < turns; t++) {
    for (const s of stickers) {
      let inLayer = false;
      if (base === 'U' && s.y === 1) inLayer = true;
      if (base === 'D' && s.y === -1) inLayer = true;
      if (base === 'R' && s.x === 1) inLayer = true;
      if (base === 'L' && s.x === -1) inLayer = true;
      if (base === 'F' && s.z === 1) inLayer = true;
      if (base === 'B' && s.z === -1) inLayer = true;

      if (inLayer) {
        let x = s.x, y = s.y, z = s.z;
        let nx = s.nx, ny = s.ny, nz = s.nz;
        if (base === 'U') {
          s.x = -z; s.z = x;
          s.nx = -nz; s.nz = nx;
        } else if (base === 'D') {
          s.x = z; s.z = -x;
          s.nx = nz; s.nz = -nx;
        } else if (base === 'R') {
          s.y = z; s.z = -y;
          s.ny = nz; s.nz = -ny;
        } else if (base === 'L') {
          s.y = -z; s.z = y;
          s.ny = -nz; s.nz = ny;
        } else if (base === 'F') {
          s.x = y; s.y = -x;
          s.nx = ny; s.ny = -nx;
        } else if (base === 'B') {
          s.x = -y; s.y = x;
          s.nx = -ny; s.ny = nx;
        }
      }
    }
  }
}

const moves = ['U', "U'", 'U2', 'R', "R'", 'R2', 'F', "F'", 'F2', 'D', "D'", 'D2', 'L', "L'", 'L2', 'B', "B'", 'B2'];
let allPass = true;
for (const m of moves) {
  const stickers = createInitialStickers();
  rotateStickers(stickers, m);
  const ourStr = getFaceString(stickers);
  const c = new Cube();
  c.move(m);
  const cubejsStr = c.asString();
  if (ourStr !== cubejsStr) {
    console.error('Mismatch on ' + m);
    console.error('Our:    ' + ourStr);
    console.error('Cubejs: ' + cubejsStr);
    allPass = false;
    break;
  }
}

if (allPass) {
  console.log('SUCCESS! All 18 moves perfectly match cubejs!');
} else {
  process.exit(1);
}
