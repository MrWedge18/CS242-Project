import React from 'react';
import { Alert, Image, Text, View, } from 'react-native';
import { getChampName, getMap, getQueueType, findRune, findSummonerSpells } from './Common.js';

export class LiveMatchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.navigation.state.params;
		this.state.liveMatchData = null;
		this.getLiveMatch();
	}
	
	getLiveMatch() {
		console.log('Getting live match');
		const axios = require('axios');
		var url = this.state.apiPrefix + 'spectator/v3/active-games/by-summoner/' + this.state.summonerData.id;
		var self = this;
		console.log(url);
		axios.get(url, {
				params: {
					api_key: self.state.api_key,
				}
			})
			.then(function (response) {
				console.log(response.data);
				self.state.liveMatchData = response.data;
				self.forceUpdate();
			})
			.catch(function (error) {
				console.log(error);
				Alert.alert("Error", "No live match found");
			});
	}
	
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.summonerData.name}`,
	})

	render() {
		if (this.state.liveMatchData == null) {
			return(
				<View></View>
			)
		}
		
		var players = this.state.liveMatchData.participants;
		var champData = this.state.champData;
		
		var thisPlayer;
		for (var i = 0; i < players.length; i++) {
			if (this.state.summonerData.name == players[i].summonerName) {
				thisPlayer = i;
			}
		}
		
		var perks = players[thisPlayer].perks;
		
		var primaryRunePath = findRune(perks.perkStyle, this.state.runeData);
		var keystone = findRune(perks.perkIds[0], this.state.runeData);
		var primaryRune1 = findRune(perks.perkIds[0], this.state.runeData);
		var primaryRune2 = findRune(perks.perkIds[1], this.state.runeData);
		var primaryRune3 = findRune(perks.perkIds[2], this.state.runeData);
		var secondaryRunePath = findRune(perks.perkSubStyle, this.state.runeData);
		var secondaryRune1 = findRune(perks.perkIds[3], this.state.runeData);
		var secondaryRune2 = findRune(perks.perkIds[4], this.state.runeData);
		
		var spell1 = this.state.ddragonPrefix + this.state.patch + '/img/spell/' + findSummonerSpells(players[thisPlayer].spell1Id).icon;
		var spell2 = this.state.ddragonPrefix + this.state.patch + '/img/spell/' + findSummonerSpells(players[thisPlayer].spell2Id).icon;
		
		
		
		return (
			<View style={{flex: 1}}>
				<Text>{this.state.liveMatchData.gameMode}</Text>
				<Text>{getQueueType(this.state.liveMatchData.gameQueueConfigId)}</Text>
				<Text>{getMap(this.state.liveMatchData.gameQueueConfigId)}</Text>
				<View style={{flexDirection:'row'}}>
					<View style={{flex: 1, backgroundColor: '#7aadff'}}>
						<Text>{players[0].summonerName} ({getChampName(players[0].championId, champData)})</Text>
						<Text>{players[1].summonerName} ({getChampName(players[1].championId, champData)})</Text>
						<Text>{players[2].summonerName} ({getChampName(players[2].championId, champData)})</Text>
						<Text>{players[3].summonerName} ({getChampName(players[3].championId, champData)})</Text>
						<Text>{players[4].summonerName} ({getChampName(players[4].championId, champData)})</Text>
					</View>
					<View style={{flex: 1, backgroundColor: '#ff7c7c'}}>
						<Text>{players[5].summonerName} ({getChampName(players[5].championId, champData)})</Text>
						<Text>{players[6].summonerName} ({getChampName(players[6].championId, champData)})</Text>
						<Text>{players[7].summonerName} ({getChampName(players[7].championId, champData)})</Text>
						<Text>{players[8].summonerName} ({getChampName(players[8].championId, champData)})</Text>
						<Text>{players[9].summonerName} ({getChampName(players[9].championId, champData)})</Text>
					</View>
				</View>
 				<View style={{height: 50, flexDirection: 'row'}}>
 					<Image source={{uri: spell1}} style={{height: 50, width: 50}}/>
					<Image source={{uri: spell2}} style={{height: 50, width: 50}}/>
 				</View>
 				<View style={{flex: 2, flexDirection: 'row'}}>
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
			</View>
		)
	}
}