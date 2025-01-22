import NavItem from "./NavItem";

const streets = ["Preflop", "Flop", "Turn", "River"];

function getActionIntegers(key) {
    const actionString = key.split(":")[0];
    if (actionString === "") {
        return [];
    }
    return actionString.split("_").map(a => Number(a));
}

function determineLastActionInteger(key) {
    const actionIntegers = getActionIntegers(key);
    if (actionIntegers.length === 0) {
        return null;
    }
    return actionIntegers[actionIntegers.length - 1];
}

function actionIntegerToActionDisplay(actionInteger, resultNode) {
    if (resultNode.toCall > 0) {
        if (actionInteger === 0) {
            return "Fold";
        } else if (actionInteger <= resultNode.toCall) {
            return `Call ${actionInteger}`;
        } else if (actionInteger > resultNode.toCall) {
            return `Raise to ${resultNode.committed + actionInteger}`;
        }
    } else if (resultNode.toCall === 0) {
        if (actionInteger === 0) {
            return "Check";
        } else if (actionInteger > 0) {
            return `Bet ${actionInteger}`;
        }
    }
}

function determineStreetAdvance(result, resultNode, childKey) {
    const parentStreet = resultNode.street;
    const childStreet = result[childKey].street;

    if (parentStreet === childStreet) {
        return false;
    }

    return streets[childStreet];
}

function getActionNavInfo(result, resultNode) {
    const actionNavInfo = [];

    for (const childKey of resultNode.childKeys) {
        const actionDisplay = actionIntegerToActionDisplay(determineLastActionInteger(childKey), resultNode);
        const streetAdvance = determineStreetAdvance(result, resultNode, childKey);

        if (!actionNavInfo.map(nav => nav.actionDisplay).includes(actionDisplay)) {
            actionNavInfo.push({
                actionDisplay,
                streetAdvance,
                childKey,
            });
        }
    }

    return actionNavInfo;
}

export default function Navigator({ result, resultNode, setResultNode }) {
    const actionNavInfo = getActionNavInfo(result, resultNode);

    return (
        <div className="flex flex-col items-start gap-1">
            {resultNode.parentKey &&
                <button
                    className="px-3 py-2 border rounded-sm text-neutral-300 cursor-pointer transition hover:text-neutral-100"
                    onClick={() => setResultNode(result[resultNode.parentKey])}
                >
                    <i className="bi bi-arrow-left"></i>
                </button>
            }
            {actionNavInfo.map((navInfo, i) => (
                <NavItem
                    key={"nav-" + i}
                    result={result}
                    resultNode={resultNode}
                    setResultNode={setResultNode}
                    navInfo={navInfo}
                />
            ))}
        </div>
    );
};