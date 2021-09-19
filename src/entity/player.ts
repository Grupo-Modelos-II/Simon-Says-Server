export class PlayerEntity {
    
    private id_user:number;
    private name: string;
    private pass: string;
    private max_score: number;

    public constructor({id_user,name,pass,max_score}:any){
        this.id_user = id_user;
        this.name = name;
        this.pass = pass;
        this.max_score = max_score;
    }

    public setIdUser(id_user:number):void{
        this.id_user = id_user;
    }

    public getIdUser():number{
        return this.id_user;
    }

    public setName(name:string):void{
        this.name = name;
    }

    public getName():string{
        return this.name;
    }

    public setPass(pass:string):void{
        this.pass = pass;
    }

    public getPass():string{
        return this.pass;
    }

    public setMaxScore(max_score:number):void{
        this.max_score = max_score;
    }

    public getMaxScore():number{
        return this.max_score;
    }
};



