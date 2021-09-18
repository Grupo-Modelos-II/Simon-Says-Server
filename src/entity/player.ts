export class PlayerEntity {
    
    private id_user:number;
    private name: string;
    private pass: string;
    private max_score: number;
    private token_session:string;

    public constructor({id_user,name,pass,max_score,token_session}:any){
        this.id_user = id_user;
        this.name = name;
        this.pass = pass;
        this.max_score = max_score;
        this.token_session = token_session;
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

    public setTokenSession(token_session:string):void{
        this.token_session = token_session;
    }

    public getTokenSession():string{
        return this.token_session;
    }
};



