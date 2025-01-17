const DEFAULT_TABLE_WIDTH = 710;

export function scaleTableStyle(base, tableWidth, power = 1, min = 0, max = Infinity) {
    return Math.min(max, Math.max(min, base * Math.pow(tableWidth / DEFAULT_TABLE_WIDTH, power)));
};