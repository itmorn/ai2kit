import { Shape } from '@antv/x6'

const { Rect, Circle } = Shape

export const Conv = new Rect({
    width: 70,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Conv', fill: 'white' },
    },
})
export const ConvTranspose = new Rect({
    width: 130,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'ConvTranspose', fill: 'white' },
    },
})




export const r = new Rect({
    width: 70,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'rect', fill: 'white' },
    },
})

export const c = new Circle({
    width: 60,
    height: 60,
    attrs: {
        circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
        text: { text: 'ellipse', fill: 'white' },
    },
})

export const c2 = new Circle({
    width: 60,
    height: 60,
    attrs: {
        circle: { fill: '#4B4A67', 'stroke-width': 6, stroke: '#FE854F' },
        text: { text: 'ellipse', fill: 'white' },
    },
})

export const r2 = new Rect({
    width: 70,
    height: 40,
    attrs: {
        rect: { fill: '#4B4A67', stroke: '#31D0C6', strokeWidth: 6 },
        text: { text: 'rect', fill: 'white' },
    },
})

export const r3 = new Rect({
    width: 70,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'rect', fill: 'white' },
    },
})

export const c3 = new Circle({
    width: 60,
    height: 60,
    attrs: {
        circle: { fill: '#FE854F', strokeWidth: 6, stroke: '#4B4A67' },
        text: { text: 'ellipse', fill: 'white' },
    },
})

