import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ScrollView, View, TouchableWithoutFeedback } from "react-native"
import { Platform } from "../../../platform"
import { Group, Hairline, Flex, Row, Column } from "../../../layout"
import { Heading, Paragraph, Text } from "../../../text"
import { Colors } from "../../../theme"
import { TextField, Dropdown, CheckBox } from "../../../forms"
import { TabBar, Tab } from "../../../widgets/tabs"
import ChangePasswordModal from "../ChangePasswordContainer"
import DashboardNavbarWeb from "../../../layout/dashboard-navbar-web"
import DashboardNavbarNative from "../../../layout/dashboard-navbar-native"
import MyProfile from "./my-profile"
import AccountInfo from "./account-info"
import MyIdentity from "./my-identity"
import MyNotifications from "./my-notifications"
import SecurityPage from "./my-security"

const ProfileMenu = [
	{
		text: "dashboardHeader:profile",
		to: "/dashboard/my-profile",
	},
	{
		text: "dashboardHeader:account",
		to: "/dashboard/my-account",
	},
	{
		text: "dashboardHeader:identity",
		to: "/dashboard/my-identity",
	},
	{
		text: "dashboardHeader:notifications",
		to: "/dashboard/my-notifications",
	},
	{
		text: "profile:menu.security",
		to: "/dashboard/my-security",
	},
]

export default function SettingsPage() {
	const [t] = useTranslation()

	const [changePasswordModalOpened, setChangePasswordModalOpened] = useState(
		false
	)
	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const [checkBox, setCheckBox] = useState(false)

	return (
		<>
			{Platform.web && (
				<DashboardNavbarWeb header={t("dashboardTitles:settings")} />
			)}

			<ScrollView>
				<Group
					of={Platform.OS === "web" ? "group" : "component"}
					style={
						Platform.OS === "web" && { maxWidth: "944dp", alignSelf: "center" }
					}
				>
					<MyProfile />

					{Platform.native && (
						<>
							<DashboardNavbarNative header={t("dashboardTitles:account")} />
							<TouchableWithoutFeedback>
								<TabBar>
									<Tab
										key="account-info"
										title={t("dashboardTitles:accountInfo")}
										default
									>
										<AccountInfo />
									</Tab>

									<Tab
										key="pro-identity"
										title={t("dashboardTitles:proIdentity")}
									>
										<MyIdentity />
									</Tab>
								</TabBar>
							</TouchableWithoutFeedback>
						</>
					)}

					{Platform.web && (
						<>
							<AccountInfo />

							<MyIdentity />

							<MyNotifications />

							<SecurityPage />
						</>
					)}
				</Group>
			</ScrollView>
		</>
	)
}