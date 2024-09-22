// ! Copyright (c) 2024, Brandon Ramirez, brr.dev

import zoneMap from './zones';
import { Zenith } from '@zenith-game/core';

const ThroughTheLookingGlassDisc: Zenith.GameDiscDefinition = {
    gameTitle: 'Through the Looking Glass',
    gameDescription: 'A console-based interactive fiction adventure.',
    zoneMap: zoneMap,
    welcomeMessage: [
        <div className="container center-align box">
            <span className="alt">Through the Looking Glass</span>
            <span className="small">Story by: Brandon Ramirez</span>
        </div>,
        <br />,
        <br />,
        Zenith.GameControls,
        <br />,
    ],
};

export const PLAYER_CONDITIONS = {
    AGORAPHOBIA: 'TtLG_Agoraphobia',
    // TODO make sure this always gets applied at the start of Zone 1
    ARACHNOPHOBIA: 'TtLG_Arachnophobia',
};

export default ThroughTheLookingGlassDisc;
