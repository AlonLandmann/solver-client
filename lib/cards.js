export const values = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
export const suits = ["s", "h", "d", "c"];

export const deck = [];

for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
        deck.push(values[i] + suits[j]);
    }
}