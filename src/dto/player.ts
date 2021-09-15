export interface PlayerRequest {
    name: string;
    password: string;
    max_score: number;
};

export interface PlayerResponse extends PlayerRequest {
    id: number;
};