
export class App {
    static async loadData() {
        const responsePopulation = await fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff");
        const responseEmployment = await fetch("https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065");
        const jsonPopulation = await responsePopulation.json();
        const jsonEmployment = await responseEmployment.json();
        const area = jsonPopulation.dataset.dimension.Alue.category.label;
        const list = [];
        const regNames = Object.values(area);
        const popNumbers = jsonPopulation.dataset.value; 
        const empNumbers = jsonEmployment.dataset.value; 

        for (let i = 0; i < regNames.length; i++) {
            let population = 0;
            let employment = 0;

            if (i < popNumbers.length) {
                population = popNumbers[i];
            }

            if (i < empNumbers.length) {
                employment = empNumbers[i];
            }

            list.push({
                regionName: regNames[i], 
                population: population,
                employment: employment,
                employmentPercent: population != 0 ? Math.round(employment/population*100*100)/100 : 0 
            });
              
        }

        return list;
    }

    static createCell(content) {
        const cell = document.createElement("td");
        cell.innerText = content;
        return cell;
    }

    static fillTable(dataList) {
        const table = document.getElementById("statistic-table");
        dataList.forEach(element => {
            const tr = document.createElement("tr");
            tr.appendChild(this.createCell(element.regionName));
            tr.appendChild(this.createCell(element.population));
            tr.appendChild(this.createCell(element.employment));
            tr.appendChild(this.createCell(element.employmentPercent));
            if (element.employmentPercent > 45) {
                tr.className = "high-emp-percent";
            } else if (element.employmentPercent < 25) {
                tr.className = "low-emp-percent";
            }
            table.appendChild(tr);
            
        });
    } 

    static async run() {
        const dataList = await this.loadData();
        console.log(dataList);
        this.fillTable(dataList);
    }
}
