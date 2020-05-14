import React from "react"
import { Column, forEachChildren, Row } from "../layout"
import Button from "../widgets/button"
import { ScrollView } from "react-native-web"

const ScrollableContent = React.forwardRef((props, ref) =>
	<ScrollView ref={ref}>
		{props.children}
	</ScrollView>
)

export function MultiSectionLayout(props) {
	// const {children} = props
	let children = []
	let ypos = []
	const ref = React.createRef()
	function handleOnLayout(layout) {
		ypos.push(layout.y)
		console.log(ypos)
	}
	function handleScrollTo() {
		console.log("scroll")
		ref.current.scrollTo({
			x: 0,
			y: 0,
			animated: true
		})
	}
	forEachChildren(props.children, (child, index) => {
		children.push(React.cloneElement(child, {
				onLayout: event =>
					handleOnLayout(event.nativeEvent.layout),
				key: index,
			},
		))
	})

	return <Column>
		<Row>
			<Button text="APUUI" onClick={handleScrollTo}/>
		</Row>
		<ScrollableContent ref={ref}>
			<Column>
				{children}
			</Column>
		</ScrollableContent>
	</Column>
}