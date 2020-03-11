import { StyleSheet } from "react-native"
import { Metrics } from "../theme"

const Components = {}
for(let [key, value] of Object.entries(Metrics.spacing)) {
	Components[key] = {
		margin: value
	}
}

const Padding = {}
for(let [key, value] of Object.entries(Metrics.spacing)) {
	Padding[key] = {
		padding: value
	}
}

const Spacings = {}
for(let [key, value] of Object.entries(Metrics.spacing)) {
	Spacings[key] = {
		flexBasis: value
	}
}

const Sizes = {}
for(let [key, value] of Object.entries(Metrics.size)) {
	Sizes[key] = {
		height: value
	}
}


const MetricsStyles = {
	components: StyleSheet.create(Components),
	padding: StyleSheet.create(Padding),
	spacing: StyleSheet.create(Spacings),
	sizes: StyleSheet.create(Sizes),
}

export default MetricsStyles
