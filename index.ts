import * as fs from 'fs';

interface Country {
    name: string,
    population: number,
    area: number,
    density: number
}

const newDocument = fs.createWriteStream('countries.csv')

const data: string = fs.readFileSync('./countries.txt','utf-8');

const dataRow: string[] = data.split('\n');

dataRow.shift();

dataRow.pop();

const countries: Country[] = dataRow.map((countrie) => {

    const countrieObj: Country = {
        name: "",
        population: 0,
        area: 0,
        density: 0
    };

    const separateString: string[] = countrie.split(' ');
    let stringAux: string = "";
    let numbersAux: number[] = [];

    for(let j = 0 ; j <separateString.length ; j++){
        if(!separateString[j].match(/\d/)){
            stringAux+=" "+separateString[j]
        }else{
            const numbers = separateString[j].replaceAll(',','')
            numbersAux.push(parseFloat(numbers))
        }
    }

    let density: number;
    let area: number = numbersAux[1];
    let population: number = numbersAux[0];

    density = population / (area)
    
    countrieObj.name = stringAux;

    if(numbersAux.length===2){
        countrieObj.population = population
        countrieObj.area = area
        countrieObj.density = density
    }

    return countrieObj
})

countries.sort((a,b) => b.density-a.density)

countries.forEach((countrie) => {
    const line = []

    line.push(countrie.name)
    line.push(countrie.population)
    line.push(countrie.area)
    line.push(countrie.density)

    newDocument.write(line + '\n')

})

console.log(countries)

newDocument.end();