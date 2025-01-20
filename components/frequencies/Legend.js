import { combos } from "@/lib/cards";

export default function Legend({ setSelected, playerInEditor, frequencies }) {
    const brushes = {};

    for (let i = 0; i < 1326; i++) {
        if (!(String(frequencies[playerInEditor][i]) in brushes)) {
            brushes[String(frequencies[playerInEditor][i])] = [combos[i]];
        } else {
            brushes[String(frequencies[playerInEditor][i])].push(combos[i]);
        }
    }

    function handleClick(e, frequency) {
        if (e.shiftKey) {
            setSelected(p => p.filter(c => !(brushes[frequency].includes(c))));
        } else {
            setSelected(p => p.concat(brushes[frequency]));
        }
    }

    return (
        <div className="p-8 flex flex-col gap-1">
            {Object.keys(brushes).toReversed().map(frequency => (
                <div
                    key={frequency}
                    className="px-3 py-2 border rounded-sm flex justify-between items-center gap-2 cursor-pointer"
                    onClick={e => handleClick(e, frequency)}
                >
                    <div
                        className="w-4 h-4 rounded-sm"
                        style={{
                            backgroundColor: `hsl(0, 0%, ${(20 + Number(frequency) * 0.07)}%)`,
                        }}
                    >

                    </div>
                    <div>
                        {frequency}
                    </div>
                </div>
            ))}
        </div>
    );
};