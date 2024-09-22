// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import { PLAYER_CONDITIONS } from '../../ThroughTheLookingGlass.disc';
import { MagicMirror } from './features';
import Z00 from './Z00.const';
import { ReactNode } from 'react';
import { Zenith } from '@zenith-game/core';

export default {
    // prettier-ignore
    map: [
        [Z00.ROOMS.LIVING_ROOM, Z00.ROOMS.LIVING_ROOM, Z00.ROOMS.KITCHEN ],
        [Z00.ROOMS.OFFICE,      Z00.ROOMS.HALLWAY,     Z00.ROOMS.BATHROOM],
        [Z00.ROOMS.BALCONY,     Z00.ROOMS.BEDROOM,     Z00.ROOMS.CLOSET  ]
    ],
    startingRoom: Z00.ROOMS.BEDROOM,
    zoneConditions: {
        [Z00.CONDITIONS.FEAR_OF_MIRROR]: false,
        [Z00.CONDITIONS.EMPTY_MIRROR]: false,
    },
    playerConditions: {
        [PLAYER_CONDITIONS.AGORAPHOBIA]: true,
    },
    rooms: [
        {
            id: Z00.ROOMS.BEDROOM,
            onEnter: (room, game) => {
                let onEnterText = '';

                if (!room.isVisited) {
                    // Intro text on first visit
                    onEnterText +=
                        'You wake up to a loud blaring sound, just like any ' +
                        'other day. Reaching over, you turn off your alarm, ' +
                        'and are plunged into a comforting silence. ' +
                        'Rubbing the sleep from your eyes, you look around ' +
                        'the dark room before you.' +
                        '\n\n';
                } else {
                    onEnterText += "You're in your bedroom. ";
                }

                onEnterText +=
                    'The curtains on the window are drawn tight, preventing any ' +
                    'sunlight from entering. In one corner you can just about ' +
                    'make out a pile of laundry on the floor.';

                onEnterText += '\n\n';

                if (!room.isVisited) {
                    onEnterText += 'The peaceful silence is short-lived. ';
                }

                onEnterText +=
                    'Somewhere nearby, you can hear a faint but steady tapping. ' +
                    'You live alone.' +
                    '\n\n' +
                    'Where could it be coming from?';

                return onEnterText;
            },
            exits: [
                {
                    id: Z00.ROOMS.HALLWAY,
                    direction: 'north',
                    displayText: (exit) => {
                        let exitText = 'To the $DIR$ is the hallway.';

                        if (!exit.locked)
                            exitText += " You've unlocked the door.";
                        else if (exit.lockDiscovered)
                            exitText += ' The door is locked';

                        return exitText;
                    },
                    locked: { code: Z00.KEYS.BEDROOM_DOOR },
                    lockedInteractionText: (
                        <>
                            You try to exit your bedroom, but the door is
                            locked. You'd begun locking it before bed after a
                            few too many horror movies about home invasions.
                            You'll need to {Zenith.wrapInputTag('unlock')} the
                            door if you want to move to the hallway.
                            <br />
                            <br />
                            Now where did you leave the{' '}
                            {Zenith.wrapInputTag('key')}?
                        </>
                    ),
                },
                {
                    id: Z00.ROOMS.CLOSET,
                    direction: 'east',
                    displayText: 'To the $DIR$ is your closet.',
                },
                {
                    id: Z00.ROOMS.BALCONY,
                    direction: 'west',
                    displayText: 'To the $DIR$ is the balcony.',
                },
            ],
            features: [
                {
                    type: Zenith.Bookshelf,
                    definition: {
                        roomText:
                            'By the door is a $NAME$. Are there any books on it?',
                        interactionText:
                            "Although it's a bookshelf, it contains mostly old CDs, collectibles, " +
                            'and other random trinkets. Carefully, you reposition a small statue ' +
                            'that had fallen over.' +
                            '\n\n' +
                            'You manage to find one book on the bottom shelf.',
                        books: [Z00.BOOKS.aliceInWonderland],
                    } as Zenith.BookshelfDefinition,
                },
                {
                    definition: {
                        name: 'dresser',
                        roomText: 'Your $NAME$ is under the window.',
                        interactionText:
                            "You're standing in front of your dresser. The smallest ray of light " +
                            'peeks through between the curtains, allowing you to just make out ' +
                            'the items on its surface.' +
                            '\n\n' +
                            'One one side is a large stack of bills, documents, and other things ' +
                            'you kept "just in case". On the other is a pile of clothes that you ' +
                            'had always intended to put away. The pile now slumps off the side ' +
                            'of the dresser.',
                    },
                },
            ],
            items: [],
        },
        {
            id: Z00.ROOMS.BALCONY,
            onEnter: (room, game) => {
                return (
                    <>
                        You're outside. A privacy screen surrounds your balcony
                        on all sides. The awning and the surrounding trees block
                        out the morning sun, leaving your balcony cold and dark
                        despite the day's pleasant weather.
                        <br />
                        <br />
                        On one end, there's a small seating area tucked safely
                        under the awning. Two chairs and a small, dusty{' '}
                        {Zenith.wrapInputTag('table', () =>
                            game.console.setInputValue('look at table'),
                        )}{' '}
                        covered in cups. On the other end is a stack of{' '}
                        {Zenith.wrapInputTag('boxes', () =>
                            game.console.setInputValue('look at boxes'),
                        )}{' '}
                        that were never unpacked.
                        <br />
                        <br />
                        You can no longer hear the tapping noise from inside
                        your apartment. You find that the sounds of passing
                        cars, arguing neighbors, and rustling leaves in the
                        trees are all welcome replacements.
                    </>
                );
            },
            exits: [
                {
                    id: Z00.ROOMS.BEDROOM,
                    direction: 'east',
                    displayText: 'To the $DIR$ is your bedroom.',
                },
            ],
            features: [
                {
                    definition: {
                        name: 'boxes',
                        roomText: null,
                        interactionText:
                            'The boxes have been here since you moved in over two months ago, and ' +
                            'are covered in a thin layer of dust. The labels on the outside of each ' +
                            'provide a hint to their contents.' +
                            '\n\n' +
                            'One box labeled "Bedroom" contains all of the things that used ' +
                            'to adorn the walls of your old room. Posters, photos, awards, all ' +
                            'lay inside, waiting to be put on display.',
                    },
                },
                {
                    definition: {
                        name: 'table',
                        roomText: null,
                        interactionText:
                            'You look at the assortment of cups on the table. Half-finished mugs ' +
                            'of tea and coffee are interspersed with glasses of cloudy water. How ' +
                            'long have these been out here?' +
                            '\n\n' +
                            'You sift through the small stack of mail, ignoring the credit card ' +
                            'offers and fast food coupons that never seem to stop coming.',
                        items: [
                            {
                                type: Zenith.Key,
                                definition: {
                                    keyCode: Z00.KEYS.BEDROOM_DOOR,
                                    description: 'the key to your bedroom',
                                    discoverText:
                                        'You find the $NAME$ to your bedroom under the stack.',
                                    roomText:
                                        'The $NAME$ to your bedroom is on the dusty table.',
                                } as Zenith.KeyDefinition,
                            },
                        ],
                    },
                },
            ],
        },
        {
            id: Z00.ROOMS.CLOSET,
            onEnter: (room, game) => {
                return (
                    <>
                        You're in front of your closet. There's a rail of{' '}
                        {Zenith.wrapInputTag('clothes', () =>
                            game.console.setInputValue('look at clothes'),
                        )}{' '}
                        hanging on the back wall with a shelf on top. There's a
                        shoe rack underneath, and some suitcases and other{' '}
                        {Zenith.wrapInputTag('bags', () =>
                            game.console.setInputValue('look at bags'),
                        )}{' '}
                        lying around.
                        <br />
                        <br />
                        The rhythmic tapping continues nearby, slightly more
                        muffled than before.
                    </>
                );
            },
            exits: [
                {
                    id: Z00.ROOMS.BEDROOM,
                    direction: 'west',
                    displayText: 'To the $DIR$ is your bedroom.',
                },
            ],
            features: [
                {
                    definition: {
                        name: 'bags',
                        roomText: null,
                        interactionText:
                            'A few suitcases of various sizes, a few old backpacks in various ' +
                            'states of disrepair, and a gym bag. You notice a few belts as well, ' +
                            'and a shirt that has fallen off of its hanger.',
                    },
                },
                {
                    definition: {
                        name: 'clothes',
                        roomText: null,
                        interactionText:
                            "You've had most of these clothes for years, and as a result it's " +
                            'been a while since they have been in rotation. In fact, some of ' +
                            "them you've never even worn at all.",
                    },
                },
                {
                    definition: {
                        name: 'safe',
                        roomText: (feature) => {
                            let roomText =
                                "There's a small $NAME$ on the top shelf.";

                            if (!feature.locked) roomText += " It's open.";
                            else if (feature.lockDiscovered)
                                roomText += " It's locked.";

                            return roomText;
                        },
                        interactionText: (safe, gameController) => {
                            const hasKey =
                                Zenith.hasItem(safe, 'key') ||
                                Zenith.hasItem(
                                    gameController.getCurrentRoom(),
                                    'key',
                                );

                            return (
                                <>
                                    The safe contains some cash and some other
                                    personal documents. Near the back you find
                                    your passport, which has been sitting here
                                    safe and stamp-less since you got it.
                                    Underneath the passport, you find an old
                                    keychain - a gift from an ex
                                    {hasKey && (
                                        <>
                                            {' '}
                                            - and the{' '}
                                            {Zenith.wrapInputTag('key')} to the
                                            bathroom
                                        </>
                                    )}
                                    .
                                </>
                            );
                        },
                        locked: { type: 'pin', code: Z00.KEYS.CLOSET_SAFE_PIN },
                        items: [
                            {
                                type: Zenith.Key,
                                definition: {
                                    keyCode: Z00.KEYS.BATHROOM_DOOR,
                                    discoverText: null,
                                    roomText:
                                        'The $NAME$ to your bathroom is in the safe.',
                                    description: 'the key to your bathroom',
                                } as Zenith.KeyDefinition,
                            },
                        ],
                    },
                },
            ],
        },
        {
            id: Z00.ROOMS.HALLWAY,
            onEnter: (room, game) => {
                if (game.zone.hasCondition(Z00.CONDITIONS.FEAR_OF_MIRROR)) {
                    // Apply the "arachnophobia" condition to the Player
                    game.player.setCondition(
                        PLAYER_CONDITIONS.ARACHNOPHOBIA,
                        true,
                    );

                    return [
                        <>
                            You step into the hallway. The once empty corridor
                            is now completely covered in a macabre tapestry of
                            silk. Thick, viscous strands stretch from wall to
                            wall, forming an intricate lattice that threatens to
                            ensnare any who attempt to pass. Every step forward
                            is met with the unsettling sensation of brushing
                            against the sticky embrace of countless spiderwebs,
                            each glistening with a sickly sheen in the dim
                            light.
                            <br />
                            <br />A chittering chorus rises as you contemplate
                            your next move, sending a shudder through your body
                            as your eyes take in the source of the sound.
                            Countless spiders, ranging in size from minuscule to
                            monstrous, scuttle across the walls and ceilings
                            with unnerving grace. Their eyes follow you with a
                            predatory glint, indicating a mix of curiosity and
                            hunger.
                        </>,
                    ];
                } else {
                    return (
                        "You're standing in the hallway. There's a spider by the bathroom door. The " +
                        'tapping sounds much closer than before.'
                    );
                }
            },
            exits: [
                {
                    id: Z00.ROOMS.LIVING_ROOM,
                    direction: 'north',
                    displayText: 'To the $DIR$ is the living room.',
                    blocked: (e, c, t, game) =>
                        game.zone.hasCondition(Z00.CONDITIONS.FEAR_OF_MIRROR)
                            ? 'The arachnid horde blocks your path.'
                            : '',
                },
                {
                    id: Z00.ROOMS.OFFICE,
                    direction: 'west',
                    displayText: (exit, c, t, game) => {
                        let exitText = 'To the $DIR$ is your office.';

                        if (exit.blocked(game)) exitText += '';
                        else if (!exit.locked) exitText += " It's open.";
                        else if (exit.lockDiscovered)
                            exitText += " It's locked.";

                        return exitText;
                    },
                    blocked: (e, c, t, game) =>
                        game.zone.hasCondition(Z00.CONDITIONS.FEAR_OF_MIRROR)
                            ? 'The arachnid horde blocks your path.'
                            : '',
                    locked: { code: Z00.KEYS.OFFICE_DOOR },
                },
                {
                    id: Z00.ROOMS.BATHROOM,
                    direction: 'east',
                    displayText: (exit) => {
                        let text = 'To the $DIR$ is the bathroom.';

                        if (!exit.locked) text += " It's open.";
                        else if (exit.lockDiscovered) text += " It's locked.";

                        return text;
                    },
                    locked: { code: Z00.KEYS.BATHROOM_DOOR },
                },
                {
                    id: Z00.ROOMS.BEDROOM,
                    direction: 'south',
                    displayText: 'To the $DIR$ is your bedroom.',
                    blocked: (e, c, t, game) =>
                        game.zone.hasCondition(Z00.CONDITIONS.FEAR_OF_MIRROR)
                            ? 'The arachnid horde blocks your path.'
                            : '',
                },
            ],
            features: [
                {
                    definition: {
                        name: 'spider',
                        roomText: null,
                        interactionText:
                            "This spider has been here since you moved in, but you can't get " +
                            'close enough to kill it before chickening out. As you move around ' +
                            "the room, you get the sensation that it's watching you.",
                    },
                },
            ],
        },
        {
            id: Z00.ROOMS.OFFICE,
            onEnter: (_room, _game) => {
                return (
                    <>
                        You're in your office. Small slivers of sunlight filter
                        in through the mostly-shut blinds that cover the window,
                        barely illuminating the cold room before you.
                        <br />
                        <br />A collection of electronics and oddities, gadgets
                        and toys used once or twice before being relegated to
                        set dressing for your webcam meetings, line the wall
                        opposite your{' '}
                        {Zenith.wrapInputTag('desk', () =>
                            _game.console.setInputValue('look at desk'),
                        )}
                        .
                        <br />
                        <br />
                        The desk itself sits in front of the window, its
                        monitors blocking most of the already-feeble light let
                        in by the blinds. On one side of the window is a
                        bulletin{' '}
                        {Zenith.wrapInputTag('board', () =>
                            _game.console.setInputValue('look at board'),
                        )}
                        , on the other is a{' '}
                        {Zenith.wrapInputTag('bookshelf', () =>
                            _game.console.setInputValue('look at bookshelf'),
                        )}
                        .
                    </>
                );
            },
            exits: [
                {
                    id: Z00.ROOMS.HALLWAY,
                    direction: 'east',
                    displayText: 'To the $DIR$ is your hallway.',
                },
            ],
            features: [
                {
                    definition: {
                        name: 'desk',
                        roomText: null,
                        interactionText:
                            "You're standing in front of your desk. The waste bin underneath is " +
                            'overflowing with crumpled receipts and discarded packaging materials.' +
                            '\n\n' +
                            'Your ergonomic mouse and keyboard are coated in a thin layer of dust. ' +
                            "It'd been a few weeks since you'd done any work in here, so it's no " +
                            "surprise to see them in this state. There's a stack of notebooks next " +
                            'to your pen cup, some full, some brand new, but all of them perched ' +
                            'precariously close to the edge of the desk.',
                    },
                },
                {
                    type: Zenith.Bookshelf,
                    definition: {
                        roomText: null,
                        interactionText:
                            'There are a few books on the top shelf. The other shelves are bare.',
                        books: [
                            Z00.BOOKS.furiouslyHappy,
                            Z00.BOOKS.madnessBipolar,
                            Z00.BOOKS.theFirstStep,
                        ],
                    } as Zenith.BookshelfDefinition,
                },
                {
                    definition: {
                        name: 'board',
                        roomText: null,
                        interactionText:
                            "You're looking at your bulletin board. It's covered in " +
                            'photos of you with old friends, ticket stubs from movies ' +
                            'and concerts, and an assortment of cute stickers.',
                        features: [
                            {
                                type: Zenith.Book,
                                definition: {
                                    name: 'note',
                                    discoverText:
                                        "There's a $NAME$ on the board with part of your safe code.",
                                    roomText:
                                        "There's a $NAME$ on the bulletin board.",
                                    text: `(${Z00.KEYS.CLOSET_SAFE_PIN.charAt(0)} ${Z00.KEYS.CLOSET_SAFE_PIN.charAt(1)} _ _)`,
                                } as Zenith.BookDefinition,
                            },
                        ],
                    },
                },
            ],
        },
        {
            id: Z00.ROOMS.BATHROOM,
            onEnter: (_room, game) => {
                let onEnterText;

                const _tag = (feat: string) =>
                    Zenith.wrapInputTag(feat, () =>
                        game.console.setInputValue(`look at ${feat}`),
                    );

                const _sink = _tag('sink');
                const _mirror = _tag('mirror');
                const _trash = _tag('trash');

                // TODO fix this
                if (game.zone.hasCondition(Z00.CONDITIONS.EMPTY_MIRROR)) {
                    if (
                        game.player.hasCondition(
                            PLAYER_CONDITIONS.ARACHNOPHOBIA,
                        )
                    ) {
                        onEnterText = (
                            <>
                                The skittering sound continues outside the
                                bathroom door.
                            </>
                        );
                    } else {
                        onEnterText = (
                            <>You can no longer hear the tapping sound.</>
                        );
                    }

                    onEnterText = (
                        <>
                            {onEnterText} The large, ornate {_mirror} sits
                            perched on the wall above the {_sink}. You no longer
                            have a reflection. The thought of looking again
                            fills you with dread.
                            <br />
                            <br />
                            Against the other wall are a toilet, shower, and an
                            overflowing {_trash} bin.
                            <br />
                            <br />
                            You're trapped in the bathroom with a mirror that is
                            most certainly not a mirror. You are being assaulted
                            by some unknown malevolent force. Holding back a
                            silent cry, and attempting to stay calm, you ponder
                            your next move, wondering if it will be your last.
                        </>
                    );
                } else if (
                    game.zone.hasCondition(Z00.CONDITIONS.FEAR_OF_MIRROR)
                ) {
                    if (
                        game.player.hasCondition(
                            PLAYER_CONDITIONS.ARACHNOPHOBIA,
                        )
                    ) {
                        onEnterText = (
                            <>
                                You slam the door shut behind you, leaving only
                                a few inches of wood between you and the
                                nightmarish weavers invading your hallway
                                outside. The tapping sound has been replaced by
                                the skittering of the horde in the hallway.
                                <br />
                                <br />
                            </>
                        );
                    } else {
                        onEnterText = <>The tapping has stopped. </>;
                    }

                    onEnterText = (
                        <>
                            {onEnterText}
                            Looking around the bathroom, your mind goes back to
                            what you saw. Did your reflection really blink at
                            you? Your morbid sense of curiosity draws you to the{' '}
                            {_mirror} again.
                            <br />
                            <br />
                            The {_sink} is sitting directly centered below the
                            mirror. Against the other wall are a toilet, shower,
                            and an overflowing {_trash} bin.
                        </>
                    );
                } else {
                    onEnterText = (
                        <>
                            As you walk into the bathroom, the tapping ceases.
                            Looking around, it's a fairly standard layout. On
                            the left wall, a large, ornate {_mirror} looms over
                            the cluttered counter top, directly above the{' '}
                            {_sink}.
                            <br />
                            <br />
                            Against the other wall are a toilet, shower, and an
                            overflowing {_trash} bin. You have the strange
                            feeling that you're being watched.
                        </>
                    );
                }

                return onEnterText;
            },
            exits: [
                {
                    id: Z00.ROOMS.HALLWAY,
                    direction: 'west',
                    displayText: (e, c, t, game) => {
                        let text = `To the $DIR$ is your hallway.`;
                        if (
                            game.player.hasCondition(
                                PLAYER_CONDITIONS.ARACHNOPHOBIA,
                            )
                        ) {
                            text +=
                                ' You can still hear the spider swarm chittering behind the door.';
                        } else if (
                            game.zone.hasCondition(Z00.CONDITIONS.EMPTY_MIRROR)
                        ) {
                            text += ' Something is holding the door shut.';
                        }
                        return text;
                    },
                    blocked: (e, c, t, game) => {
                        let blocked: ReactNode | boolean = false;

                        if (
                            game.player.hasCondition(
                                PLAYER_CONDITIONS.ARACHNOPHOBIA,
                            )
                        ) {
                            // Flavor text about spiders
                            blocked =
                                "You don't wish to return to the spidery nightmare outside.";
                        } else if (
                            game.zone.hasCondition(Z00.CONDITIONS.EMPTY_MIRROR)
                        ) {
                            blocked =
                                'An unseen force is holding the door shut.';
                        }

                        return blocked;
                    },
                },
            ],
            features: [
                { type: Zenith.Sink, definition: { roomText: null } },
                { type: MagicMirror, definition: { roomText: null } },
                {
                    definition: {
                        name: 'trash',
                        roomText: null,
                        interactionText:
                            "The trash bin is overflowing, and there's a shampoo bottle on the " +
                            'floor next to it.',
                    },
                },
            ],
        },
        {
            id: Z00.ROOMS.LIVING_ROOM,
            onEnter: (room, game) => (
                <>
                    You're standing in your living room. Last night's dinner
                    sits on the coffee{' '}
                    {Zenith.wrapInputTag('table', () =>
                        game.console.setInputValue('look at table'),
                    )}
                    , unfinished, along with your wallet, car keys, and phone.
                    There's another{' '}
                    {Zenith.wrapInputTag('bookshelf', () =>
                        game.console.setInputValue('look at bookshelf'),
                    )}{' '}
                    against the wall by the front door. You haven't read a book
                    in a while, and feel a momentary wave of guilt.
                    <br />
                    <br />
                    The tapping sound continues in the distance.
                </>
            ),
            exits: [
                {
                    id: Z00.ROOMS.KITCHEN,
                    direction: 'east',
                    displayText: 'To the $DIR$ is your kitchen.',
                },
                {
                    id: Z00.ROOMS.HALLWAY,
                    direction: 'south',
                    displayText: 'To the $DIR$ is the hallway.',
                },
            ],
            features: [
                {
                    definition: {
                        name: 'table',
                        roomText: null,
                        interactionText:
                            'The table is littered with plates and cups, remnants of the past ' +
                            "weeks' meals. In the cubby under the table, you find a handful of " +
                            'video game controllers, a phone charger, and some half-burned candles.',
                    },
                },
                {
                    type: Zenith.Bookshelf,
                    definition: {
                        roomText: null,
                        interactionText:
                            'In front of you is your trusty bookshelf. Amidst the stacks ' +
                            'of papers and carefully curated bric-a-brac, titles that ' +
                            'you once loved lay covered in dust, forgotten.' +
                            '\n\n' +
                            'Which book would you like to read?',
                        items: [],
                        books: [
                            Z00.BOOKS.slaughterhouseFive,
                            Z00.BOOKS.dandelionWine,
                            Z00.BOOKS.keyToHappiness,
                            Z00.BOOKS.poesTales,
                        ],
                    } as Zenith.BookshelfDefinition,
                },
            ],
        },
        {
            id: Z00.ROOMS.KITCHEN,
            onEnter: (room, game) => (
                <>
                    You look around your kitchen. The loud refrigerator that
                    came with the place buzzes in the corner. The{' '}
                    {Zenith.wrapInputTag('sink', () =>
                        game.console.setInputValue('look at sink'),
                    )}{' '}
                    is full of dishes and there are crumbs on the counter. It's
                    been a while since you cleaned up in here.
                    <br />
                    <br />
                    In the center of the room is a smallish dining table with
                    three chairs. There's a large bowl in the middle with a few
                    pieces of fruit and a stack of{' '}
                    {Zenith.wrapInputTag('coupons', () =>
                        game.console.setInputValue('look at coupons'),
                    )}
                    .
                    <br />
                    <br />
                    Above the hum of the{' '}
                    {Zenith.wrapInputTag('fridge', () =>
                        game.console.setInputValue('look at fridge'),
                    )}
                    , you can still make out the sound of tapping.
                </>
            ),
            exits: [
                {
                    id: Z00.ROOMS.LIVING_ROOM,
                    direction: 'west',
                    displayText: 'To the $DIR$ is your living room.',
                },
            ],
            features: [
                {
                    type: Zenith.Sink,
                    definition: {
                        roomText: null,
                        interactionText:
                            "You're standing in front of your sink. It looks like just about " +
                            'every dish you own is dirty.',
                    },
                },
                {
                    definition: {
                        name: 'fridge',
                        roomText: null,
                        interactionText:
                            'The fridge buzzes away loudly. The front is covered in takeout ' +
                            "menus, wedding invitations, and souvenir magnets. There's a stack " +
                            'of pots and pans on top, and a collection of paper bags tucked away ' +
                            'in the crack between the wall.',
                    },
                },
                {
                    definition: {
                        name: 'coupons',
                        roomText: null,
                        interactionText:
                            'You pick up the stack of coupons and sift through them. Fast food, ' +
                            'discount tires, special member perks. None if it very interesting.',
                        features: [
                            {
                                type: Zenith.Book,
                                definition: {
                                    name: 'paper',
                                    discoverText:
                                        'As you set the coupons down, a scrap of $NAME$ falls to the floor.',
                                    roomText:
                                        "There's a scrap of $NAME$ on the floor by the table.",
                                    text: `(_ _ ${Z00.KEYS.CLOSET_SAFE_PIN.charAt(2)} ${Z00.KEYS.CLOSET_SAFE_PIN.charAt(3)})`,
                                } as Zenith.BookDefinition,
                            },
                        ],
                    },
                },
            ],
        },
    ],
} as Zenith.ZoneDefinition;
