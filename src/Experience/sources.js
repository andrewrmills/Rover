

export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/px.jpg',
            'textures/environmentMap/nx.jpg',
            'textures/environmentMap/py.jpg',
            'textures/environmentMap/ny.jpg',
            'textures/environmentMap/pz.jpg',
            'textures/environmentMap/nz.jpg',
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.png'
    },
    {  
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.png'
    },
    {  
        name: 'moonColorTexture',
        type: 'texture',
        path: 'textures/moon/moon_color.jpg'
    },
    {  
        name: 'moonNormalTexture',
        type: 'texture',
        path: 'textures/moon/moon_normal.jpg'
    },
    {  
        name: 'moonDispTexture',
        type: 'texture',
        path: 'textures/moon/moon_disp.png'
    },
    {  
        name: 'moonOccTexture',
        type: 'texture',
        path: 'textures/moon/moon_occ.jpg'
    },
    {  
        name: 'moonSpecTexture',
        type: 'texture',
        path: 'textures/moon/moon_spec.jpg'
    },
    {
        name: 'landerModel',
        type: 'gltfModel',
        path: 'models/Sev/sev.glb'
    },
    {
        name: 'moonModel',
        type: 'gltfModel',
        path: 'models/Moon/moon.glb'
    }
]