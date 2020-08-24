const servers = [
	{
		"name": "Endercraft",
		"image": "https://cdn.discordapp.com/icons/740665741098877019/7fcceeaa49753a4d078aba6f257065dd.png?size=64",
		"ip": "play.endercraft.co",
		"website": "https://endercraft.co",
		"discord": "https://discord.gg/endercraft"
	},
	{
		"name": "ElectrodeMC",
		"image": "https://cdn.discordapp.com/icons/705907385247727626/a_9b08c1410cabc9e30467b3ad574112ec.png?size=64",
		"ip": "play.electrodemc.net",
		"website": "Not available yet",
		"discord": "https://discord.elecrodemc.net"
	},
	{
		"name": "Skycraft Community",
		"image": "https://cdn.discordapp.com/icons/706902644781875270/a44a1f42d4593fc1f4c64d363f8be9c5.png?size=64",
		"ip": "play.skycraftcommunity.net",
		"website": "https://skycraftcommunity.net",
		"discord": "https://discord.gg/KVDTwFM"
	},
	{
		"name": "Mystic Realm",
		"image": "https://cdn.discordapp.com/icons/726081912392646736/89bd44627bef06a8aa9b145a4767dd41.png?size=64",
		"ip": "play.mysticrealm.xyz",
		"website": "https://mysticrealm.xyz",
		"discord": "https://mysticrealm.xyz/discord"
	},
	{
		"name": "Loading...",
		"image": "https://cdn.discordapp.com/icons/740450739398377553/527ecc206990c6250152360d6f63f6e4.png?size=64",
		"ip": "Not available yet",
		"website": "Not available yet",
		"discord": "https://discord.gg/s6wNbu"
	}
]

const staffUrl = "staff.json";

function parseServer(server) {
	return `<div>
				<span class="not-small center">${server.name}</span> 
				<img src="${server.image}">
				<table>
					<tr>
						<th>IP:</th>
						<td>${server.ip}</td>
					</tr>
					<tr>
						<th>Website:</th>
						<td><a href="${server.website}">${server.website}</a></td>
					</tr>
					<tr>
						<th>Discord: </th>
						<td><a href="${server.discord}">${server.discord}</a></td>
					</tr>
				</table>
			</div>`;
}

function parseRoles(roles) {
	let buffer = "";
	for (let role of roles) {
		buffer += `<span>${role}</span><br />` 
	}
	return buffer.trimRight("<br />");
}

function parseUser(user) {
	return `<div>
	<span class="not-small">${user.ign}</span><img src="https://cravatar.eu/avatar/${user.ign}/64"> <br/>
	<span>${user.discord}</span><br />
	` + parseRoles(user["roles"]) + "</div>";
}

async function getStaff() {
	let json = await (await fetch(staffUrl)).json();
	for (let staff of json["staff"]) {
		document.getElementById("staff").innerHTML += parseUser(staff);
	}
}

for (let server of servers) {
	document.getElementById("servers").innerHTML += parseServer(server);
}
getStaff();
