import { Shape } from '@antv/x6'

const { Rect } = Shape

export const Conv1d = new Rect({
    width: 'Conv1d'.length*10,
    height: 40,
    attrs: {
        rect: { fill: '#29af07', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Conv1d', fill: 'white' },
        data: {
            "Text": 'Conv1d',
            "in_channels":3, 
            "out_channels":32, "kernel_size":(3,3), "stride":1, 
            "padding":0, "dilation":1, "groups":1, "bias":true, "padding_mode":'zeros', "device":null, "dtype":null
        }
    },
    ports: {
        groups: {
            group1: {
                position: 'ellipseSpread',
                attrs: {
                    circle: {
                        r: 10,
                        magnet: true,
                        stroke: '#31d0c6',
                        fill: '#fff',
                        strokeWidth: 2,
                    },
                },
            },
        },
        items: [],
    },
    
})
export const ConvTranspose = new Rect({
    width: 'ConvTranspose'.length*10,
    height: 40,
    attrs: {
        rect: { fill: '#138660', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'ConvTranspose', fill: 'white' },
        data: {
            "Text": 'ConvTranspose'
        }
    },
    
})




