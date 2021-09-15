create table Player(
    id_user varchar not null,
    name varchar not null,
    pass varchar not null,
    max_score bigint not null default 0
);

alter table Player add constraint pk_user primary key(id_user);