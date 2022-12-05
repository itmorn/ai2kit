import { Shape } from '@antv/x6'

const { Rect } = Shape

export const Input1d = new Rect({
    width: 'Inputxd'.length * 10,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Input1d', fill: 'white' },
        data: {
            "Text": 'Input1d', "Channel": 3, "Length": 512
        },
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
export const Input2d = new Rect({
    width: 'Inputxd'.length * 10,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Input2d', fill: 'white' },
        data: {
            "Text": 'Input2d', "Channel": 3, "Height": 224, "Width": 224
        },
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
export const Input3d = new Rect({
    width: 'Inputxd'.length * 10,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Input3d', fill: 'white' },
        data: {
            "Text": 'Input3d', "Channel": 3, "Depth": 5, "Height": 224, "Width": 224
        },
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


