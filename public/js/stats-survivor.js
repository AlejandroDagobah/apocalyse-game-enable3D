class stats_survival {
    constructor(id,opt)
    {
        this.hunger_level = 10
        this.id = id
        this.opt = opt
    }
    hunger(){

        this.create_ui(this.id)

        setInterval(() => 
        {
              this.hunger_level-=1      
              this.update_ui(this.id,this.hunger_level)
                
              if(this.opt[this.hunger_level] != undefined)
              {
            
                this.opt[this.hunger_level]()
              }
             

            
        }, 1000);
    } 
    create_ui(id){
        
        var div_stat = document.createElement('div');
        div_stat.className = 'stats-count';
        div_stat.id = id;
        document.body.appendChild(div_stat);
    }
    update_ui(id,value){
        var div_stat =   document.getElementById(id)
        div_stat.innerText = value
    }
}



