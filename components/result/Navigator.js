import { optionColor } from "@/lib/colors";
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
    const isAllIn = actionInteger === resultNode.stack;

    if (resultNode.toCall > 0) {
        if (actionInteger === 0) {
            return "Fold";
        } else if (actionInteger <= resultNode.toCall) {
            return `Call ${actionInteger}${isAllIn ? " - All In" : ""}`;
        } else if (actionInteger > resultNode.toCall) {
            return `Raise to ${resultNode.committed + actionInteger}${isAllIn ? " - All In" : ""}`;
        }
    } else if (resultNode.toCall === 0) {
        if (actionInteger === 0) {
            return "Check";
        } else if (actionInteger > 0) {
            return `Bet ${actionInteger}${isAllIn ? " - All In" : ""}`;
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
    const actionNavInfo = {};

    for (const childKey of resultNode.childKeys) {
        const actionInteger = determineLastActionInteger(childKey);

        if (!(String(actionInteger) in actionNavInfo)) {
            const actionDisplay = actionIntegerToActionDisplay(actionInteger, resultNode);
            const streetAdvance = determineStreetAdvance(result, resultNode, childKey);
            const actionColor = optionColor(actionInteger, resultNode.toCall, resultNode.potBeforeCall);

            actionNavInfo[String(actionInteger)] = {
                actionDisplay,
                streetAdvance,
                childKey,
                actionColor,
            };
        }
    }

    for (const action of resultNode.actions) {
        if (!(String(action) in actionNavInfo)) {
            const actionDisplay = actionIntegerToActionDisplay(action, resultNode);
            const actionColor = optionColor(action, resultNode.toCall, resultNode.potBeforeCall);

            actionNavInfo[String(action)] = {
                actionDisplay,
                streetAdvance: null,
                childKey: null,
                actionColor,
            };
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
            {Object.keys(actionNavInfo).map(actionInteger => (
                <NavItem
                    key={"nav-" + actionInteger}
                    result={result}
                    resultNode={resultNode}
                    setResultNode={setResultNode}
                    navInfo={actionNavInfo[actionInteger]}
                />
            ))}
        </div>
    );
};