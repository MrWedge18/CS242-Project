import React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { styles } from './Common.js';
import { SummonerScreen } from './SummonerScreen.js';

export class SummonerSearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			api_key: "RGAPI-ac9cb2c5-ee33-40c4-b05a-4bee101c2c68",
			patch: "8.24.1",
			apiPrefix: "https://na1.api.riotgames.com/lol/",
			ddragonPrefix: "https://ddragon.leagueoflegends.com/cdn/",
			summonerData: [],
			rankedData: [],
			masteryData: [],
			champData: [],
			runeData: [],
		};
		this.getChamps();
		this.getRunes();
	}
		
	getRunes() {
		console.log("Getting Runes");
		const axios = require('axios');
		var url = this.state.ddragonPrefix + this.state.patch + 
			'/data/en_US/runesReforged.json';
		console.log(url);
		var self = this;
		
		axios.get(url)
			.then(function (response) {
				self.state.runeData = response.data;
			})
			.catch(function(error) {
				console.log(error.headers);
			});
	}
	
	getChamps() {
		console.log('getChamps');
		const axios = require('axios');
		var url = this.state.ddragonPrefix + this.state.patch + "/data/en_US/champion.json";
		var self = this;
		axios.get(url)
			.then(function (response) {
				self.state.champData = response.data.data;
			})
			.catch(function (error) { 
				console.log(error);	   
			});
	}
	
	getChampMastery(summonerId) {
		console.log('getChampMastery');
		const axios = require('axios');
		const { navigate } = this.props.navigation;
		var self = this;
		var url = this.state.apiPrefix + "champion-mastery/v3/champion-masteries/by-summoner/" + summonerId;
		axios.get(url, {
				params: {
					api_key: self.state.api_key,
				}
			})
			.then(function (response) {
				self.state.masteryData = response.data;
				navigate('Summoner', self.state);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	getRanked(summonerId) {
		console.log('getRanked');
		const axios = require('axios');
		var self = this;
		var url = this.state.apiPrefix + 'league/v3/positions/by-summoner/' + summonerId;
		axios.get(url, {
				params: {
					api_key: self.state.api_key,
				}
			})
			.then(function (response) {
				console.log(response.data);
				self.state.rankedData = response.data;
				self.getChampMastery(summonerId);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	
	getSummoner(summonerName) {
		console.log('getSummoner');
		const axios = require('axios');
		var self = this;
		var url = this.state.apiPrefix + 'summoner/v3/summoners/by-name/' + summonerName;
		axios.get(url, {
				params: {
					api_key: self.state.api_key,
				}
			})
			.then(function (response) {
				console.log(response.data);
				self.state.summonerData = response.data;
				self.getRanked(response.data.id);
			})
			.catch(function (error) {
				console.log(error.header);
				Alert.alert("Error", "Summoner not found");
			});
	}
	
    render() {
        return (
            <View style={styles.center}>
				<TextInput placeholder="Search Summoner Name" onSubmitEditing={(event) => {
					console.log("Searching for " + event.nativeEvent.text);
					if (this.state.champData == []) {
						this.getChamps();
					}
					this.getSummoner(event.nativeEvent.text);
				}} />
            </View>
        );
    }
}