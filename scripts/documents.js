const documents = [
    { "id": 1, "name": "Documento 1", "url": "https://example.com/doc1" },
    { "id": 2, "name": "Documento 2", "url": "https://example.com/doc2" },
    { "id": 3, "name": "Documento 3", "url": "https://example.com/doc3" },
]

function loadCSV() {
    fetch('/data.csv')
        .then(response => response.text())
        .then(text => {
            const lines = text.trim().split('\n');
            const headers = lines[0].split(',');
            const result = lines.slice(1).map(line => {
                const values = line.split(',');
                return headers.reduce((obj, header, i) => {
                    obj[header.trim()] = values[i].trim();
                    return obj;
                }, {});
            });
            console.log(result);
            return result;
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
        });
}

function populateTable(data) {
    const table = document.getElementById('data-table');
    data.forEach(item => {
        const row = document.createElement('tr');
        const cellId = document.createElement('th');
        const cellName = document.createElement('td');
        const cellUrl = document.createElement('td');

        cellId.scope = 'row';
        cellId.textContent = item.id;
        
        cellName.textContent = item.name;
        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = 'View Document';
        link.target = '_blank';
        cellUrl.appendChild(link);
        
        row.appendChild(cellId);
        row.appendChild(cellName);
        row.appendChild(cellUrl);
        table.appendChild(row);
    });
}


function searchTable(text) {
    const table = document.getElementById('data-table');
    const rows = table.getElementsByTagName('tr');
    const searchText = text.toLowerCase();

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchText)) {
                found = true;
                break;
            }
        }

        row.style.display = found ? '' : 'none';
    }
}

form = document.getElementById('search-form');
textInput = document.getElementById('search-text');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    searchTable(textInput.value);
});

populateTable(documents);