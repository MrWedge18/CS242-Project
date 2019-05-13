import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Button, Text, View } from 'react-native';
import { SummonerSearchScreen } from './SummonerSearchScreen.js';
import { SummonerScreen } from './SummonerScreen.js';
import { ChampionListScreen } from './ChampionListScreen.js';
import { ChampionScreen } from './ChampionScreen.js';
import { MatchHistoryScreen } from './MatchHistoryScreen.js';
import { MatchScreen } from './MatchScreen.js';
import { LiveMatchScreen } from './LiveMatchScreen.js';
import { styles } from './Common.js';

const summStack = createStackNavigator({
	SummHome: { screen: SummonerSearchScreen },
	Summoner: { screen: SummonerScreen },
	MatchHistory: { screen: MatchHistoryScreen },
	Match: { screen: MatchScreen },
	LiveMatch: { screen: LiveMatchScreen },
});

const champStack = createStackNavigator({
	ChampHome: { screen: ChampionListScreen },
	ChampInfo: { screen: ChampionScreen },
});

const App = createBottomTabNavigator({
		SummonerSearch: { screen: summStack },
		Champion: { screen: champStack },
	},
	{
		initialRouteName: 'SummonerSearch',
	}
);

export default App