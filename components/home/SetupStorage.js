import { produce } from "immer";
import { useEffect, useState } from "react";

export default function SetupStorage({ setup, setSetup, spot, setSpot, frequencies, setFrequencies }) {
    const [saveName, setSaveName] = useState("");
    const [loadName, setLoadName] = useState("");
    const [saves, setSaves] = useState({});

    useEffect(() => {
        const data = window.localStorage.getItem("setups");

        setSaves(data ? JSON.parse(data) : {});
    }, []);

    function handleSaveSetup() {
        let proceed = true;

        if (saveName in saves) {
            proceed = window.confirm("Save already exists. Do you want to overwrite the data?");
        }

        if (proceed) {
            setSaves(produce(p => {
                p[saveName] = { setup, spot, frequencies };
            }))

            window.localStorage.setItem("setups", JSON.stringify(produce(saves, p => {
                p[saveName] = { setup, spot, frequencies };
            })));
        }
    }

    function handleLoadSetup() {
        if (!(loadName in saves)) {
            return window.alert("A save with this name doesn't exist");
        }

        setSetup({ ...saves[loadName].setup, loadedSetup: true });
        setSpot(saves[loadName].spot);
        setFrequencies(saves[loadName].frequencies);
    }

    return (
        <div className="flex gap-8">
            <div className="flex gap-1">
                <input
                    className="w-52 px-4 py-3 rounded-sm outline-none border text-sm bg-neutral-800 border-neutral-800 focus:border-neutral-700 text-neutral-100 placeholder-neutral-600"
                    placeholder="Setup Name"
                    value={saveName}
                    onChange={e => setSaveName(e.target.value)}
                />
                <button
                    className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                    onClick={handleSaveSetup}
                >
                    Save Setup
                </button>
            </div>
            {Object.keys(saves).length > 0 &&
                <div className="flex gap-1">
                    <select
                        className="bg-neutral-800 w-52 px-4 py-3 rounded-sm border text-sm text-center focus:border-neutral-700 placeholder-neutral-300 focus:placeholder-white appearance-none"
                        value={loadName}
                        onChange={e => setLoadName(e.target.value)}
                    >
                        <option value="">--</option>
                        {Object.keys(saves).map(save => (
                            <option
                                key={save}
                                value={save}
                            >
                                {save}
                            </option>
                        ))}
                    </select>
                    <button
                        className="border rounded-sm px-4 py-3 text-sm text-neutral-400 transition hover:text-neutral-200"
                        onClick={handleLoadSetup}
                    >
                        Load Setup
                    </button>
                </div>
            }
        </div>
    );
};