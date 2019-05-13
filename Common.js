import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
	viewHor: {
		backgroundColor: '#fff',
		flexDirection: 'row',
	},
	viewVer: {
		backgroundColor: '#fff',
		flexDirection: 'column',
	},
	viewHorPad: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		padding: 10,
	},
	viewVerPad: {
		backgroundColor: '#fff',
		padding: 10,
	},
});

export function getChampKey(champId, champData) {
	for (var champKey in champData) {
		if (champData[champKey].key == champId) {
			return champKey;
		}
	}
	
	return -1;
}

export function getChampName(champId, champData) {
	return champData[getChampKey(champId, champData)].name;
}

export function getQueueType(queueId) {
	switch(queueId) {
		case 0:
			return 'Custom Game';
		case 2:
			return '5v5 Blind Pick';
		case 4:
			return '5v5 Ranked Solo';
		case 6:
			return '5v5 Ranked Premade';
		case 7:
			return 'Co-op vs AI';
		case 8:
			return '3v3 Normal Game';
		case 9:
			return '3v3 Ranked Flex';
		case 14:
			return '5v5 Draft Pick';
		case 16:
			return '5v5 Dominion Blind Pick'
		case 17:
			return '5v5 Dominion Draft Pick';
		case 25:
			return 'Dominion Co-op vs AI';
		case 31:
			return 'Co-op vs AI Intro Bot';
		case 32:
			return 'Co-op vs AI Beginner Bot';
		case 33:
			return 'Co-op vs AI Intermediate Bot';
		case 41:
			return '3v3 Ranked Team';
		case 42:
			return '5v5 Ranked Team';
		case 52:
			return 'Co-op vs AI';
		case 61:
			return '5v5 Team Builder';
		case 65:
			return '5v5 ARAM';
		case 70:
			return 'One for All';
		case 72:
			return '1v1 Snowdown Showdown';
		case 73:
			return '2v2 Snowdown Showdown';
		case 75:
			return '6v6 Hexakill';
		case 76: 
			return 'Ultra Rapid Fire';
		case 78:
			return 'One For All: Mirror Mode';
		case 83:
			return 'Co-op vs AI Ultra Rapid Fire';
		case 91:
			return 'Doom Bots Rank 1';
		case 92:
			return 'Doom Bots Rank 2';
		case 93:
			return 'Doom Bots Rank 5';
		case 96:
			return 'Ascension';
		case 98:
			return '6v6 Hexakill';
		case 100:
			return '5v5 ARAM';
		case 300:
			return 'Legend of the Poro King';
		case 310:
			return 'Nemesis';
		case 313:
			return 'Black Market Brawlers';
		case 315:
			return 'Nexus Siege';
		case 317:
			return 'Definitely Not Dominion';
		case 318:
			return 'ARURF';
		case 325:
			return 'All Random';
		case 400:
			return '5v5 Draft Pick';
		case 410:
			return '5v5 Ranked Dynamic';
		case 420:
			return '5v5 Ranked Solo';
		case 430:
			return '5v5 Blind Pick';
		case 440:
			return '5v5 Ranked Flex';
		case 450:
			return '5v5 ARAM';
		case 460:
			return '3v3 Blind Pick';
		case 470:
			return '3v3 Ranked Flex';
		case 600:
			return 'Blood Hunt Assassin';
		case 610:
			return 'Dark Star: Singularity';
		case 700:
			return 'Clash';
		case 800:
			return 'Co-op vs. AI Intermediate Bot';
		case 810:
			return 'Co-op vs. AI Intro Bot';
		case 820:
			return 'Co-op vs. AI Beginner Bot';
		case 830:
			return 'Co-op vs. AI Intro Bot';
		case 840:
			return 'Co-op vs. AI Beginner Bot';
		case 850:
			return 'Co-op vs. AI Intermediate Bot';
		case 900:
			return 'ARURF';
		case 910:
			return 'Ascension';
		case 920:
			return 'Legend of the Poro King';
		case 940:
			return 'Nexus Siege';
		case 950:
			return 'Doom Bots Voting';
		case 960:
			return 'Doom Bots Standard';
		case 980:
			return 'Star Guardian Invasion: Normal';
		case 990:
			return 'Star Guardian Invasion: Onslaught';
		case 1000:
			return 'PROJECT: Hunters';
		case 1010:
			return 'Snow ARURF';
		case 1020:
			return 'One for All';
		case 1030:
			return 'Odyssey Extraction: Intro';
		case 1040:
			return 'Odyssey Extraction: Cadet';
		case 1050:
			return 'Odyssey Extraction: Crewmember';
		case 1060:
			return 'Odyssey Extraction: Captain';
		case 1070:
			return 'Odyssey Extraction: Onslaught';
		case 1200:
			return 'Nexus Blitz';
		default:
			return '';
	}
}

