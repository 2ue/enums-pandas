class Color {
    static red = new Color('red');
    static orange = new Color('orange');
    static yellow = new Color('yellow');
    static green = new Color('green');
    static blue = new Color('blue');
    static purple = new Color('purple');

    constructor(name) {
        this.name = name;
    }
    toString() {
        return `Color.${this.name}`;
    }
}


