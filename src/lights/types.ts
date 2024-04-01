export enum SCRIPT_ARG_TYPES {
    "string",
    "rgb",
}

export enum SCRIPT_RUN_RETURN_TYPES {
    "ERR_NO_SCRIPT",
    "SUCCESS"
}

export interface ScriptInfo {
    file: string;
    name: string;
    arguments?: { name: string, type?: SCRIPT_ARG_TYPES };
    active: boolean;
}