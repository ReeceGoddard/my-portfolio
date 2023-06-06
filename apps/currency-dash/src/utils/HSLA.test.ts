import { HSLA } from './HSLA';

describe('HSLA tests', () => {
    it('should return default hue correctly', () => {
        const color = new HSLA();
        expect(color.hue).toBe(0);
    });

    it('should return default color string as black', () => {
        const color = new HSLA();
        expect(color.getHSLAString()).toBe('hsla(0, 0%, 0%, 1)');
    });

    it('should set color provided', () => {
        const color = new HSLA({ hue: 10, saturation: 20, lightness: 30 });
        expect(color.getHSLAString()).toBe('hsla(10, 20%, 30%, 1)');
    });

    it('should set color provided with alpha', () => {
        const color = new HSLA({ hue: 10, saturation: 20, lightness: 30, alpha: 0.5 });
        expect(color.getHSLAString()).toBe('hsla(10, 20%, 30%, 0.5)');
    });

    it('should clamp out of range number for hue', () => {
        const color = new HSLA({ hue: 1000, saturation: 20, lightness: 30, alpha: 0.5 });
        expect(color.hue).toBe(360);

        const color2 = new HSLA({ hue: -1000, saturation: 20, lightness: 30, alpha: 0.5 });
        expect(color2.hue).toBe(0);
    });

    it('should clamp out of range number for saturation', () => {
        const color = new HSLA({ hue: 10, saturation: 2000, lightness: 30, alpha: 0.5 });
        expect(color.saturation).toBe(100);

        const color2 = new HSLA({ hue: 10, saturation: -2000, lightness: 30, alpha: 0.5 });
        expect(color2.saturation).toBe(0);
    });

    it('should clamp out of range number for lightness', () => {
        const color = new HSLA({ hue: 10, saturation: 20, lightness: 3000, alpha: 0.5 });
        expect(color.lightness).toBe(100);

        const color2 = new HSLA({ hue: 10, saturation: 20, lightness: -3000, alpha: 0.5 });
        expect(color2.lightness).toBe(0);
    });
});
