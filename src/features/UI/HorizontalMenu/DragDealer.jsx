export class DragDealer {
    constructor() {
        this.clicked = false;
        this.dragging = false;
        this.position = 0;

        // Bind this context to the methods if they're going to be used as callbacks
        this.dragStart = this.dragStart.bind(this);
        this.dragStop = this.dragStop.bind(this);
        this.dragMove = this.dragMove.bind(this);
    }

    dragStart(ev) {
        this.position = ev.clientX;
        this.clicked = true;
    }

    dragStop() {
        window.requestAnimationFrame(() => {
            this.dragging = false;
            this.clicked = false;
        });
    }

    dragMove(ev, cb) {
        const newDiff = this.position - ev.clientX;
        const movedEnough = Math.abs(newDiff) > 5;

        if (this.clicked && movedEnough) {
            this.dragging = true;
        }

        if (this.dragging && movedEnough) {
            this.position = ev.clientX;
            cb(newDiff);
        }
    }
}
