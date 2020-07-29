const RatingMatrix = require('./ratingMatrix')

let ratingMatrix;

describe("RatingMatrix", () => {
    beforeEach(() => {
        ratingMatrix = new RatingMatrix(100, 100, 10)
    });

    test('should be defined', () => {
        expect(ratingMatrix).toBeDefined();
    });

    test('should have a expected resolution', () => {
        expect(ratingMatrix.matrix.length).toBe(ratingMatrix.resolution);
        expect(ratingMatrix.matrix[0].length).toBe(ratingMatrix.resolution);
    });

    test('return action values for a position', () => {
        let pos = { x: 5, y: 5 };
        let cords = ratingMatrix.getCordsForPos(pos)
        expect(cords.n).toBe(0)
        expect(cords.m).toBe(0)

        pos = { x: 15, y: 12 };
        cords = ratingMatrix.getCordsForPos(pos)
        expect(cords.n).toBe(1)
        expect(cords.m).toBe(1)
    });

    test('return turn best action for given position', () => {
        ratingMatrix.matrix[1][2] = 1
        let bestAction = ratingMatrix.getBestActionForCords(1, 1)
        expect(bestAction).toBe('down')
        ratingMatrix.matrix[1][2] = 0

        ratingMatrix.matrix[1][0] = 1
        bestAction = ratingMatrix.getBestActionForCords(1, 1)
        expect(bestAction).toBe('up')
    })

    test('return random action if two are equally valued', () => {
        ratingMatrix.matrix[1][2] = 1
        ratingMatrix.matrix[1][0] = 1

        bestAction = ratingMatrix.getBestActionForCords(1, 1)
        expect(['up', 'down']).toEqual(expect.arrayContaining([bestAction]));
    })
})