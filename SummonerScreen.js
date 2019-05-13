import React from 'react';
import { Button, FlatList, Image, Text, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { getChampKey, styles } from './Common.js';

class ChampionMastery extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.state;
	}
	
	render() {
		var champName;
		var champIcon;
		var item = this.props.item;
		var champData = this.props.champData;
		var champKey = getChampKey(item.championId, champData);
		champName = champData[champKey].name;
		champIcon = {uri: this.state.ddragonPrefix + this.state.patch + '/img/champion/' + champKey + '.png'};
		
		var color = '#fff';
		if (item.championLevel == 7) {
			var color = '#2d4776';
		}
		else if (item.championLevel == 6) {
			var color = '#642b56';
		}
		else if (item.championLevel == 5) {
			var color = '#662023'
		}
		
		return (
			<View style={{flex: 1, flexDirection: 'row', padding: 10, backgroundColor: color}}>
				<Image source={champIcon} style={{aspectRatio: 1}}/>
				<View style={{padding: 5}}>
					<Text>{champName}</Text>
					<Text>Mastery {item.championLevel}</Text>
					<Text>Mastery Points: {item.championPoints}</Text>
				</View>
			</View>
		);
	}
}

class DisplayWinrate extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		var lossrate = 100 - this.props.winrate;
		var data = [
			{ x: 'W', y: this.props.winrate },
			{ x: 'L', y: lossrate }
		];
		//			<Text>{this.props.queue}: {this.props.rank}     Winrate: {this.props.winrate}%</Text>
		return (
			<View style={{padding: 5}}>
				<VictoryPie data={data} width={50} height={50} padding={0} labels={() => null} colorScale={['green', 'red']}/>
				<Text>{this.props.queue}</Text>
				<Text>{this.props.rank}</Text>
			</View>
		);
	}
}

export class SummonerScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.navigation.state.params;
	}
	
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.summonerData.name}`,
	});
	
	render() {
		var rankedData = this.state.rankedData;
		var ranks = ["", "", ""];
		var winrate = [0, 0, 0];
		
		const { navigate } = this.props.navigation;
		
		for (var i = 0; i < rankedData.length; i++) {
			if (rankedData[i].queueType == "RANKED_SOLO_5x5") {
				ranks[0] = rankedData[i].tier + " " + rankedData[i].rank;
				winrate[0] = rankedData[i].wins / (rankedData[i].wins + rankedData[i].losses);
				winrate[0] = Math.round(winrate[0] * 100);
			}
			else if (rankedData[i].queueType == "RANKED_FLEX_SR") {
				ranks[1] = rankedData[i].tier + " " + rankedData[i].rank;
				winrate[1] = rankedData[i].wins / (rankedData[i].wins + rankedData[i].losses);
				winrate[1] = Math.round(winrate[1] * 100);
			}
			else if (rankedData[i].queueType == "RANKED_FLEX_TT") {
				ranks[2] = rankedData[i].tier + " " + rankedData[i].rank;
				winrate[2] = rankedData[i].wins / (rankedData[i].wins + rankedData[i].losses);
				winrate[2] = Math.round(winrate[2] * 100);
			}
		}
		
		//iconSource = {uri: "https://ddragon.leagueoflegends.com/cdn/8.22.1/img/profileicon/" + this.state.summonerData.profileIconId + ".png"};
		iconSource = {uri: this.state.ddragonPrefix + this.state.patch + '/img/profileicon/' + this.state.summonerData.profileIconId + '.png'};
		return (
			<View style={{flex: 1, backgroundColor: '#fff'}}>
				<View style={{flexDirection: 'row', flex: 1}}>
					<Image source={iconSource} style={{aspectRatio: 1}}/>
					<View style={{flexDirection: 'column', padding: 5}}>
						<Text>Level {this.state.summonerData.summonerLevel}</Text>
						<View style={{flex: 1, flexDirection: 'row'}}>
							{ranks[0] != "" ? <DisplayWinrate queue='Solo Queue' rank={ranks[0]} winrate={winrate[0]}/>: null}
							{ranks[1] != "" ? <DisplayWinrate queue='Flex 5v5' rank={ranks[1]} winrate={winrate[1]}/>: null}
							{ranks[2] != "" ? <DisplayWinrate queue='Flex 3v3' rank={ranks[2]} winrate={winrate[2]}/>: null}
						</View>
					</View>
				</View>
				<Button title="View Match History >>" style={{flex: 1}} onPress={() => navigate('MatchHistory', this.state)} />
				<Button title="View Live Match >>" style={{flex: 1}} onPress={() => navigate('LiveMatch', this.state)} />
				<View style={{flex: 3}}>
					<FlatList data={this.state.masteryData}
						renderItem={({item}) =>
							<ChampionMastery state={this.state} item={item} champData={this.state.champData}/>
						}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			</View>
		)
	}
} 