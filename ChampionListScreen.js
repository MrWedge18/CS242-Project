import React from 'react';
import { Alert, FlatList, Image, Text, TouchableHighlight, View } from 'react-native';
import { styles } from './Common.js';
import { ChampionScreen } from './ChampionScreen.js';

export class ChampionListScreen extends React.Component {
	champToArray() {
		champArray = []
		for (key in this.state.champData) {
			//console.log(this.state.champData[key].name);
			champArray.push({
				name: this.state.champData[key].name,
				icon: this.state.ddragonPrefix + this.state.patch + '/img/champion/' + this.state.champData[key].image.full,
				data: this.state.ddragonPrefix + this.state.patch + '/data/en_US/champion/' + key + '.json',
				key: key,
			});
		}
		this.state.champData = champArray;
		this.forceUpdate();
	}
	
	getChamps() {
		console.log('getChamps');
		const axios = require('axios');
		var url = this.state.ddragonPrefix + this.state.patch + "/data/en_US/champion.json";
		var self = this;
		axios.get(url)
			.then(function (response) {
				self.state.champData = response.data.data;
				self.champToArray();
			})
			.catch(function (error) { 
				console.log(error);	   
			});
	}
	
	constructor(props) {
		super(props);
		this.state = {
			api_key: "RGAPI-3f566152-6718-4a66-979c-74aa91e4c105",
			patch: "8.24.1",
			apiPrefix: "https://na1.api.riotgames.com/lol/",
			ddragonPrefix: "https://ddragon.leagueoflegends.com/cdn/",
			champData: [],
		};
		this.getChamps();
	}
	
	render() {
		
		const { navigate } = this.props.navigation;
		
		return (
			<View style={styles.center}>
				<FlatList data={this.state.champData}
					renderItem={({item}) => 
						<TouchableHighlight onPress={() => navigate('ChampInfo', 
													 {name: item.name, 
													  key: item.key,
													  patch: this.state.patch,
													  ddragonPrefix: this.state.ddragonPrefix})}>
							<View style={{flex: 1, flexDirection: 'row', padding: 10}}>
								<Image source={{uri: item.icon}} style={{aspectRatio: 1}}/>
								<Text style={{padding: 15}}>{item.name}</Text>
							</View>
						</TouchableHighlight>
					}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		);
	}
}