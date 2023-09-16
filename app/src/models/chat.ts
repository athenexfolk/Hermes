export interface Chat {
    type: ChatType
    members: string[];
    color: string;
    image: string;
}

export enum ChatType {
    PRIVATE = "private",
    GROUP = "group",
}
