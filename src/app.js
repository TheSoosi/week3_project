
export class App {
    static async loadData() {
        const response = await fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff");
        const jsonData = await response.json();
        const area = jsonData.dataset.dimension.Alue.category.label;
        const list = [];
        const regNames = Object.values(area);
        const popNumbers = jsonData.dataset.value; 
        
        for (let i = 0; i < regNames.length; i++) {
            let population = 0;
            if (i < popNumbers.length) {
                population = popNumbers[i];
            }
            list.push({
                regionName:regNames[i], 
                population:population,
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
            table.appendChild(tr);
        });
    } 

    static async run() {
        const dataList = await this.loadData();
        console.log(dataList);
        this.fillTable(dataList);
    }
}