export function getMap(queueId) {
	if ((queueId >=2 && queueId <= 7) || queueId == 14 || (queueId >= 31 && queueId <= 33) ||
	   queueId == 42 || queueId == 61 || queueId == 70 || queueId == 75 || queueId == 76 ||
	   queueId == 83 || (queueId >= 91 && queueId <= 93) || (queueId >= 310 && queueId <= 315) ||
	   (queueId >= 318 && queueId <= 440) || queueId == 600 || queueId == 700 ||
	   (queueId >= 830 && queueId <= 900) || (queueId >= 940 && queueId <= 960) ||
	   queueId == 1010 || queueId == 1020) {
		return "Summoner's Rift";
	}
	else if (queueId == 8 || queueId == 9 || queueId == 41 || queueId == 52 || queueId == 98 ||
			queueId == 460 || queueId == 470 || (queueId >= 800 && queueId <= 820)) {
		return 'Twisted Treeline';
	}
	else if ((queueId >= 16 && queueId <= 25) || queueId == 96 || queueId == 317 || queueId == 900) {
		return 'Crystal Scar';
	}
	else if (queueId == 65 || queueId == 72 || queueId == 73 || queueId == 78 || queueId == 300 ||
 			queueId == 450 || queueId == 920) {
		return 'Howling Abyss';
	}
	else if (queueId == 100) {
		return "Butcher's Bridge";
	}
	else if (queueId == 610) {
		return 'Cosmic Ruins';
	}
	else if (queueId == 980 || queueId == 990) {
		return 'Valoran City Park';
	}
	else if (queueId == 1000) {
		return 'Overcharge';
	}
	else if (queueId >= 1030 && queueId <= 1070) {
		return 'Crash Site';
	}
	else if (queueId == 1200) {
		return 'Nexus Blitz';
	}
	else {
		return '';
	}
}

	
export function findRune(id, runeData) {
	for(var i = 0; i < runeData.length; i++) {
		if (id == runeData[i].id) {
			return runeData[i];
		}
		for (var j = 0; j < runeData[i].slots.length; j++) {
			for (var k = 0; k < runeData[i].slots[j].runes.length; k++) {
				if (id == runeData[i].slots[j].runes[k].id) {
					return runeData[i].slots[j].runes[k];
				}
			}
		}
	}

	return null;
}

export function findSummonerSpells(id) {
	switch (id) {
		case 1:
			return {name: "Cleanse", icon: "SummonerBoost.png"};
		case 3:
			return {name: "Exhaust", icon: "SummonerExhaust.png"};
		case 4:
			return {name: "Flash", icon: "SummonerFlash.png"};
		case 6:
			return {name: "Ghost", icon: "SummonerHaste.png"};
		case 7:
			return {name: "Heal", icon: "SummonerHeal.png"};
		case 11:
			return {name: "Smite", icon: "SummonerSmite.png"};
		case 12:
			return {name: "Teleport", icon: "SummonerTeleport.png"};
		case 13:
			return {name: "Clarity", icon: "SummonerMana.png"};
		case 14:
			return {name: "Ignite", icon: "SummonerDot.png"};
		case 21:
			return {name: "Barrier", icon: "SummonerBarrier.png"};
		case 32:
			return {name: "Mark", icon: "SummonerSnowbal.png"};
	}
}