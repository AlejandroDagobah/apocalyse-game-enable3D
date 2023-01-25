

async function createCity(map, _this) {

    var _size = 0

    for (const itemRow of map) {
        for (const itemCol of itemRow) {

            _size += await builder[itemCol](_this, _size)

        }
    }
    
    
}

var builder = {
    h: async function(_this, _size) {
        
        //crear casa
        const object = await _this.load.gltf('house') //obtener el 3D precargado de la casa 
        const objScene = object.scenes[0] //Acceder a la escena del 3D

        const house = new ExtendedObject3D() //Crear un nuevo objeto 3D de Eneable
        house.name = 'house' //Darle nombre

        
        house.add(objScene) //Añadir el 3d importado de gltf a el objeto 3D
          house.position.set(0, 0, _size) //Definir la posición
          _this.add.existing(house) //Añadirlo a _this que se refiere al objeto MainScene


        
        house.traverse(child => {
          if(child.isMesh){
            child.castShadow = child.receiveShadow = false
            child.material.metalness = 0
            child.material.roughness = 1

            if(/House/i.test(child.name)){
              _this.physics.add.existing(child, {
                shape: 'concave',
                mass: 10,
                collisionFlags: 1,
                autoCenter: false
              })
              child.body.setAngularFactor(0,0,0) 
              child.body.setLinearFactor(0,0,0) 
            }
          }
        })

        //Medir Casa
        let bbox = new THREE.Box3().setFromObject(house);
        let helper = new THREE.Box3Helper(bbox, new THREE.Color(0, 255, 0));

        let size = bbox.getSize(new THREE.Vector3()); // HERE you get the size
        house.add(helper);

        console.log('hola')

        return size.z
    }
}

