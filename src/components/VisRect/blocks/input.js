import { Shape } from '@antv/x6'

const { Rect} = Shape

export const Input1d = new Rect({
    width: 70,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Input1d', fill: 'white' },
    },
    data:{
        "Channel":3,"Length":512,"Text":'Input1d'
    }
})
export const Input2d = new Rect({
    width: 70,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Input2d', fill: 'white' },
    },
    data:{
        "Channel":3,"Height":224,"Width":224,"Text":'Input2d'
    }
})
export const Input3d = new Rect({
    width: 70,
    height: 40,
    attrs: {
        rect: { fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6 },
        text: { text: 'Input3d', fill: 'white' },
    },
    data:{
        "Channel":3,"Dimension":5,"Height":224,"Width":224,"Text":'Input3d'
    }
})


