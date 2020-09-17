var data;

function compactRoles(roles) {
    let buffer = []
	for (let role of roles) {
		buffer.push(`${role.server} ${role.title.split("-")[0]}`);
	}
	return buffer;
}

function populateStaffList(data) {
    for (let member of data["staff"]) {
        document.getElementById("stafftable").innerHTML +=
        `<tr>
        <td>${member.ign}</td>
        <td>${member.uuid}</td>
        <td>${member.discord}</td>
        <td>${compactRoles(member.roles).join(", ")}</td>
        <td><button>Edit</button><button>Remove</button></td>
        </tr>
        `
    }
}

function populateServerList(data) {
    for (let member in data["servers"]) {
        document.getElementById("servertable").innerHTML +=
        `<tr>
        <td>${member}</td>
        <td>${servers[member].name}</td>
        <td>${servers[member].shortname}</td>
        <td>${servers[member].ip}</td>
        <td>${servers[member].discord}</td>
        <td>${servers[member].website}</td>
        </tr>
        `
    }
}

function renderServers() {
    document.getElementById("main").innerHTML = 
    `<div>
    <p style="text-align:center" class="not-small">SERVERS</p>
    <table>
        <tbody id="servertable">
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Shortname</th>
            <th>MC</th>
            <th>Discord</th>
            <th>Website</th>
        </tr>
    </tbody>
    </table>
</div>`;
populateServerList(data);
}

function renderStaff() {
    document.getElementById("main").innerHTML = 
    `
		<div style="flex-grow:1">
            <p style="text-align:center;" class="not-small">STAFF</p>
            <table>
                <tbody id="stafftable">
                <tr>
                    <th>Username</th>
                    <th>UUID</th>
                    <th>Discord</th>
                    <th>Roles</th>
                </tr>
            </tbody>
            </table>
        </div>
        `;
    populateStaffList(data);
}

async function initStaff() {
    data = await getApiData();
    data["servers"] = servers;
    renderStaff();
}