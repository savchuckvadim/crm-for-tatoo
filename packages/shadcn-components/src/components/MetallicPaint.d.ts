export interface MetallicPaintParams {
    patternScale?: number;
    refraction?: number;
    edge?: number;
    patternBlur?: number;
    liquid?: number;
    speed?: number;
}

export interface MetallicPaintProps {
    imageData: string;
    params?: MetallicPaintParams;
}

export default function MetallicPaint(props: MetallicPaintProps): JSX.Element;

