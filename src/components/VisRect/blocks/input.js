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
        "channel":3,"length":224,"text":'Input1d'
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
        "channel":3,"height":224,"width":224,"text":'Input2d'
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
        "channel":3,"dimension":5,"height":224,"width":224,"text":'Input3d'
    }
})


