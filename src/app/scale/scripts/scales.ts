import {Scale} from './scale';

let Scale1 = new Scale(0, 7, 0);
let Scale2 = new Scale(7, 12, 0.08);
let Scale3 = new Scale(12, 27, 0.14);
let Scale4 = new Scale(27, 42, 0.17);
let Scale5 = new Scale(42, 52, 0.2);
let Scale6 = new Scale(52, 1000, 0.3);

export var SCALES: Scale[] = [
  Scale1,
  Scale2,
  Scale3,
  Scale4,
  Scale5,
  Scale6
];
