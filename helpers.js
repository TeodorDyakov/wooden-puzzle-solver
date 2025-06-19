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