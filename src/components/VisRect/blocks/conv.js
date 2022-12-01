import { Shape } from '@antv/x6'

const { Rect } = Shape

export const Conv = new Rect({
    width: 'Conv'.length*10,
    height: 40,
    attrs: {
        rect: { fill: '#E1D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Conv', fill: 'white' },
        data: {
            "Text": 'Conv'
        }
    },
    
})
export const ConvTranspose = new Rect({
    width: 'ConvTranspose'.length*10,
    height: 40,
    attrs: {
        rect: { fill: '#3120C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'ConvTranspose', fill: 'white' },
        data: {
            "Text": 'ConvTranspose'
        }
    },
    
})




