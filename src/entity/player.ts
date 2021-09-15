export class PlayerEntity {
    
    id_user:number;
    name: string;
    pass: string;
    max_score: number;

    public constructor({id_user,name,pass,max_score}:any){
        this.id_user = id_user;
        this.name = name;
        this.pass = pass;
        this.max_score = max_score;
    }
};



