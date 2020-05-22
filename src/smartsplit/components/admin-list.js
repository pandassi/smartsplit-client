import React, { useState } from "react"
import List, { ListItem, CollapsableList } from "../../widgets/list"
import { forEachChildren, Row } from "../../layout"
import ChevronDown from "../../svg/chevron-down"
import ChevronRight from "../../svg/chevron-right"
import Bullet from "../../../assets/svg/dot.svg"
import { StyleSheet } from "react-native"
import { Text } from "../../text"
import { Colors } from "../../theme"
import { TouchableWithoutFeedback, View } from "react-native"
import { Platform } from "../../platform"
import Hourglass from "../../svg/hourglass"
import {
	AdminListMenu,
	DefaultMenu,
	PendingMenu,
	SimpleMenu,
} from "./admin-list-menus"

export const AdminListStyle = StyleSheet.create({
	frame_pending: {
		backgroundColor: Colors.background.underground,
	},
})

function formatContent(children) {
	let content
	if (typeof children === "object" && children !== null) {
		content = []
		if (Array.isArray(children)) {
			content = children.map((element, index) =>
				React.cloneElement(element, { key: index })
			)
		} else {
			forEachChildren(children, (child, index) =>
				content.push(React.cloneElement(child, { key: index }))
			)
		}
	} else if (typeof children === "string") {
		content = <Text>{children}</Text>
	} else {
		content = children
	}
	return content
}

export function AdminListItem(props) {
	const {
		children,
		pending,
		onDelete,
		onModify,
		onAdd,
		onAccept,
		onRefuse,
		focus,
		hideBullet,
		list,
		contextualMenu,
		...nextProps
	} = props
	const content = formatContent(nextProps.content)

	function renderMenu() {
		const menuProps = {
			disabled: !focus,
			onAdd: onAdd,
			onDelete: onDelete,
			onModify: onModify,
		}
		let menu = <DefaultMenu {...menuProps} />
		if (contextualMenu === "simple") {
			menu = <SimpleMenu {...menuProps} />
		} else if (pending) {
			menu = <PendingMenu {...menuProps} />
		} else if (typeof contextualMenu === "object" && !!contextualMenu) {
			let menuChildren = []
			forEachChildren(contextualMenu, (child, index) =>
				menuChildren.push(
					React.cloneElement(child, { key: index, disabled: !focus })
				)
			)
			menu = <AdminListMenu disabled={!focus}>{menuChildren}</AdminListMenu>
		}

		return menu
	}

	return (
		<ListItem
			list={list}
			{...nextProps}
			style={pending ? AdminListStyle.frame_pending : null}
		>
			{list && content}
			{!list && (
				<>
					<Row of="component" valign="center">
						{!hideBullet &&
							(pending ? (
								<Hourglass color={Colors.alert_warning} />
							) : (
								<Bullet />
							))}
						{content}
					</Row>
					{!list && renderMenu()}
				</>
			)}
		</ListItem>
	)
}

export function AdminList(props) {
	const { children, collapsable, ...nextProps } = props
	const title = formatContent(nextProps.title)
	const [currentFocus, setCurrentFocus] = useState(null)
	let newChildren = []
	forEachChildren(children, (child, index) => {
		newChildren.push(
			Platform.web ? (
				React.cloneElement(child, {
					focus: index === currentFocus,
					onMouseEnter: () => setCurrentFocus(index),
					onMouseLeave: () => setCurrentFocus(null),
				})
			) : (
				<TouchableWithoutFeedback
					onPress={() => setCurrentFocus(index !== currentFocus ? index : null)}
					key={index}
				>
					{React.cloneElement(child, { focus: index === currentFocus })}
				</TouchableWithoutFeedback>
			)
		)
	})
	const [expanded, setExpanded] = useState(false)

	function handleExpand(expanded) {
		setExpanded(expanded)
		if (!expanded && !!currentFocus) {
			setCurrentFocus(null)
		}
	}

	function renderTitle() {
		return title ? (
			<Row align="spread">
				{title}
				<DefaultMenu disabled={currentFocus !== -1} />
			</Row>
		) : (
			title
		)
	}

	return collapsable ? (
		<CollapsableList
			title={renderTitle()}
			onExpand={(value) => handleExpand(value)}
			expanded={expanded}
			icon={expanded ? <ChevronDown /> : <ChevronRight />}
			onMouseEnterTitle={() => setCurrentFocus(-1)}
			onMouseLeaveTitle={() => setCurrentFocus(null)}
			onPressTitle={() =>
				setCurrentFocus(expanded && currentFocus !== -1 ? null : -1)
			}
			animate
		>
			{newChildren}
		</CollapsableList>
	) : (
		<List title={renderTitle()}>{newChildren}</List>
	)
}
