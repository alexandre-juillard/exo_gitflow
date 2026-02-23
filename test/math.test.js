const math = require('../src/math');

describe('Math add function', () => {
    // ===== CAS NORMAUX =====
    it('should return the sum of two positive numbers', () => {
        expect(math.add(2, 3)).toBe(5);
    });

    it('should return the sum of two negative numbers', () => {
        expect(math.add(-2, -3)).toBe(-5);
    });

    it('should return the sum of a positive and negative number', () => {
        expect(math.add(5, -3)).toBe(2);
        expect(math.add(-5, 3)).toBe(-2);
    });

    it('should return the same number when adding zero', () => {
        expect(math.add(5, 0)).toBe(5);
        expect(math.add(0, 5)).toBe(5);
        expect(math.add(0, 0)).toBe(0);
    });

    it('should handle decimal numbers', () => {
        expect(math.add(0.1, 0.2)).toBeCloseTo(0.3);
        expect(math.add(1.5, 2.5)).toBe(4);
        expect(math.add(-1.5, 1.5)).toBe(0);
    });

    it('should handle very large numbers', () => {
        expect(math.add(1e10, 1e10)).toBe(2e10);
        expect(math.add(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle very small numbers', () => {
        expect(math.add(1e-10, 1e-10)).toBeCloseTo(2e-10);
    });

    it('should handle Infinity', () => {
        expect(math.add(Infinity, 1)).toBe(Infinity);
        expect(math.add(-Infinity, 1)).toBe(-Infinity);
        expect(math.add(Infinity, Infinity)).toBe(Infinity);
        expect(math.add(Infinity, -Infinity)).toBeNaN();
    });

    it('should return NaN when adding with NaN', () => {
        expect(math.add(NaN, 5)).toBeNaN();
        expect(math.add(5, NaN)).toBeNaN();
    });

    // ===== CAS D'ERREUR - Types invalides =====
    it('should throw an error if first argument is a string', () => {
        expect(() => math.add('2', 3)).toThrow('Both arguments must be numbers');
        expect(() => math.add('hello', 3)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if second argument is a string', () => {
        expect(() => math.add(2, '3')).toThrow('Both arguments must be numbers');
        expect(() => math.add(2, 'world')).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are undefined', () => {
        expect(() => math.add(undefined, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.add(2, undefined)).toThrow('Both arguments must be numbers');
        expect(() => math.add(undefined, undefined)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are null', () => {
        expect(() => math.add(null, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.add(2, null)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are booleans', () => {
        expect(() => math.add(true, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.add(2, false)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are objects', () => {
        expect(() => math.add({}, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.add(2, { value: 5 })).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are arrays', () => {
        expect(() => math.add([], 3)).toThrow('Both arguments must be numbers');
        expect(() => math.add(2, [1, 2])).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are functions', () => {
        expect(() => math.add(() => { }, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.add(2, () => { })).toThrow('Both arguments must be numbers');
    });
});

describe('Math subtract function', () => {
    // ===== CAS NORMAUX =====
    it('should return the difference of two positive numbers', () => {
        expect(math.subtract(5, 2)).toBe(3);
        expect(math.subtract(2, 5)).toBe(-3);
    });

    it('should return the difference of two negative numbers', () => {
        expect(math.subtract(-5, -2)).toBe(-3);
        expect(math.subtract(-2, -5)).toBe(3);
    });

    it('should return the difference of a positive and negative number', () => {
        expect(math.subtract(5, -3)).toBe(8);
        expect(math.subtract(-5, 3)).toBe(-8);
    });

    it('should return the same number when subtracting zero', () => {
        expect(math.subtract(5, 0)).toBe(5);
        expect(math.subtract(0, 5)).toBe(-5);
        expect(math.subtract(0, 0)).toBe(0);
    });

    it('should return zero when subtracting a number from itself', () => {
        expect(math.subtract(5, 5)).toBe(0);
        expect(math.subtract(-5, -5)).toBe(0);
    });

    it('should handle decimal numbers', () => {
        expect(math.subtract(0.3, 0.1)).toBeCloseTo(0.2);
        expect(math.subtract(2.5, 1.5)).toBe(1);
        expect(math.subtract(-1.5, -1.5)).toBe(0);
    });

    it('should handle very large numbers', () => {
        expect(math.subtract(1e10, 1e9)).toBe(9e9);
        expect(math.subtract(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER - 1);
    });

    it('should handle very small numbers', () => {
        expect(math.subtract(1e-10, 1e-11)).toBeCloseTo(9e-11);
    });

    it('should handle Infinity', () => {
        expect(math.subtract(Infinity, 1)).toBe(Infinity);
        expect(math.subtract(1, Infinity)).toBe(-Infinity);
        expect(math.subtract(Infinity, Infinity)).toBeNaN();
        expect(math.subtract(-Infinity, -Infinity)).toBeNaN();
    });

    it('should return NaN when subtracting with NaN', () => {
        expect(math.subtract(NaN, 5)).toBeNaN();
        expect(math.subtract(5, NaN)).toBeNaN();
    });

    // ===== CAS D'ERREUR - Types invalides =====
    it('should throw an error if first argument is a string', () => {
        expect(() => math.subtract('5', 2)).toThrow('Both arguments must be numbers');
        expect(() => math.subtract('hello', 2)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if second argument is a string', () => {
        expect(() => math.subtract(5, '2')).toThrow('Both arguments must be numbers');
        expect(() => math.subtract(5, 'world')).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are undefined', () => {
        expect(() => math.subtract(undefined, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.subtract(2, undefined)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are null', () => {
        expect(() => math.subtract(null, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.subtract(2, null)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are booleans', () => {
        expect(() => math.subtract(true, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.subtract(2, false)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are objects', () => {
        expect(() => math.subtract({}, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.subtract(2, { value: 5 })).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are arrays', () => {
        expect(() => math.subtract([], 3)).toThrow('Both arguments must be numbers');
        expect(() => math.subtract(2, [1, 2])).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are functions', () => {
        expect(() => math.subtract(() => { }, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.subtract(2, () => { })).toThrow('Both arguments must be numbers');
    });
});

describe('Math divide function', () => {
    // ===== CAS NORMAUX =====
    it('should return the quotient of two positive numbers', () => {
        expect(math.divide(10, 2)).toBe(5);
        expect(math.divide(9, 3)).toBe(3);
    });

    it('should return decimal when division is not exact', () => {
        expect(math.divide(10, 3)).toBeCloseTo(3.333333);
        expect(math.divide(7, 2)).toBe(3.5);
        expect(math.divide(1, 3)).toBeCloseTo(0.333333);
    });

    it('should return negative when dividing numbers with different signs', () => {
        expect(math.divide(-10, 2)).toBe(-5);
        expect(math.divide(10, -2)).toBe(-5);
    });

    it('should return positive when dividing two negative numbers', () => {
        expect(math.divide(-10, -2)).toBe(5);
    });

    it('should return zero when dividing zero', () => {
        expect(math.divide(0, 5)).toBe(0);
        expect(math.divide(0, -5)).toBe(-0);
    });

    it('should return the number when dividing by 1', () => {
        expect(math.divide(5, 1)).toBe(5);
        expect(math.divide(-5, 1)).toBe(-5);
    });

    it('should return negative when dividing by -1', () => {
        expect(math.divide(5, -1)).toBe(-5);
        expect(math.divide(-5, -1)).toBe(5);
    });

    it('should handle decimal numbers', () => {
        expect(math.divide(0.6, 0.2)).toBeCloseTo(3);
        expect(math.divide(1.5, 0.5)).toBe(3);
        expect(math.divide(2.5, 2.5)).toBe(1);
    });

    it('should handle very large numbers', () => {
        expect(math.divide(1e10, 1e5)).toBe(1e5);
        expect(math.divide(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should handle very small numbers', () => {
        expect(math.divide(1e-10, 1e-5)).toBeCloseTo(1e-5);
        expect(math.divide(1e-5, 1e-10)).toBeCloseTo(1e5);
    });

    it('should handle Infinity', () => {
        expect(math.divide(Infinity, 2)).toBe(Infinity);
        expect(math.divide(-Infinity, 2)).toBe(-Infinity);
        expect(math.divide(5, Infinity)).toBe(0);
        expect(math.divide(Infinity, Infinity)).toBeNaN();
    });

    it('should return NaN when dividing with NaN', () => {
        expect(math.divide(NaN, 5)).toBeNaN();
        expect(math.divide(5, NaN)).toBeNaN();
    });

    // ===== CAS D'ERREUR - Division par zéro =====
    it('should throw an error when dividing by zero', () => {
        expect(() => math.divide(10, 0)).toThrow('Cannot divide by zero');
        expect(() => math.divide(-10, 0)).toThrow('Cannot divide by zero');
        expect(() => math.divide(0, 0)).toThrow('Cannot divide by zero');
    });

    it('should throw an error when dividing by negative zero', () => {
        expect(() => math.divide(10, -0)).toThrow('Cannot divide by zero');
    });

    // ===== CAS D'ERREUR - Types invalides =====
    it('should throw an error if first argument is a string', () => {
        expect(() => math.divide('10', 2)).toThrow('Both arguments must be numbers');
        expect(() => math.divide('hello', 2)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if second argument is a string', () => {
        expect(() => math.divide(10, '2')).toThrow('Both arguments must be numbers');
        expect(() => math.divide(10, 'world')).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are undefined', () => {
        expect(() => math.divide(undefined, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.divide(10, undefined)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are null', () => {
        expect(() => math.divide(null, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.divide(10, null)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are booleans', () => {
        expect(() => math.divide(true, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.divide(10, false)).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are objects', () => {
        expect(() => math.divide({}, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.divide(10, { value: 5 })).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are arrays', () => {
        expect(() => math.divide([], 3)).toThrow('Both arguments must be numbers');
        expect(() => math.divide(10, [1, 2])).toThrow('Both arguments must be numbers');
    });

    it('should throw an error if arguments are functions', () => {
        expect(() => math.divide(() => { }, 3)).toThrow('Both arguments must be numbers');
        expect(() => math.divide(10, () => { })).toThrow('Both arguments must be numbers');
    });
});
