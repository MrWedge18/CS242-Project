import React from 'react';
import { Button, FlatList, Image, ScrollView, Text, View } from 'react-native';
import { getChampName, getChampKey, findRune, styles, findSummonerSpells } from './Common.js';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory-native';

export class MatchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.navigation.state.params;
		this.state.itemData = null;
		this.state.redData = [];
		this.state.blueData = [];
		this.state.graphTitle = "Damage Dealt"
		this.damageDealt(false);
		this.getItems();
	}
	
	getItems() {
		console.log("Getting Items");
		const axios = require('axios');
		var url = this.state.ddragonPrefix + this.state.patch + '/data/en_US/item.json';
		console.log(url)
		var self = this;
		
		axios.get(url)
			.then(function(response) {
				self.state.itemData = response.data.data;
				console.log(self.state.itemData[1001].name);
				self.forceUpdate();
			})
			.catch(function(error) {
				console.log(error.headers);
			});
	}
	
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.summonerData.name}`,
	});

	damageDealt(update) {
		console.log("damageDealt()")
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		this.state.blueData = [
			{ x: getChampName(players[0].championId, champData), y: players[0].stats.totalDamageDealtToChampions },
			{ x: getChampName(players[1].championId, champData), y: players[1].stats.totalDamageDealtToChampions },
			{ x: getChampName(players[2].championId, champData), y: players[2].stats.totalDamageDealtToChampions },
			{ x: getChampName(players[3].championId, champData), y: players[3].stats.totalDamageDealtToChampions },
			{ x: getChampName(players[4].championId, champData), y: players[4].stats.totalDamageDealtToChampions },
		];
		
		this.state.redData = [
			{ x: getChampName(players[5].championId, champData), y: players[5].stats.totalDamageDealtToChampions },
			{ x: getChampName(players[6].championId, champData), y: players[6].stats.totalDamageDealtToChampions },
			{ x: getChampName(players[7].championId, champData), y: players[7].stats.totalDamageDealtToChampions },
			{ x: getChampName(players[8].championId, champData), y: players[8].stats.totalDamageDealtToChampions },
			{ x: getChampName(players[9].championId, champData), y: players[9].stats.totalDamageDealtToChampions },
		];
		
				
		if (update) {
			this.forceUpdate();
		}
	}

	magicDamageDealt() {
		console.log("magicDamageDealt()");
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		this.state.blueData = [
			{ x: getChampName(players[0].championId, champData), y: players[0].stats.magicDamageDealtToChampions },
			{ x: getChampName(players[1].championId, champData), y: players[1].stats.magicDamageDealtToChampions },
			{ x: getChampName(players[2].championId, champData), y: players[2].stats.magicDamageDealtToChampions },
			{ x: getChampName(players[3].championId, champData), y: players[3].stats.magicDamageDealtToChampions },
			{ x: getChampName(players[4].championId, champData), y: players[4].stats.magicDamageDealtToChampions },
		];
		
		this.state.redData = [
			{ x: getChampName(players[5].championId, champData), y: players[5].stats.magicDamageDealtToChampions },
			{ x: getChampName(players[6].championId, champData), y: players[6].stats.magicDamageDealtToChampions },
			{ x: getChampName(players[7].championId, champData), y: players[7].stats.magicDamageDealtToChampions },
			{ x: getChampName(players[8].championId, champData), y: players[8].stats.magicDamageDealtToChampions },
			{ x: getChampName(players[9].championId, champData), y: players[9].stats.magicDamageDealtToChampions },
		];

		this.forceUpdate();
	}

	physicalDamageDealt() {
		console.log("physicalDamageDealt()");
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		this.state.blueData = [
			{ x: getChampName(players[0].championId, champData), y: players[0].stats.physicalDamageDealtToChampions },
			{ x: getChampName(players[1].championId, champData), y: players[1].stats.physicalDamageDealtToChampions },
			{ x: getChampName(players[2].championId, champData), y: players[2].stats.physicalDamageDealtToChampions },
			{ x: getChampName(players[3].championId, champData), y: players[3].stats.physicalDamageDealtToChampions },
			{ x: getChampName(players[4].championId, champData), y: players[4].stats.physicalDamageDealtToChampions },
		];
		
		this.state.redData = [
			{ x: getChampName(players[5].championId, champData), y: players[5].stats.physicalDamageDealtToChampions },
			{ x: getChampName(players[6].championId, champData), y: players[6].stats.physicalDamageDealtToChampions },
			{ x: getChampName(players[7].championId, champData), y: players[7].stats.physicalDamageDealtToChampions },
			{ x: getChampName(players[8].championId, champData), y: players[8].stats.physicalDamageDealtToChampions },
			{ x: getChampName(players[9].championId, champData), y: players[9].stats.physicalDamageDealtToChampions },
		];

		this.forceUpdate();
	}

	trueDamageDealt() {
		console.log("trueDamageDealt()");
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		this.state.blueData = [
			{ x: getChampName(players[0].championId, champData), y: players[0].stats.trueDamageDealtToChampions },
			{ x: getChampName(players[1].championId, champData), y: players[1].stats.trueDamageDealtToChampions },
			{ x: getChampName(players[2].championId, champData), y: players[2].stats.trueDamageDealtToChampions },
			{ x: getChampName(players[3].championId, champData), y: players[3].stats.trueDamageDealtToChampions },
			{ x: getChampName(players[4].championId, champData), y: players[4].stats.trueDamageDealtToChampions },
		];
		
		this.state.redData = [
			{ x: getChampName(players[5].championId, champData), y: players[5].stats.trueDamageDealtToChampions },
			{ x: getChampName(players[6].championId, champData), y: players[6].stats.trueDamageDealtToChampions },
			{ x: getChampName(players[7].championId, champData), y: players[7].stats.trueDamageDealtToChampions },
			{ x: getChampName(players[8].championId, champData), y: players[8].stats.trueDamageDealtToChampions },
			{ x: getChampName(players[9].championId, champData), y: players[9].stats.trueDamageDealtToChampions },
		];

		this.forceUpdate();
	}

	damageTaken() {
		console.log("damageTaken()")
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		this.state.blueData = [
			{ x: getChampName(players[0].championId, champData), y: players[0].stats.totalDamageTaken },
			{ x: getChampName(players[1].championId, champData), y: players[1].stats.totalDamageTaken },
			{ x: getChampName(players[2].championId, champData), y: players[2].stats.totalDamageTaken },
			{ x: getChampName(players[3].championId, champData), y: players[3].stats.totalDamageTaken },
			{ x: getChampName(players[4].championId, champData), y: players[4].stats.totalDamageTaken },
		];
		
		this.state.redData = [
			{ x: getChampName(players[5].championId, champData), y: players[5].stats.totalDamageTaken },
			{ x: getChampName(players[6].championId, champData), y: players[6].stats.totalDamageTaken },
			{ x: getChampName(players[7].championId, champData), y: players[7].stats.totalDamageTaken },
			{ x: getChampName(players[8].championId, champData), y: players[8].stats.totalDamageTaken },
			{ x: getChampName(players[9].championId, champData), y: players[9].stats.totalDamageTaken },
		];

		this.forceUpdate();
	}

	magicDamageTaken() {
		console.log("magicDamageTaken()");
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		this.state.blueData = [
			{ x: getChampName(players[0].championId, champData), y: players[0].stats.magicalDamageTaken },
			{ x: getChampName(players[1].championId, champData), y: players[1].stats.magicalDamageTaken },
			{ x: getChampName(players[2].championId, champData), y: players[2].stats.magicalDamageTaken },
			{ x: getChampName(players[3].championId, champData), y: players[3].stats.magicalDamageTaken },
			{ x: getChampName(players[4].championId, champData), y: players[4].stats.magicalDamageTaken },
		];
		
		this.state.redData = [
			{ x: getChampName(players[5].championId, champData), y: players[5].stats.magicalDamageTaken },
			{ x: getChampName(players[6].championId, champData), y: players[6].stats.magicalDamageTaken },
			{ x: getChampName(players[7].championId, champData), y: players[7].stats.magicalDamageTaken },
			{ x: getChampName(players[8].championId, champData), y: players[8].stats.magicalDamageTaken },
			{ x: getChampName(players[9].championId, champData), y: players[9].stats.magicalDamageTaken },
		];

		this.forceUpdate();
	}

	physicalDamageTaken() {
		console.log("physicalDamageTaken()");
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		this.state.blueData = [
			{ x: getChampName(players[0].championId, champData), y: players[0].stats.physicalDamageTaken },
			{ x: getChampName(players[1].championId, champData), y: players[1].stats.physicalDamageTaken },
			{ x: getChampName(players[2].championId, champData), y: players[2].stats.physicalDamageTaken },
			{ x: getChampName(players[3].championId, champData), y: players[3].stats.physicalDamageTaken },
			{ x: getChampName(players[4].championId, champData), y: players[4].stats.physicalDamageTaken },
		];
		
		this.state.redData = [
			{ x: getChampName(players[5].championId, champData), y: players[5].stats.physicalDamageTaken },
			{ x: getChampName(players[6].championId, champData), y: players[6].stats.physicalDamageTaken },
			{ x: getChampName(players[7].championId, champData), y: players[7].stats.physicalDamageTaken },
			{ x: getChampName(players[8].championId, champData), y: players[8].stats.physicalDamageTaken },
			{ x: getChampName(players[9].championId, champData), y: players[9].stats.physicalDamageTaken },
		];

		this.forceUpdate();
	}

	trueDamageTaken() {
		console.log("trueDamageTaken()");
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		this.state.blueData = [
			{ x: getChampName(players[0].championId, champData), y: players[0].stats.trueDamageTaken },
			{ x: getChampName(players[1].championId, champData), y: players[1].stats.trueDamageTaken },
			{ x: getChampName(players[2].championId, champData), y: players[2].stats.trueDamageTaken },
			{ x: getChampName(players[3].championId, champData), y: players[3].stats.trueDamageTaken },
			{ x: getChampName(players[4].championId, champData), y: players[4].stats.trueDamageTaken },
		];
		
		this.state.redData = [
			{ x: getChampName(players[5].championId, champData), y: players[5].stats.trueDamageTaken },
			{ x: getChampName(players[6].championId, champData), y: players[6].stats.trueDamageTaken },
			{ x: getChampName(players[7].championId, champData), y: players[7].stats.trueDamageTaken },
			{ x: getChampName(players[8].championId, champData), y: players[8].stats.trueDamageTaken },
			{ x: getChampName(players[9].championId, champData), y: players[9].stats.trueDamageTaken },
		];

		this.forceUpdate();
	}
	
	render() {
		if (this.state.runeData == null || this.state.itemData == null) {
			return (
				<View>
					<Text>Loading...</Text>
				</View>
			);
		}
		
		var blueFirstBlood = ' ';
		var redFirstBlood = ' ';
		if (this.state.matchData.teams[0].firstBlood) {
			blueFirstBlood = 'First Blood';
		} else if (this.state.matchData.teams[1].firstBlood) {
			redFirstBlood = 'First Blood';
		}
		
		var blueDragons = this.state.matchData.teams[0].dragonKills;
		var redDragons = this.state.matchData.teams[1].dragonKills;
		
		var blueBarons = this.state.matchData.teams[0].baronKills;
		var redBarons = this.state.matchData.teams[1].baronKills;
		
		var blueTowers = this.state.matchData.teams[0].towerKills;
		var redTowers = this.state.matchData.teams[1].towerKills;
		
		var blueInhibs = this.state.matchData.teams[0].inhibitorKills;
		var redInhibs = this.state.matchData.teams[1].inhibitorKills;
		
		var participantId = -1;
		for (var i = 0; i < this.state.matchData.participantIdentities.length; i++) {
			if (this.state.matchData.participantIdentities[i].player.summonerName == this.state.summonerData.name) {
				participantId = this.state.matchData.participantIdentities[i].participantId;
			}
		}
		
		var player = this.state.matchData.participants[participantId-1];
		var playerStats = player.stats;
		
		var spell1 = this.state.ddragonPrefix + this.state.patch + '/img/spell/' +  findSummonerSpells(player.spell1Id).icon
		var spell2 = this.state.ddragonPrefix + this.state.patch + '/img/spell/' +  findSummonerSpells(player.spell2Id).icon
		
		var primaryRunePath = findRune(playerStats.perkPrimaryStyle, this.state.runeData);
		var keystone = findRune(playerStats.perk0, this.state.runeData);
		var primaryRune1 = findRune(playerStats.perk1, this.state.runeData);
		var primaryRune2 = findRune(playerStats.perk2, this.state.runeData);
		var primaryRune3 = findRune(playerStats.perk3, this.state.runeData);
		var secondaryRunePath = findRune(playerStats.perkSubStyle, this.state.runeData);
		var secondaryRune1 = findRune(playerStats.perk4, this.state.runeData);
		var secondaryRune2 = findRune(playerStats.perk5, this.state.runeData);
		
		//console.log(this.state.itemData[1001]);
		
		var itemIcons = [];
		for (var i = 0; i < 7; i++) {
			var itemKey = 'item' + i.toString();
			if (playerStats[itemKey] != 0) {
				url = this.state.ddragonPrefix + this.state.patch + '/img/item/' + playerStats[itemKey] + '.png';
				itemIcons.push(url);
			}
		}
		
		var champData = this.state.champData;
		var players = this.state.matchData.participants;
		var playerIDs = this.state.matchData.participantIdentities;
		
		return (
			<ScrollView>
				<View style={{flexDirection: 'row'}}>
					<Image source={{uri: this.state.champIcon}} style={{aspectRatio: 1}}/>
					<View style={{flex: 1, padding: 5}}>
						<Text>{this.state.champName}</Text>
						<Text>{this.state.queueType}</Text>
						<Text>{this.state.map}</Text>
					</View>
					<View style={{flex: 2, justifyContent: 'center'}}>
						<Text style={{flex: 1, fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>{player.stats.kills}/{player.stats.deaths}/{player.stats.assists}</Text>
						<Text style={{fontSize: 20, textAlign: 'center'}}>{player.stats.totalMinionsKilled} cs</Text>
					</View>
				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={{flex: 1, backgroundColor: '#7aadff'}}>
						<Text>{playerIDs[0].player.summonerName} ({getChampName(players[0].championId, champData)})</Text>
						<Text>{playerIDs[1].player.summonerName} ({getChampName(players[1].championId, champData)})</Text>
						<Text>{playerIDs[2].player.summonerName} ({getChampName(players[2].championId, champData)})</Text>
						<Text>{playerIDs[3].player.summonerName} ({getChampName(players[3].championId, champData)})</Text>
						<Text>{playerIDs[4].player.summonerName} ({getChampName(players[4].championId, champData)})</Text>
						<Text></Text>
						<Text>{blueFirstBlood}</Text>
						<Text>{blueTowers} towers</Text>
						<Text>{blueDragons} dragons</Text>
						<Text>{blueBarons} barons</Text>
						<Text>{blueInhibs} inhibitors</Text>
					</View>
					<View style={{flex: 1, backgroundColor: '#ff7c7c'}}>
						<Text>{playerIDs[5].player.summonerName} ({getChampName(players[5].championId, champData)})</Text>
						<Text>{playerIDs[6].player.summonerName} ({getChampName(players[6].championId, champData)})</Text>
						<Text>{playerIDs[7].player.summonerName} ({getChampName(players[7].championId, champData)})</Text>
						<Text>{playerIDs[8].player.summonerName} ({getChampName(players[8].championId, champData)})</Text>
						<Text>{playerIDs[9].player.summonerName} ({getChampName(players[9].championId, champData)})</Text>
						<Text></Text>
						<Text>{redFirstBlood}</Text>
						<Text>{redTowers} towers</Text>
						<Text>{redDragons} dragons</Text>
						<Text>{redBarons} barons</Text>
						<Text>{redInhibs} inhibitors</Text>
					</View>
				</View>
				<Text></Text>
			  	<View style={{height: 50, flexDirection: 'row'}}>
 					<Image source={{uri: spell1}} style={{height: 50, width: 50}}/>
					<Image source={{uri: spell2}} style={{height: 50, width: 50}}/>
 				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={{flex: 1}}>
						<View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
							<Image source={{uri:this.state.ddragonPrefix + 'img/' + primaryRunePath.icon}} style={{height: 50, width: 50}}/>
							<Text style={{fontWeight: 'bold'}}>{primaryRunePath.name}</Text>
						</View>
						<View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
							<Image source={{uri:this.state.ddragonPrefix + 'img/' + keystone.icon}} style={{height: 50, width: 50}}/>
							<Text>{keystone.name}</Text>
						</View>
						<View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
							<Image source={{uri:this.state.ddragonPrefix + 'img/' + primaryRune1.icon}} style={{height: 25, width: 25}}/>
							<Text>{primaryRune1.name}</Text>
						</View>
						<View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
							<Image source={{uri:this.state.ddragonPrefix + 'img/' + primaryRune2.icon}} style={{height: 25, width: 25}}/>
							<Text>{primaryRune2.name}</Text>
						</View>
						<View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
							<Image source={{uri:this.state.ddragonPrefix + 'img/' + primaryRune3.icon}} style={{height: 25, width: 25}}/>
							<Text>{primaryRune3.name}</Text>
						</View>
					</View>
					<View style={{flex: 1}}>
						<View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
							<Image source={{uri:this.state.ddragonPrefix + 'img/' + secondaryRunePath.icon}} style={{height: 50, width: 50}}/>
							<Text style={{fontWeight: 'bold'}}>{secondaryRunePath.name}</Text>
						</View>
						<View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
							<Image source={{uri:this.state.ddragonPrefix + 'img/' + secondaryRune1.icon}} style={{height: 25, width: 25}}/>
							<Text>{secondaryRune1.name}</Text>
						</View>
						<View style={{flex : 1, flexDirection: 'row', alignItems: 'center'}}>
							<Image source={{uri:this.state.ddragonPrefix + 'img/' + secondaryRune2.icon}} style={{height: 25, width: 25}}/>
							<Text>{secondaryRune2.name}</Text>
						</View>
					</View>
				</View>
				<View style={{flexDirection: 'row'}}>
					<FlatList data={itemIcons} horizontal={true} renderItem={({item}) =>
						<View>
							<Image source={{uri: item}} style={{width: 50, height: 50}} />
						</View>
					}
					keyExtractor={(item, index) => index.toString()}
					/>
				</View>
				<View style={{flexDirection: 'row'}}>
					<View style={{flex: 1}}>
						<Button title="Damage Dealt" onPress={() => this.damageDealt(true)}/>
						<Button title="Magic Damage Dealt" onPress={() => this.magicDamageDealt()}/>
						<Button title="Physical Damage Dealt" onPress={() => this.physicalDamageDealt()}/>
						<Button title="True Damage Dealt" onPress={() => this.trueDamageDealt()}/>
					</View>
					<View style={{flex: 1}}>
						<Button title="Damage Taken" onPress={() => this.damageTaken()}/>
						<Button title="Magic Damage Taken" onPress={() => this.magicDamageTaken()}/>
						<Button title="Physical Damage Taken" onPress={() => this.physicalDamageTaken()}/>
						<Button title="True Damage Taken" onPress={() => this.trueDamageTaken()}/>
					</View>
				</View>
				<VictoryBar 
					horizontal data={this.state.blueData} 
					labels={(d) => `${d.x}: ${d.y}`} 
					style={{ data: {fill: '#7aadff'}}}
					labelComponent={<VictoryLabel x={50}/>}
					barWidth={30}
					height={200}
					padding={25}/>
				<VictoryBar 
					horizontal data={this.state.redData} 
					labels={(d) => `${d.x}: ${d.y}`}
					style={{  data: {fill: "#ff7c7c"}}} 
					labelComponent={<VictoryLabel x={50}/>}
					barWidth={30}
					height={200}
					padding={25}/>
			</ScrollView>
		);
	}
}