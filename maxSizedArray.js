class MaxSizedArray {
    constructor(n, prop) {
        this.n = n
        this.prop = prop
        this.elements = []
    }

    add(e) {
        this.elements.push(e)

        // element with smallest prop at lowest index
        this.elements.sort((a, b) => (a[this.prop] > b[this.prop]) ? 1 : ((b[this.prop] > a[this.prop]) ? -1 : 0));

        this.elements = this.elements.slice(0, this.n)
    }
}