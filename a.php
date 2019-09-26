<?php
$res = [
    ['from' => ['x' => 277, 'y' => 1], 'to' => ['x' => 332, 'y' => 83]],
    ['from' => ['x' => 332, 'y' => 84], 'to' => ['x' => 168, 'y' => 195]],
    ['from' => ['x' => 168, 'y' => 196], 'to' => ['x' => 196, 'y' => 237]],
    ['from' => ['x' => 199, 'y' => 237], 'to' => ['x' => 348, 'y' => 136]],
    ['from' => ['x' => 350, 'y' => 136], 'to' => ['x' => 405, 'y' => 218]],
    ['from' => ['x' => 405, 'y' => 219], 'to' => ['x' => 253, 'y' => 322]],
    ['from' => ['x' => 253, 'y' => 322], 'to' => ['x' => 281, 'y' => 364]],
    ['from' => ['x' => 284, 'y' => 364], 'to' => ['x' => 447, 'y' => 254]],
    ['from' => ['x' => 448, 'y' => 254], 'to' => ['x' => 503, 'y' => 336]],
    ['from' => ['x' => 503, 'y' => 337], 'to' => ['x' => 228, 'y' => 523]],
    ['from' => ['x' => 227, 'y' => 523], 'to' => ['x' => 1, 'y' => 187]],
    ['from' => ['x' => 1, 'y' => 186], 'to' => ['x' => 275, 'y' => 1]]
];

$fns = [];


bcscale(6);

foreach ($res as $re) {
    $f = $re['from'];
    $t = $re['to'];

    $fx = $f['x'];
    $fy = $f['y'];
    $tx = $t['x'];
    $ty = $t['y'];

    // fy - k * fx = ty - k * tx
    // fy - ty = k * fx - k * tx
    // k = (fy - ty) / (fx - tx)
    // b = (fy + ty - k * fx - k * tx) / 2

    $k = bcdiv(strval($fy - $ty), strval($fx - $tx));
    $b = bcdiv(bcsub(bcsub(bcadd($fy, $ty), bcmul($k, $fx)), bcmul($k, $tx)), '2');

    $fns[] = ['k' => $k, 'b' => $b];
}

$points = [];
$fns_len = count($fns);

for ($i = 0; $i < $fns_len; $i++) {
    $fn1 = $i === 0 ? $fns[$fns_len - 1] : $fns[$i - 1];
    $fn2 = $fns[$i];

    $k1 = $fn1['k'];
    $b1 = $fn1['b'];
    $k2 = $fn2['k'];
    $b2 = $fn2['b'];

    // k1 * x + b1 = k2 * x + b2
    // x = (b1 - b2) / (k2 - k1)
    // y = (k1 * x + b1 + k2 * x + b2) / 2

    $x = bcdiv(bcsub($b1, $b2), bcsub($k2, $k1));
    $y = bcdiv(bcadd(bcadd(bcadd(bcmul($k1, $x), $b1), bcmul($k2, $x)), $b2), 2);

    $points[] = ['x' => $x, 'y' => $y];
}

foreach ($points as $idx => $point) {
    echo '{x: ', $point['x'], ', y: ', $point['y'], "},\n";
}

