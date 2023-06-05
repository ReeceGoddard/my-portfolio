/**
 * Represents the HSLA (Hue, Saturation, Lightness, Alpha) color properties.
 */
export type HSLAProps = {
    /**
     * The hue value of the color (0-360).
     */
    hue: number;

    /**
     * The saturation value of the color (0-100).
     */
    saturation: number;

    /**
     * The lightness value of the color (0-100).
     */
    lightness: number;

    /**
     * The alpha (opacity) value of the color (0-1).
     */
    alpha?: number;
};

export type GetHSLAStringProps = {
    alpha: number;
};

/**
 * Represents an HSLA color.
 */
export class HSLA {
    private _hue: number;
    private _saturation: number;
    private _lightness: number;
    private _alpha: number;

    /**
     * Creates an instance of HSLA.
     * @param {HSLAProps} props - The HSLA color properties.
     */
    constructor({ hue, saturation, lightness, alpha = 1 }: HSLAProps = { hue: 0, saturation: 0, lightness: 0 }) {
        this._hue = this.clamp(hue, 0, 360);
        this._saturation = this.clamp(saturation, 0, 100);
        this._lightness = this.clamp(lightness, 0, 100);
        this._alpha = this.clamp(alpha, 0, 1);
    }

    /**
     * Returns the HSLA color string representation.
     * @returns The HSLA color string.
     */
    public getHSLAString({ alpha }: GetHSLAStringProps = { alpha: this.alpha }): string {
        return `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${alpha})`;
    }

    public toString(): string {
        return this.getHSLAString();
    }

    /**
     * Retrieves the HSL (Hue, Saturation, Lightness) values of the color.
     * Returns an object with the HSL values, excluding the alpha value.
     * @returns {Omit<HSLAProps, 'alpha'>} The HSL values of the color.
     */
    public getHSL(): Omit<HSLAProps, 'alpha'> {
        return { hue: this.hue, saturation: this.saturation, lightness: this.lightness };
    }

    /**
     * Clamps a value between a minimum and maximum range.
     * @param value - The value to clamp.
     * @param min - The minimum value of the range.
     * @param max - The maximum value of the range.
     * @returns The clamped value.
     */
    private clamp(value: number, min: number, max: number): number {
        const clampedNum = Math.max(min, Math.min(max, value));
        if (clampedNum !== value) {
            console.warn(`HSLA Error: Number out of bounds. Provide a number between ${min} and ${max}.`);
        }
        return clampedNum;
    }

    get hue(): number {
        return this._hue;
    }

    set hue(value: number) {
        this._hue = this.clamp(value, 0, 360);
    }

    get saturation(): number {
        return this._saturation;
    }

    set saturation(value: number) {
        this._saturation = this.clamp(value, 0, 100);
    }

    get lightness(): number {
        return this._lightness;
    }

    set lightness(value: number) {
        this._lightness = this.clamp(value, 0, 100);
    }

    get alpha(): number {
        return this._alpha;
    }

    set alpha(value: number) {
        this._alpha = this.clamp(value, 0, 1);
    }
}
