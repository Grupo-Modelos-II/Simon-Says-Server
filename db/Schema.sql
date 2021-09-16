DROP Player IF EXISTS;

create table Player(
    id_user varchar not null,
    name varchar not null,
    pass varchar not null,
    max_score bigint not null default 0
);

alter table Player add constraint pk_user primary key(id_user);

DROP Game IF EXISTS;

create table Game(
    id_game varchar not null,
    score bigint not null
);

alter table Game add constraint pk_game primary key(id_game);

DROP History IF EXISTS;

create table History(
    id_user varchar not null,
    id_game varchar not null,
    hour_player date not null
);

alter table History add constraint pk_History primary key (id_user, id_game);
alter table History add constraint fk_History_Player foreign key (id_user) references Player (id_user);
alter table History add constraint fk_History_Game foreign key (id_game) references Game (id_game);