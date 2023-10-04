export default [
    {
        name: 'environmentMapTextures',
        type: 'cubeTexture',
        path: [
            '/textures/environmentMap/px.jpg',
            '/textures/environmentMap/nx.jpg',
            '/textures/environmentMap/py.jpg',
            '/textures/environmentMap/ny.jpg',
            '/textures/environmentMap/pz.jpg',
            '/textures/environmentMap/nz.jpg' 
        ]
    },
    {
        name:'dirtColorTexture',
        type: 'colorTexture',
        path: [
            'textures/dirt/color.jpg',
        ],
    },
    {
        name:'dirtNormalTexture',
        type: 'normalTexture',
        path: [
            'textures/dirt/normal.jpg',
        ],
    },
    {
        name:'foxModel',
        type: 'gltfModel',
        path: [
        
            'models/Fox/glTF/Fox.gltf',
            'models/Fox/glTF/Fox.bin'   
        ]
    
}
]
 