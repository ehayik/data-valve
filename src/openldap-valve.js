import fs from 'fs';
import template from './templates/users.ldif.hbs'
import Chance from 'chance';

const CHANCE = new Chance();
const NAME_SEPARATOR = ' ';
const NAME = 0;
const MIDDLE_NAME = 1;
const LAST_NAME = 2;

export default class OpenLdapValve {

    constructor(directory, size) {
        this.directory = directory;
        this.size = size;
    }

    open() {
        let data = this.generateData();
        fs.writeFileSync(`${this.directory}/users.ldif`, template({users: data, chance: CHANCE}));
    }

    generateData() {
        let data = [];

        for (let i = 0; i < this.size; i++) {
            let fullname = CHANCE.name({middle: true});
            let arr = fullname.split(NAME_SEPARATOR);
            data.push({
                id: CHANCE.natural({min: 1000000, max: 9999999}),
                fullname: fullname,
                name: arr[NAME],
                lastname: `${arr[MIDDLE_NAME]} ${arr[LAST_NAME]}`,
                username: `${arr[NAME].toLocaleLowerCase()}.${arr[MIDDLE_NAME].toLocaleLowerCase()}`,
                email: CHANCE.email({domain: 'example.com'}),
                phoneNumber: CHANCE.phone(),
                homeDirectory: `/home/${arr[NAME].toLocaleLowerCase()}`
            });
        }

        return data;
    }
}