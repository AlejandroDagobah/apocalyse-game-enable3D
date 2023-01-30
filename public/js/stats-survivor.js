class stats_survival {

    constructor(id,opt)
    {
        this.hunger_level = 10
        this.id = id
        this.opt = opt
    
    }

    stats_run(){


        for (const stat_name in this.opt) 
        {
            var stat = this.opt[stat_name]
           
            this.create_ui(this.id)
            
            setInterval(() => 
            {
                stat.functions._default(stat)
               
                if(stat.functions[stat.level] != undefined)
                {
                    stat.functions[stat.level]()
                }

                this.update_ui(this.id,stat.level)
            },stat.oscillation)


        }
/*
        this.create_ui(this.id)


        setInterval(() => 
        {
              this.hunger_level-=1      
             
                
              if(this.opt[this.hunger_level] != undefined)
              {
            
                this.opt[this.hunger_level]()
              }
             

            
        }, 1000);*/
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



