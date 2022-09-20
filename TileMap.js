class TileMap {
    constructor(layout, size) {
        this.layout = layout.default;
        this.size = size;

        this.selectedX = null;
        this.selectedY = null;

        this.tileCoordinate = { x: null, y: null }

        addEventListener('mousemove', e => {
            this.tileCoordinate.x = e.x;
            this.tileCoordinate.y = e.y;

            this.selectedX = Math.ceil(this.tileCoordinate.x / this.size);
            this.selectedY = Math.ceil(this.tileCoordinate.y / this.size);
        })
    }

    #parseTile(code) {
        switch(code) {
            case 'g':
                return { color: 'green', canGo: true }; // grass
            case 'w':
                return { color: 'grey', canGo: false }; // wall
            case 's':
                return { color: 'khaki', canGo: true }; // sand (currently road)
            case 'p':
                return { color: 'sienna', canGo: true }; // path
            case 'b':
                return { color: 'black', canGo: false }; // building
            case 'a':
                return { color: 'deepskyblue', canGo: false }; // water
            default:
                return { color: 'green', canGo: true };
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.layout.map.length; i++) {
            for (let j = 0; j < this.layout.map[i].length; j++) {
                // todo: replace it with tiles once they're ready
                const tileDetails = this.#parseTile(this.layout.map[i][j]);

                if (this.selectedX === j + 1 && this.selectedY === i + 1) {
                    ctx.fillStyle = tileDetails.canGo ? 'grey' : 'salmon';
                } else {
                    ctx.fillStyle = tileDetails.color;
                }

                const x = j * this.size;
                const y = i * this.size;
                ctx.fillRect(x, y, this.size, this.size);

                // todo: remove it as it is just for debugging to see the tiles
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, this.size, this.size);
            }
        }
    }
}