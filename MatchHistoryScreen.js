import React from 'react';
import { Button, FlatList, Image, Text, TouchableHighlight, View } from 'react-native';
import { getChampKey, getMap, getQueueType, styles } from './Common.js';
import { VictoryPie } from 'victory-native';

var winrate;

var champWinrate;

class Match extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			matchData: null,
			requested: false,
		};
	}
		
	getMatch(gameId) {
		console.log('Getting match');
		const axios = require('axios');
		var url = this.props.state.apiPrefix + 'match/v3/matches/' + gameId;
		console.log(url);
		var self = this;
		
		axios.get(url, {
			params: {
				api_key: self.props.state.api_key,
			}
		})
		.then(function (response) {
			//console.log(response.data);
			self.state.matchData = response.data;
			self.forceUpdate();
			self.props.matchHistory.forceUpdate();
		})
		.catch(function (error) {
			console.log(error);
		});
	}
	
	render() {
		var champKey = getChampKey(this.props.data.champion, this.props.state.champData);
		var champName = this.props.state.champData[champKey].name;
		var champIcon = this.props.state.ddragonPrefix + this.props.state.patch + '/img/champion/' + champKey + '.png';
		var queueType = getQueueType(this.props.data.queue);
		var map = getMap(this.props.data.queue);
		
		if (this.state.matchData == null) {
			if (!this.state.requested) {
				this.getMatch(this.props.data.gameId);
				this.state.requested = true;
			}
			return (
				<Text>Loading...</Text>
			)
		}
		
		if (champWinrate[champKey] == undefined) {
			champWinrate[champKey] = { wins: 0, losses: 0 };
		}
		
		var color = "";
		var win = false;
		
		for (var i = 0; i < this.state.matchData.participantIdentities.length; i++) {
			if (this.state.matchData.participantIdentities[i].player.summonerName ==
			   this.props.state.summonerData.name) {
				if (i < this.state.matchData.participantIdentities.length / 2) {
					if (this.state.matchData.teams[0].win == "Win") {
						win = true;
					}
				}
				else if (this.state.matchData.teams[1].win == "Win") {
					win = true;
				}
				if (win) {
					color = "#34c932";
					winrate[0].y += 1;
					champWinrate[champKey].wins += 1;
				}
				else {
					color = "#c93131";
					winrate[1].y += 1;
					champWinrate[champKey].losses += 1;
				}
			}
		}
		
		return (
			<TouchableHighlight	onPress={() => this.props.navigate('Match', {basicData: this.props.data, matchData: this.state.matchData, summonerData: this.props.state.summonerData, champName: champName, champIcon: champIcon, queueType: queueType, map: map, ddragonPrefix: this.props.state.ddragonPrefix, patch: this.props.state.patch, champData: this.props.state.champData, runeData: this.props.state.runeData})}>
				<View style={{flexDirection: 'row', padding: 10, backgroundColor: color}}>
					<Image source={{uri: champIcon}} style={{aspectRatio: 1}}/>
					<View style={{padding: 5}}>
						<Text>{champName}</Text>
						<Text>{queueType}</Text>
						<Text>{map}</Text>
					</View>
				</View>
			</TouchableHighlight>
		)
	}
}

export class MatchHistoryScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.navigation.state.params;
		this.state.matchHistory = [];
		this.state.beginIndex = 0;
		this.state.endIndex = 10;
		this.getMatchHistory();
		winrate = [
			{ x: 'W', y: 0 },
			{ x: 'L', y: 0 },
		];
		champWinrate = {};
	}
	
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.summonerData.name}`,
	})
	
	getMatchHistory() {
		console.log('Getting match history');
		const axios = require('axios');
		var url = this.state.apiPrefix + 'match/v3/matchlists/by-account/' + this.state.summonerData.accountId;
		var self = this;
		
		axios.get(url, {
			params: {
				api_key: self.state.api_key,
				beginIndex: self.state.beginIndex,
				endIndex: self.state.endIndex,
			}
		})
		.then(function (response) {
			//console.log(response.data);
			self.state.matchHistory = self.state.matchHistory.concat(response.data.matches);
			self.forceUpdate();
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	loadMore() {
		console.log("Load more");
		this.state.beginIndex = this.state.endIndex;
		this.state.endIndex = this.state.beginIndex + 10;
		this.getMatchHistory();
	}
	
	render() {
		champWinrateArray = [];
		for(champKey in champWinrate) {
			champWinrateArray.push({name: champKey, wins: champWinrate[champKey].wins, losses: champWinrate[champKey].losses});
		}
		const { navigate } = this.props.navigation;
		return (
			<View style={{flex: 1}}>
				<View style={{flexDirection: 'row'}}>
					<View style={{padding: 5}}>
						<VictoryPie data={winrate} width={50} height={50} padding={0} labels={() => null} colorScale={['green', 'red']}/>
						<Text>Winrate</Text>
					</View>
					<FlatList data={champWinrateArray} horizontal={true} renderItem={({item}) =>
						<View style={{padding: 5}}>
							<VictoryPie data={[{x:'W',y:item.wins},{x:'L',y:item.losses}]} width={50} height={50} padding={0} labels={() => null} colorScale={['green', 'red']}/>
							<Text>{item.name}</Text>
						</View>
					}
					keyExtractor={(item, index) => index.toString()}/>
				</View>
				<FlatList data={this.state.matchHistory}
					renderItem={({item}) => 
						<Match data={item} state={this.state} matchHistory={this} navigate={navigate}/>
					}
					keyExtractor={(item, index) => index.toString()}
				/>
				<Button title="Load More" onPress={() => this.loadMore()} />
			</View>
		)
	}
}