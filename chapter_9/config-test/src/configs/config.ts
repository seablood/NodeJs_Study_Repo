import common from "./common";
import local from "./local";
import dev from "./dev";
import prod from "./prod";
import { readFileSync } from "fs";
import * as yaml from "js-yaml"

const env = process.env.NODE_ENV;

let load = {};

if(env === 'local'){
    load = local;
} else if(env === 'dev') {
    load = dev;
} else if(env === 'prod') {
    load = prod;
}

const yamlConfig: Record<string, any> = yaml.load(
    readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'), 
);

export default () => ({
    ...common, 
    ...load, 
    ...yamlConfig, 
});