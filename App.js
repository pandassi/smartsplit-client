import React, { useState } from "react"
import { Platform, View, Text, ScrollView } from "react-native"
import { MemoryRouter } from "react-router"
import { BrowserRouter } from "react-router-dom"
import * as Font from "expo-font"

import i18n from "./translations"
import Main from "./src"

const RouterImpl = Platform.select({
	android: MemoryRouter,
	ios: MemoryRouter,
	web: BrowserRouter,
})

const fontMap = {
	"IBMPlexSans-Regular": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Regular.ttf"),
	"IBMPlexSans-RegularItalic": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Italic.ttf"),
	"IBMPlexSans-Medium": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Medium.ttf"),
	"IBMPlexSans-MediumItalic": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-MediumItalic.ttf"),
	"IBMPlexSans-BoldItalic": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-BoldItalic.ttf"),
	"IBMPlexSans-Bold": require("./assets/fonts/IBM-Plex-Sans/IBMPlexSans-Bold.ttf"),
}

export default class App extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			fontsReady: Platform.OS === "web",
			translationsReady: false,
		}

		Font.loadAsync(fontMap)
			.then((o) => this.setState({ fontsReady: true }))
			.catch((e) => console.error(e))

		i18n
			.then((o) => this.setState({ translationsReady: true }))
			.catch((e) => console.error(e))
	}

	/*static getDerivedStateFromError(error) {
		console.error(error)
		return { ready: true }
	}*/

	render() {
		if (!this.state.fontsReady || !this.state.translationsReady) return null

		return (
			<View
				style={{
					position: "absolute", // absolute nécessaire pour forcer la taille
					top: 0, // maximale, sinon les ScrollView ne fonctionnent pas
					left: 0,
					right: 0,
					bottom: 0,
					overflow: "hidden",
				}}
			>
				<RouterImpl>
					<Main />
				</RouterImpl>
			</View>
		)
	}
}
