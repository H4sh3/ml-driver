const COLINEAR = "COLINEAR"
const PARALLEL = "PARALLEL"

class Line {
    constructor(x1, y1, x2, y2) {
        this.p1 = createVector(x1, y1)
        this.p2 = createVector(x2, y2)
    }

    checkIntersection(l2) {
        const x1 = this.p1.x
        const y1 = this.p1.y
        const x2 = this.p2.x
        const y2 = this.p2.y
        const x3 = l2.p1.x
        const y3 = l2.p1.y
        const x4 = l2.p2.x
        const y4 = l2.p2.y

        const denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
        const numeA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
        const numeB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

        if (denom == 0) {
            if (numeA == 0 && numeB == 0) {
                return COLINEAR;
            }
            return PARALLEL;
        }

        const uA = numeA / denom;
        const uB = numeB / denom;

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            return intersecting(
                createVector((x1 + (uA * (x2 - x1))), y1 + (uA * (y2 - y1)))
            )
        }

        return false;
    }

    draw() {
        stroke(0,0,0)
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y)
    }

    add(v) {
        this.p1.add(v)
        this.p2.add(v)
    }
}

function intersecting(point) {
    const result = intersectResult('intersecting');
    result.point = point;
    return result;
}

function intersectResult(type) {
    return {
        type
    };
}