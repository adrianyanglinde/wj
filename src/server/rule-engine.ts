import { Engine } from 'json-rules-engine';

/**
 * Setup a new engine
 */
const engine = new Engine();

// define a rule for detecting the player has exceeded foul limits.  Foul out any player who:
// (has committed 5 fouls AND game is 40 minutes) OR (has committed 6 fouls AND game is 48 minutes)
engine.addRule({
    conditions: {
        any: [
            {
                all: [
                    {
                        fact: 'gameDuration',
                        operator: 'equal',
                        value: 4
                    },
                    {
                        fact: 'personalFoulCount',
                        operator: 'greaterThanInclusive',
                        value: 5
                    }
                ]
            },
            {
                all: [
                    {
                        fact: 'gameDuration',
                        operator: 'equal',
                        value: 8
                    },
                    {
                        fact: 'personalFoulCount',
                        operator: 'greaterThanInclusive',
                        value: 6
                    }
                ]
            }
        ]
    },
    event: {
        // define the event to fire when the conditions evaluate truthy
        type: 'fouledOut',
        params: {
            message: 'Player has fouled out!'
        }
    }
});

export default engine;
