import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, Text, View } from 'react-native';
import { VictoryArea, VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryPolarAxis, VictoryTheme } from 'victory-native';
import { styles } from './Common.js';

class SplashArts extends React.Component {
	render() {
		splashes = [];
		for (var i = 0; i < this.props.skinData.length; i++) {
			splashes.push(this.props.splashPrefix + this.props.skinData[i].num.toString() + '.jpg');
		}
		console.log(splashes);
		return (
			<FlatList data={splashes} horizontal={true} renderItem={({item}) =>
					<Image source={{uri: item}} 
						style={{width: this.props.splashWidth, height: this.props.splashHeight}} />
				}
				keyExtractor={(item, index) => index.toString()}
			/>
		);
	}
}

export class ChampionScreen extends React.Component {
	getChampData() {
		console.log('Getting champ data');
		const axios = require('axios');
		var url = this.state.ddragonPrefix + this.state.patch + '/data/en_US/champion/' + this.state.key + '.json';
		var self = this;
		console.log(url);
		axios.get(url)
			.then(function (response) {
				self.state.champData = response.data.data[self.state.key];
				console.log('Data loaded');
				self.forceUpdate();
			})
			.catch(function(error) {
				console.log(error);
			});
	}
	
	constructor(props) {
		super(props);
		this.state = props.navigation.state.params;
		this.state.champData = null;
		this.getChampData();
	}
	
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.name}`,
	});
	
	render() {
		//console.log(this.state.champData);
		if (this.state.champData == null) {
			return (
				<View style={this.center}>
					<Text>Loading</Text>
				</View>
			);
		}
		else {
			var splashUrl = this.state.ddragonPrefix + 'img/champion/splash/' + this.state.key + '_0.jpg';
			var splashPrefix = this.state.ddragonPrefix + 'img/champion/splash/' + this.state.key + '_';
			var splashWidth = Dimensions.get('window').width;
			var splashHeight = (splashWidth / 1215) * 717;

			const data = [
			  {info: 'attack', 		score: this.state.champData.info.attack},
			  {info: 'defense', 	score: this.state.champData.info.defense},
			  {info: 'magic', 		score: this.state.champData.info.magic},
			  {info: 'difficulty', 	score: this.state.champData.info.difficulty}
			];
			
			var passiveIcon = this.state.ddragonPrefix + this.state.patch + '/img/passive/' + this.state.champData.passive.image.full;
			var qIcon = this.state.ddragonPrefix + this.state.patch + '/img/spell/' + this.state.champData.spells[0].id + '.png';
			var wIcon = this.state.ddragonPrefix + this.state.patch + '/img/spell/' + this.state.champData.spells[1].id + '.png';
			var eIcon = this.state.ddragonPrefix + this.state.patch + '/img/spell/' + this.state.champData.spells[2].id + '.png';
			var rIcon = this.state.ddragonPrefix + this.state.patch + '/img/spell/' + this.state.champData.spells[3].id + '.png';
			
			console.log(qIcon);
			
			console.log(this.state.champData.skins.length);
			//					<Image resizeMode="contain" source={{uri: splashUrl}} style={{width: splashWidth, height: splashHeight}}/>
			return (
				<ScrollView style={{flex: 1}}>
					<SplashArts splashPrefix={splashPrefix} splashWidth={splashWidth} splashHeight={splashHeight} skinData={this.state.champData.skins}/>
					<View style={styles.viewHorPad}>
						<View style={{width: splashWidth / 2}}>
							<Text style={{fontStyle: 'italic', fontSize: 20}}>{this.state.champData.title}</Text>
							<Text>{this.state.champData.lore}</Text>
						</View>
						<VictoryChart 
							polar 
							domain={{ y: [0, 10]}} style={{flex: 1}} 
							theme={VictoryTheme.material}
							width={splashWidth / 2}
							height={splashWidth / 2}
						>
							<VictoryArea
								data={data}
								// data accessor for x values
								x="info"
								// data accessor for y values
								y="score"
							/>
							<VictoryPolarAxis
								labelPlacement='perpendicular'
							/>
						</VictoryChart>
					</View>
					<View style={styles.viewVerPad}>
						<Text style={{fontSize: 16}}>Abilities</Text>
						<Text>Passive: {this.state.champData.passive.name}</Text>
						<View style={{flexDirection: 'row'}}>
							<Image source={{uri: passiveIcon}} style={{flex: 1, aspectRatio: 1}}/>
							<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.passive.description}</Text>
						</View>
						<Text></Text>
						<Text>Q: {this.state.champData.spells[0].name}</Text>
						<View style={styles.viewHor}>
							<Image source={{uri: qIcon}} style={{flex: 1, aspectRatio: 1}}/>
							<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.spells[0].description} </Text>
						</View>
						<Text></Text>
						<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.spells[0].tooltip} </Text>
						<Text>Cost: {this.state.champData.spells[0].costBurn}    Cooldown: {this.state.champData.spells[0].cooldownBurn}</Text>
						<Text></Text>
						<Text>W: {this.state.champData.spells[1].name}</Text>
						<View style={styles.viewHor}>
							<Image source={{uri: wIcon}} style={{flex: 1, aspectRatio: 1}}/>
							<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.spells[1].description} </Text>
						</View>
						<Text></Text>
						<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.spells[1].tooltip} </Text>
						<Text>Cost: {this.state.champData.spells[1].costBurn}    Cooldown: {this.state.champData.spells[1].cooldownBurn}</Text>
						<Text></Text>
						<Text>E: {this.state.champData.spells[2].name}</Text>
						<View style={styles.viewHor}>
							<Image source={{uri: eIcon}} style={{flex: 1, aspectRatio: 1}}/>
							<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.spells[2].description} </Text>
						</View>
						<Text></Text>
						<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.spells[2].tooltip} </Text>
						<Text>Cost: {this.state.champData.spells[2].costBurn}    Cooldown: {this.state.champData.spells[2].cooldownBurn}</Text>
						<Text></Text>
						<Text>R: {this.state.champData.spells[3].name}</Text>
						<View style={styles.viewHor}>
							<Image source={{uri: rIcon}} style={{flex: 1, aspectRatio: 1}}/>
							<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.spells[3].description} </Text>
						</View>
						<Text></Text>
						<Text style={{flex: 10, paddingLeft: 5}}>{this.state.champData.spells[3].tooltip} </Text>
						<Text>Cost: {this.state.champData.spells[3].costBurn}    Cooldown: {this.state.champData.spells[3].cooldownBurn}</Text>
						<Text></Text>
					</View>
				</ScrollView>
			);
		}
	}
}