const RatingMatrix = require('./ratingMatrix')
const permute = require('./permute')


let ratingMatrix;
const width = 100
const height = 100

describe("RatingMatrix", () => {
    beforeEach(() => {
        ratingMatrix = new RatingMatrix(width, height, 10)
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
        expect(cords.n).toBe(2)
        expect(cords.m).toBe(1)
    });


    test('should get cords for pos', () => {
        let x = ratingMatrix.getMatrixAtPos({x:15,y:15},[{x:15,y:15}])
        // console.log(x)
    })

    test('should get getHighestRewardAtPos', () => {
        let x = ratingMatrix.getHighestRewardAtPos({x:15,y:15},[{x:15,y:15}])
        console.log(x)
    })

})