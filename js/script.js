
const size = document.getElementById('size');
const preview = document.getElementById('preview');
const stage = document.getElementById('stage');
const Case = document.getElementById('case');
let pll;


function updateImage() {
    let clearCase = cleanString(Case.value);
    preview.src = `https://cube.rider.biz/visualcube.php?fmt=svg&size=${size.value}&stage=${stage.value}&view=plan&case=${clearCase}`;
}

document.getElementById('update').addEventListener('click', updateImage);

updateImage();

function cleanString(input) {
    return input
        .replace(/[ ,()]/g, '') // 删除空格、逗号、括号
        .replace(/'/g, '%27');  // 将 ' 替换为 %27
}

document.getElementById('case').addEventListener('input', updateImage);

fetch('./data/pll.json')
    .then(response => response.json())
    .then(data => {
        pll = data[0];
        console.log(pll);

        let table = document.createElement('table');
        table.style.border = '1px solid';
        let tr = document.createElement('tr');
        let cnt = 0;

        for (const alg in pll) {
            if (cnt % 4 == 0) {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }
            console.log(alg, ':', pll[alg]);
            let td = document.createElement('td');
            td.style.border = '1px solid';
            td.innerHTML = `<img src="https://cube.rider.biz/visualcube.php?fmt=svg&bg=t&size=100&stage=${stage.value}&view=plan&case=${pll[alg]}" >
            <div id = 'algName'>${alg}<div>`;
            let algblock = document.createElement('div');
            algblock.textContent = pll[alg];
            td.appendChild(algblock);
            tr.appendChild(td);
            cnt += 1;
        }
        table.appendChild(tr);
        document.getElementById('tableContainer').appendChild(table);

    })
    .catch(error => console.error(error));


let oll;
fetch('./data/oll.json')
    .then(response => response.json())
    .then(data => {
        oll = data[0];
        console.log(oll);

        let table = document.createElement('table');
        let tr = document.createElement('tr');
        let cnt = 0;

        for (const alg in oll) {
            if (cnt % 7 == 0) {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }
            console.log(alg, ':', oll[alg]);
            let td = document.createElement('td');
            td.innerHTML = `<img src="https://cube.rider.biz/visualcube.php?fmt=svg&stage=oll&bg=t&size=80&view=plan&case=${oll[alg]}" >
            `; //<div id = 'algName'>${alg}<div>
            let algblock = document.createElement('div');
            algblock.textContent = oll[alg];
            algblock.style.textAlign = 'center';
            //td.appendChild(algblock);
            tr.appendChild(td);
            cnt += 1;
        }
        table.appendChild(tr);
        document.getElementById('tableContainer-oll').appendChild(table);

    })
    .catch(error => console.error(error));


