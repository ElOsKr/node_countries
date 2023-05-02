"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const newDocument = fs.createWriteStream('countries.csv');
const data = fs.readFileSync('./countries.txt', 'utf-8');
const dataRow = data.split('\n');
dataRow.shift();
dataRow.pop();
const countries = dataRow.map((countrie) => {
    const countrieObj = {
        name: "",
        population: 0,
        area: 0,
        density: 0
    };
    const separateString = countrie.split(' ');
    let stringAux = "";
    let numbersAux = [];
    for (let j = 0; j < separateString.length; j++) {
        if (!separateString[j].match(/\d/)) {
            stringAux += " " + separateString[j];
        }
        else {
            const numbers = separateString[j].replaceAll(',', '');
            numbersAux.push(parseFloat(numbers));
        }
    }
    let density;
    let area = numbersAux[1];
    let population = Number(numbersAux[0]);
    if (!area) {
        area = "No area";
        density = population;
    }
    else {
        density = population / Number(area);
    }
    countrieObj.name = stringAux;
    countrieObj.population = population;
    countrieObj.area = area;
    countrieObj.density = density;
    return countrieObj;
});
countries.sort((a, b) => b.density - a.density);
countries.forEach((countrie) => {
    const line = [];
    line.push(countrie.name);
    line.push(countrie.population);
    line.push(countrie.area);
    line.push(countrie.density);
    newDocument.write(line + '\n');
});
console.log(countries);
newDocument.end();
