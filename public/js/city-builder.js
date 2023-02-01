const loadAllModels = async function(_this) {
  const _house = await _this.load.gltf('house')
  const _tree = await _this.load.gltf('tree')

  return {
    house:_house.scenes[0],
    tree:_tree.scenes[0]
  }
}

async function modelInit(_this, nameModel, block, id) {

  var models = await loadAllModels(_this)
  var position = block['pos_' + nameModel]

  const house = new ExtendedObject3D() //Crear un nuevo objeto 3D de Enable
  house.name = nameModel + '_' + id //Darle nombre

  house.add(models[nameModel].clone()) 
    house.position.set(position.x, position.y, position.z) 
    _this.add.existing(house)

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
        _child = child
      }
    }
  })

  return house.children[0].children[0].body

}


var blocks = {
  casaCampoResidencial_1: {
    pos_house: {x:0,y:0, z:0,},
    pos_tree: {x:8, y:0, z:5,},
    models: ['house','tree'],

  },
  casaCampoResidencial_2:{},
  casaCampoResidencial_3:{},
}

function proceduralGeneration(){

}

function randomNumber() {

  return Math.floor(Math.random() * 100) + 1
  
}


async function createCity(map, _this) {

    var _size = 0
    var i = 0

    builder.h(_this, _size, i)


/*
    for (const itemRow of map) {
        for (const itemCol of itemRow) {

            _size += await builder[itemCol](_this, _size, i)
            i++
        }
    }
    */
    
}

var builder = {
    h: async function(_this, _size, id) {
        
        var primal
        var list = []

        for (let i = 0; i < blocks.casaCampoResidencial_1.models.length; i++) {
          const model = blocks.casaCampoResidencial_1.models[i];
          const block = blocks.casaCampoResidencial_1;
          

          var objetoEnable = modelInit(_this, model, block, id)

          if (i < 1) {
            primal = objetoEnable
          }else{
            list.push(objetoEnable)
          }
          
        }

        /*for (const item in list) {
          _this.physics.add.constraints.lock(primal, item)
        }
        */

    }
}



/*
  MEDIR UN OBJETO 3D con THREEE
  //Medir Casa
  let bbox = new THREE.Box3().setFromObject(models[nameModel]);
  let helper = new THREE.Box3Helper(bbox, new THREE.Color(0, 255, 0));
  let size = bbox.getSize(new THREE.Vector3()); // HERE you get the size
  house.add(helper);








  
  const tree = new ExtendedObject3D() 
  tree.name = 'tree' + id

  tree.add(models.tree.clone()) 
    tree.position.set(8, 0, 5) 
    _this.add.existing(tree)

    tree.traverse(child => {
    if(child.isMesh){
      child.castShadow = child.receiveShadow = false
      child.material.metalness = 0
      child.material.roughness = 1

      if(/SM/i.test(child.name)){
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


  //_this.physics.add.constraints.lock(house.children[0].children[0].body, tree.children[0].children[0].body)


  */