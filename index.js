// Copyright © Lucy Poulton 2020. All rights reserved.

const servers = {
	"END": {
		"name": "Endercraft",
		"shortname": "Endercraft",
		"image": "https://cdn.discordapp.com/icons/740665741098877019/7fcceeaa49753a4d078aba6f257065dd.png?size=64",
		"ip": "play.endercraft.co",
		"website": "https://endercraft.co",
		"discord": "https://discord.gg/endercraft"
	},
	"EMC": {
		"name": "ElectrodeMC",
		"shortname": "ElectrodeMC",
		"image": "https://cdn.discordapp.com/icons/705907385247727626/a_9b08c1410cabc9e30467b3ad574112ec.png?size=64",
		"ip": "play.electrodemc.net",
		"website": "Not available yet",
		"discord": "https://discord.elecrodemc.net"
	},
	"SKY": {
		"name": "Skycraft Community",
		"shortname": "Skycraft",
		"image": "https://cdn.discordapp.com/icons/706902644781875270/a44a1f42d4593fc1f4c64d363f8be9c5.png?size=64",
		"ip": "play.skycraftcommunity.net",
		"website": "https://skycraftcommunity.net",
		"discord": "https://discord.skycraftcommunity.net"
	},
	"MYR": {
		"name": "Mystic Realm",
		"shortname": "Mystic Realm",
		"image": "https://cdn.discordapp.com/icons/726081912392646736/89bd44627bef06a8aa9b145a4767dd41.png?size=64",
		"ip": "play.mysticrealm.xyz",
		"website": "https://mysticrealm.xyz",
		"discord": "https://mysticrealm.xyz/discord"
	},
	"LMC": {
		"name": "Loading...",
		"shortname": "Loading",
		"image": "https://cdn.discordapp.com/icons/740450739398377553/f50d22e7058d447c4ed3eaa3548ca7eb.png?size=64",
		"ip": "Not available yet",
		"website": "Not available yet",
		"discord": "https://discord.gg/s6wNbu"
	},
	"APK": {
		"name": "Angel's Peak",
		"shortname": "Angel's Peak",
		"image": "https://cdn.discordapp.com/icons/599367207155138580/66a53ac1b1277f80e49ddffc5ed8b370.png?size=64",
		"ip": "Not available yet",
		"website": "Not available yet",
		"discord": "https://discord.gg/sMsKZV"
	},
	"GRP": {
		"name": "TeemL",
		"shortname": "Group"
	}
}

const staffLevels = {
	"BUILDER": 1,
	"HELPER": 2,
	"MODERATOR": 3,
	"ADMIN": 4,
	"DEVELOPER": 5,
	"MANAGER": 6,
	"GROUP": 7	
}

const staffUrl = "https://api.teeml.net";

var stafflist = {};

function parseServer(server) {
	if (server.name == "TeemL") return "";
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

function parseServerBox(server) {
	if (server == "GRP") return "";
	return `<div id="serverstaff-${server}">
			<p class="not-small" style="text-align:center">${servers[server].name}</p>
		</div>
		`
}

function parseRoles(roles) {
	let buffer = "";
	for (let role of roles) {
		buffer += `<span>${servers[role.server].shortname} ${role.title.split("-")[0]}</span><br />` 
	}
	return buffer.trimRight("<br />");
}

function parseGroupStaff(user) {
	return `<div>
	<span class="not-small">${user.ign}</span><img src="https://cravatar.eu/avatar/${user.uuid}/64"> <br/>` +
	(user.discord == "" ? "" : `<span>${user.discord}</span><br />`) +
	parseRoles(user["roles"]) + "</div>";
}

function parseStaff(user, title) {
	return `<p><img src="https://cravatar.eu/avatar/${user.uuid}/16">${user.ign}<span style="float:right">${title}</span></p>`;
}
async function getStaff() {
	let data = await fetch(staffUrl);
	var jsonData = await data.json();
	console.log(jsonData);
	for (let staff of jsonData["staff"]) {
		let isGroupStaff = false;
		for (let role of staff["roles"]) {
			if (staffLevels[role.level] == staffLevels["GROUP"]) 
				isGroupStaff = true;
			else {
				splitRole = role.title.split("-");
				stafflist[role.server][parseStaff(staff, splitRole[0])] = splitRole[1] ?? 0;
			}
		}
		if (isGroupStaff) document.getElementById("staff").innerHTML += parseGroupStaff(staff);
		
	}
	for (let server in servers) {
		// start by sorting the dict into an array
		let splitList = [];
		for (var key in stafflist[server]) {
  			splitList.push([ key, stafflist[server][key] ])
		}
		splitList.sort( (x1, x2) => x2[1] - x1[1]);
		for (let member of splitList) 
			document.getElementById(`serverstaff-${server}`).innerHTML += member[0];
	}
}

for (let server in servers) {
	stafflist[server] = { };
	document.getElementById("serverstaff").innerHTML += parseServerBox(server);
	document.getElementById("servers").innerHTML += parseServer(servers[server]);
}
getStaff();
