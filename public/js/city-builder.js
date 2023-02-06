const loadAllModels = async function(_this) {
  const _house = await _this.load.gltf('house')
  const _burnedHouse = await _this.load.gltf('burned-house')
  const _tree = await _this.load.gltf('tree')

  return {
    house:_house.scenes[0],
    tree:_tree.scenes[0]
  }
}

async function modelInit(models3D, _this, nameModel, block, id, size) {

  var position = block['pos_' + nameModel]

  const object = new ExtendedObject3D() //Crear un nuevo objeto 3D de Enable
  object.name = nameModel + '_' + id //Darle nombre
  

  object.add(models3D[nameModel].clone()) 
  object.position.set(size.x + position.x, size.y + position.y, size.z + position.z) 
    _this.add.existing(object)


    object.traverse(child => {
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

  return object

}


var blocks = {
  home_1: {
    pos_house: {x:0,y:0, z:0,},
    pos_tree: {x:8, y:0, z:5,},
    models: ['house','tree'],

  },
  home_2: {
    pos_house: {x:0,y:0, z:0,},
    pos_tree: {x:8, y:0, z:2,},
    models: ['house','tree'],

  },
  home_3:{},
}

function proceduralGeneration(){

}

function randomNumber() {

  return Math.floor(Math.random() * 100) + 1
  
}


async function createCity(map, _this) {

    var _size = {x:0, y:0, z:0}
    var i = 0
    var models = await loadAllModels(_this)

    for (const itemRow of map) {
        for (const itemCol of itemRow) {
            builder.creator(models, itemCol, _this, _size, i)


            _size.x += 20

            i++

        }

       _size.z += 20
       _size.x = 0

    }

    
}

var builder = {
    creator: function(models3D, item, _this, _size, id){
        

        //Bucle para recorrer los modelos que componen un bloque
        for (let i = 0; i < blocks[item].models.length; i++) {

          const model = blocks[item].models[i];
          const block = blocks[item];
          modelInit(models3D,_this, model, block, id, _size)
          
        }

        /*

          var primal
          var list = []

          if (i < 1) {
            primal = objetoEnable
          }else{
            list.push(objetoEnable)
          }
        
          for (const item in list) {
            _this.physics.add.constraints.lock(primal, item)
          }


        */

    }
}