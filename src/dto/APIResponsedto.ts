export class APIResponse{

    private state:boolean;
    private data:any;

    constructor(){
        this.state = false;
        this.data = {};
    }

    public setData(data:any):void{
        this.data = data;
    }

    public setState(state:boolean):void{
        this.state = state;
    }

    public getData():any{
        return this.data;
    }

    public getState():boolean{
        return this.state;
    }

    public setSuccesQuery(data:any):void{
        this.setState(true);
        this.setData(data);
    }

    public setFailQuery(error:any):void{
        this.setState(false);
        this.setData(error);
    }

}