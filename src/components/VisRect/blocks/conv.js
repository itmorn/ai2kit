import { Shape } from '@antv/x6'

const { Rect } = Shape

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




