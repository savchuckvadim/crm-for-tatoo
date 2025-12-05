import type { ReactNode } from 'react';

export interface GalaxyProps {
    focal?: [number, number];
    rotation?: [number, number];
    starSpeed?: number;
    density?: number;
    hueShift?: number;
    disableAnimation?: boolean;
    speed?: number;
    mouseInteraction?: boolean;
    glowIntensity?: number;
    saturation?: number;
    mouseRepulsion?: boolean;
    repulsionStrength?: number;
    twinkleIntensity?: number;
    rotationSpeed?: number;
    autoCenterRepulsion?: number;
    transparent?: boolean;
    className?: string;
    children?: ReactNode;
}

export function Galaxy(props: GalaxyProps): JSX.Element;

