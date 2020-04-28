import React from "react"
import { useTranslation } from "react-i18next"
import ArrowLeft from "../svg/arrow-left"
import { Flex, Row, Hairline } from "../layout"
import { Heading, Text } from "../text"
import Button from "../widgets/button"

export default function DashboardNavbarNative(props) {
	const [t] = useTranslation()
	return (
		<>
			<Row
				of="component"
				padding="group"
				style={{ alignItems: "stretch", alignSelf: "left" }}
			>
				<ArrowLeft />
				<Heading level="4">{props.header}</Heading>
				<Flex />
				<Button tertiary text={t("general:buttons.save")} />
			</Row>
			<Hairline />
		</>
	)
}
