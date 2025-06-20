function equalShapes(shape1, shape2) {
    for (let i = 0; i < shape1.coordslength; i++) {
        if (!shape1.coords[i].equals(shape2.coords[i])) {
            return false;
        }
    }
    return true;
}
//shape is an array of threejs vector3
function containsShape(arrayOfShapes, shape) {
    for (let s of arrayOfShapes) {
        if (equalShapes(shape, s)) {
            return false;
        }
    }
    return true;
}

function copyShape(shape){
    let copy = [];
    for(let vec of shape){
        copy.push(vec.clone());
    }
    return copy;
}

const cubeRotations = [
    (x, y, z) => [ x,  y,  z],
    (x, y, z) => [ x, -y, -z],
    (x, y, z) => [-x,  y, -z],
    (x, y, z) => [-x, -y,  z],
  
    (x, y, z) => [ y,  z,  x],
    (x, y, z) => [ y, -z, -x],
    (x, y, z) => [-y,  z, -x],
    (x, y, z) => [-y, -z,  x],
  
    (x, y, z) => [ z,  x,  y],
    (x, y, z) => [ z, -x, -y],
    (x, y, z) => [-z,  x, -y],
    (x, y, z) => [-z, -x,  y],
  
    (x, y, z) => [ x,  z, -y],
    (x, y, z) => [ x, -z,  y],
    (x, y, z) => [-x,  z,  y],
    (x, y, z) => [-x, -z, -y],
  
    (x, y, z) => [ y,  x, -z],
    (x, y, z) => [ y, -x,  z],
    (x, y, z) => [-y,  x,  z],
    (x, y, z) => [-y, -x, -z],
  
    (x, y, z) => [ z,  y, -x],
    (x, y, z) => [ z, -y,  x],
    (x, y, z) => [-z,  y,  x],
    (x, y, z) => [-z, -y, -x],
  ];
  

  function applyRotation(arr, rot) {
    const result = [...Array(3)].map(() =>
      [...Array(3)].map(() =>
        Array(3)
      )
    );
  
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        for (let z = 0; z < 3; z++) {
          const cx = x - 1, cy = y - 1, cz = z - 1;
          const [rx, ry, rz] = rot(cx, cy, cz);
          const nx = rx + 1, ny = ry + 1, nz = rz + 1;
          result[nx][ny][nz] = arr[x][y][z];
        }
      }
    }
  
    return result;
  }
  
  function arrayToKey(arr) {
    return arr.flat(2).join(',');
  }
  
  function getCanonicalForm(arr) {
    let minKey = null;
  
    for (const rot of cubeRotations) {
      const rotated = applyRotation(arr, rot);
      const key = arrayToKey(rotated);
      if (minKey === null || key < minKey) {
        minKey = key;
      }
    }
  
    return minKey;
  }
  
  //arrayOfArrays
  function deduplicateShapes(arrayOfSolutions) {
    const seen = new Set();
    const unique = [];
  
    for (const solution of arrayOfSolutions) {
      const canon = getCanonicalForm(solution.cube);
      if (!seen.has(canon)) {
        seen.add(canon);
        unique.push(solution.pieceArray);
      }
    }
  
    return unique;
  }
  