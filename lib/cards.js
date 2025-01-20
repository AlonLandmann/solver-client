export const values = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
export const suits = ["s", "h", "d", "c"];
export const deck = [];
export const deckIndices = {};
export const combos = [];
export const comboIndices = {};

for (let i = 0, counter = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
        deck.push(values[i] + suits[j]);
        deckIndices[values[i] + suits[j]] = counter;
        counter++;
    }
}

for (let i = 0, counter = 0; i < 51; i++) {
    for (let j = i + 1; j < 52; j++) {
        combos.push(deck[i] + deck[j]);
        comboIndices[deck[i] + deck[j]] = counter;
        counter++;
    }
}

export function sameComboValues(combo1, combo2) {
    return combo1[0] === combo2[0] && combo1[2] === combo2[2];
};

export function cIntFromCard(card) {
    return values.toReversed().indexOf(card[0]) * 4 + suits.toReversed().indexOf(card[1]);
};