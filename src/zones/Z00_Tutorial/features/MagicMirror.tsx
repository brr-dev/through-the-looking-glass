// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import Z00 from '../Z00.const';
import { PLAYER_CONDITIONS } from '../../../ThroughTheLookingGlass.disc';
import { Zenith } from '@zenith-game/core';

/**
 * Special mirror Feature for the tutorial Zone.
 */
export default class MagicMirror extends Zenith.Feature {
    constructor({
        name = 'mirror',
        interactionText = (feature, gameController) => {
            if (
                !gameController.zone.hasCondition(
                    Z00.CONDITIONS.EMPTY_MIRROR,
                ) &&
                !gameController.zone.hasCondition(Z00.CONDITIONS.FEAR_OF_MIRROR)
            ) {
                return [
                    <>
                        As you approach the large, ornate mirror, you're struck
                        by the intricate details of its gilded frame. Its
                        surface gleams with a dull shine, reflecting the
                        contents of the bathroom back at you.
                        <br />
                        <br />
                        You gaze into your reflection, and it stares back at
                        you, its eyes burning with an unfamiliar fury. In the
                        depths of the mirror's glass, you catch a hint of
                        movement, almost imperceptible. Your reflection just
                        blinked at you.
                        <br />
                        <br />
                        You tear your gaze away from the mirror, a sense of
                        dread tingling at the edges of your consciousness.
                    </>,
                ];
            } else if (
                !gameController.zone.hasCondition(Z00.CONDITIONS.EMPTY_MIRROR)
            ) {
                return [
                    <>
                        As you cautiously approach the large mirror once more,
                        its gilded frame seems to shimmer with an unsettling
                        energy. Your eyes scan past the edges and fall on your
                        reflection in the dull glass.
                        <br />
                        <br />
                        Its eyes meet yours, a mischievous smirk replacing the
                        fury from before. The reflection is you, but twisted
                        somehow. The eyes are too dark, the smile too wide, the
                        head cocked at an unnatural angle. You watch with bated
                        breath, waiting to catch another unnatural movement from
                        your reflection. Slowly, she raises one hand, beckoning
                        you to join her in the silvery depths of the glass.
                    </>,
                    <>
                        You wait in horror, your body trembling in anticipation
                        of what's going to happen next. Suddenly, the reflection
                        lets out a bloodcurdling shriek, and you are jolted to
                        the floor as it flees into the darkness beyond the edge
                        of the mirror.
                        <br />
                        <br />
                        You get up slowly, and force your gaze back to the
                        mirror. You no longer have a reflection.
                    </>,
                    ...(!gameController.player.hasCondition(
                        PLAYER_CONDITIONS.ARACHNOPHOBIA,
                    )
                        ? [
                              <>
                                  In a panic, you turn to run, but the bathroom
                                  door slams shut. You try in vain to open it,
                                  but to no avail. You are trapped in the
                                  bathroom with the mirror that is most
                                  certainly not a mirror.
                              </>,
                          ]
                        : []),
                ];
            } else {
                return [
                    <>
                        Everything in your bathroom can be seen reflected in the
                        terrifying glass except for you. Where could your
                        reflection have gone? You attempt to reassure yourself
                        that the events of the last few minutes were not
                        possible, and could not have occurred.
                        <br />
                        <br />
                        "This can't be happening. It's not real." Slowly raising
                        your hand, you approach the mirror, determined to
                        believe that the events of the past few minutes were a
                        paranoid delusion. You'd had hallucinations before, but
                        they had never felt like this. This was new.
                        <br />
                        <br />
                        By the time your fingers touched the glass, you had just
                        about convinced yourself.
                    </>,
                    <>Until you began to fall.</>,
                    <>
                        Engulfed in a darkness thicker than any you've
                        experienced, you thrash about in the bitingly cold air,
                        desperately searching for any light, anything to tell
                        you where you are or what's happening. You see nothing.
                    </>,
                    <>
                        As you fall deeper and deeper, seemingly forever, you
                        try to assure yourself that this is just a dream. A
                        psychotic break. Anything other than reality. What a
                        comfort it would be to know that it was merely your
                        perception that had changed, and that reality remained
                        safely intact outside of your illness-stricken mind. As
                        the last trace of hope vanishes from your thoughts, and
                        your final shred of hope slips away, you begin to hear
                        music.
                        <br />
                        <br />
                        Below you? Above you? No way to know. Direction, space,
                        time... none of these familiar truths seemed to have any
                        meaning as you plummet still, descending to unknown
                        depths. Clutching your legs up to your chest, you drift
                        off to sleep as you fall endlessly into oblivion.
                    </>,
                ];
            }
        },
        ...params
    }: Zenith.FeatureDefinition) {
        super({ name, interactionText, ...params });
    }

    async _interaction(gameController: Zenith.GameController): Promise<void> {
        await super._interaction(gameController);

        if (gameController.zone.hasCondition(Z00.CONDITIONS.EMPTY_MIRROR)) {
            // TODO add code to move to next Zone and remove this infinite loop
            while (true) {
                await gameController.console.pause('To be continued...');
            }
        } else if (
            gameController.zone.hasCondition(Z00.CONDITIONS.FEAR_OF_MIRROR)
        ) {
            gameController.zone.setCondition(Z00.CONDITIONS.EMPTY_MIRROR, true);
        } else {
            gameController.zone.setCondition(
                Z00.CONDITIONS.FEAR_OF_MIRROR,
                true,
            );
        }
    }
}
