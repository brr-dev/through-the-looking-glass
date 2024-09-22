// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import { Zenith } from '@zenith-game/core';

const Z00_ROOMS = {
    BEDROOM: 'Bedroom',
    CLOSET: 'Closet',
    HALLWAY: 'Hallway',
    OFFICE: 'Office',
    BATHROOM: 'Bathroom',
    LIVING_ROOM: 'LivingRoom',
    KITCHEN: 'Kitchen',
    OUTSIDE: 'Outside',
    BALCONY: 'Balcony',
};

const Z00_CONDITIONS = {
    FEAR_OF_MIRROR: 'fearOfMirror',
    EMPTY_MIRROR: 'emptyMirror',
};

const Z00_KEYS = {
    BATHROOM_DOOR: 'z00_bathroom_door',
    BEDROOM_DOOR: 'z00_bedroom_door',
    OFFICE_DOOR: 'z00_office_door',
    CLOSET_SAFE_PIN: '4815',
};

const Z00_BOOKS = {
    poesTales: {
        definition: {
            title: "Poe's Complete Tales and Poems",
            author: 'Edgar Allen Poe',
            text:
                'Eleonora: ' +
                '\n\n' +
                'Men have called me mad; but the question is not yet settled, ' +
                'whether madness is or is not the loftiest intelligence - ' +
                'whether much that is glorious - whether all that is profound - ' +
                'does not spring from disease of thought - from moods of mind ' +
                'exalted at the expense of the general intellect.',
        },
    } as Zenith.DefinitionMap<Zenith.BookDefinition>,
    madnessBipolar: {
        definition: {
            title: 'Madness: A Bipolar Life',
            author: 'Marya Hornbacher',
            text:
                "When you are mad, mad like this, you don't know it." +
                '\n\n' +
                'Reality is what you see. When what you see shifts, departing ' +
                "from anyone else's reality, it's still reality to you.",
        },
    } as Zenith.DefinitionMap<Zenith.BookDefinition>,
    furiouslyHappy: {
        definition: {
            title: 'Furiously Happy',
            author: 'Jenny Lawson',
            text:
                'When you come out of the grips of a depression there is an ' +
                'incredible relief, but not one you feel allowed to celebrate.' +
                '\n\n' +
                'Instead, the feeling of victory is replaced with anxiety that ' +
                'it will happen again, and with shame and vulnerability when ' +
                'you see how your illness affected your family, your work, ' +
                'everything left untouched while you struggled to survive.',
        },
    } as Zenith.DefinitionMap<Zenith.BookDefinition>,
    theFirstStep: {
        definition: {
            title: 'The First Step',
            author: 'Emm Roy',
            text:
                'Sometimes monsters are invisible, and ' +
                'sometimes demons attack you from the inside. ' +
                'Just because you cannot see the claws and the teeth ' +
                "does not mean they aren't ripping through me." +
                '\n\n' +
                'Pain does not need to be seen to be felt.',
        },
    } as Zenith.DefinitionMap<Zenith.BookDefinition>,
    keyToHappiness: {
        definition: {
            title: 'The Key to Happiness',
            author: 'Lara Bernardi',
            text:
                'For centuries, many of us have kept the doors of the heart ' +
                'closed... Closing ourselves off was a means of protecting ' +
                'ourselves. But now it is time to let down this guard.',
            items: [
                {
                    type: Zenith.Key,
                    definition: {
                        keyCode: Z00_KEYS.OFFICE_DOOR,
                        description: 'the key to your office',
                        discoverText: `In a hollowed-out section of the book, you find the $NAME$ to your office.`,
                        roomText:
                            'Your office $NAME$ is in "The Key to Happiness".',
                    },
                },
            ],
        },
    } as Zenith.DefinitionMap<Zenith.BookDefinition>,
    slaughterhouseFive: {
        definition: {
            title: 'Slaughterhouse Five',
            author: 'Kurt Vonnegut',
            text:
                'All time is all time. It does not change. It does not lend itself to ' +
                'warnings or explanations. It simply is. Take it moment by moment, and ' +
                "you will find that we are all, as I've said before, bugs in amber.",
        },
    } as Zenith.DefinitionMap<Zenith.BookDefinition>,
    dandelionWine: {
        definition: {
            title: 'Dandelion Wine',
            author: 'Ray Bradbury',
            text:
                'Some people turn sad awfully young. No special reason, it seems, but ' +
                'they seem almost to be born that way. They bruise easier, tire faster, ' +
                'cry quicker, remember longer and, as I say, get sadder younger than ' +
                "anyone else in the world. I know, for I'm one of them.",
        },
    } as Zenith.DefinitionMap<Zenith.BookDefinition>,
    aliceInWonderland: {
        definition: {
            title: 'Alice in Wonderland',
            author: 'Lewis Carroll',
            text:
                'Alice asked the Cheshire Cat, who was sitting in a tree, ' +
                '"What road do I take?"' +
                '\n\n' +
                'The cat asked, "Where do you want to go?"' +
                '\n\n' +
                '"I don\'t know," Alice answered.' +
                '\n\n' +
                '"Then," said the cat, "it really doesn\'t matter, does it?"',
        },
    } as Zenith.DefinitionMap<Zenith.BookDefinition>,
};

const Z00: {
    ROOMS: Record<keyof typeof Z00_ROOMS, string>;
    CONDITIONS: Record<keyof typeof Z00_CONDITIONS, string>;
    KEYS: Record<keyof typeof Z00_KEYS, string>;
    BOOKS: Record<keyof typeof Z00_BOOKS, Zenith.BookDefinition>;
} = {
    ROOMS: Z00_ROOMS,
    CONDITIONS: Z00_CONDITIONS,
    KEYS: Z00_KEYS,
    BOOKS: Z00_BOOKS,
};

export default Z00;
