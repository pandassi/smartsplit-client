import React from "react"
import { Switch, Route, Redirect } from "react-router"
import { Platform } from "../../platform"
import DashboardLayout from "../../layout/dashboard"
import BottomNavbarLayout from "../../layout/bottom-navbar"
import Scrollable from "../../widgets/scrollable"

import MusicNoteIcon from "../../svg/music-note"
import UserCardIcon from "../../svg/user-card"
import UsersIcon from "../../svg/users"
import LogoNotification from "../../svg/notifications"

import MyWorksPage from "./my-works"
import MyCollaboratorsPage from "./my-collaborators"
import ChangePasswordPage from "./change-password"
import NewEmailModal from "./new-email"
import FormsTest from "../test/forms"
import SubScreenLayout from "../../layout/subscreen"
import UserAvatar from "../../smartsplit/user/avatar"
import { Text } from "../../text"
import StoreTestPage from "../test/store"
import { useStorePath } from "../../appstate/react"

const MENU_WEB = [
	{
		text: "menu:works",
		to: "/dashboard/my-works",
		icon: MusicNoteIcon,
	},
	{
		text: "menu:profile",
		to: "/user/settings",
		icon: UserCardIcon,
	},
	{
		text: "menu:collaborators",
		to: "/dashboard/my-collaborators",
		icon: UsersIcon,
	},
	{
		text: "menu:testsForms",
		to: "/dashboard/test/forms",
	},
	{
		text: "menu:testsFormsPage",
		to: "/test/forms",
	},
	{ text: "State Store", to: "/dashboard/test/store" },
]

const MENU_MOBILE = [
	{
		to: "/dashboard/my-works",
		icon: MusicNoteIcon,
	},

	{
		to: "/dashboard/notifications",
		icon: LogoNotification,
	},

	{
		to: "/dashboard/my-collaborators",
		icon: UsersIcon,
	},

	{
		to: "/user/settings",
		icon: function AvatarIcon({ color }) {
			return (
				<UserAvatar
					user={useStorePath("auth", "user", "data")}
					initials="XX"
					size="small"
					border={color}
				/>
			)
		},
	},
]

export default function DashboardPage(props) {
	const Layout = Platform.web ? DashboardLayout : BottomNavbarLayout
	const menu = Platform.web ? MENU_WEB : MENU_MOBILE

	return (
		<Layout menuItems={menu}>
			<Scrollable>
				<DashboardRoutes />
			</Scrollable>
		</Layout>
	)
}

export function MobileMenu({ children }) {
	return (
		<BottomNavbarLayout menuItems={MENU_MOBILE}>
			<Scrollable>{children}</Scrollable>
		</BottomNavbarLayout>
	)
}

export function DashboardRoutes(props) {
	return (
		<Switch>
			<Route path="/dashboard/" exact>
				<Redirect to="/dashboard/my-works" />
			</Route>

			<Route path="/dashboard/my-works" exact>
				<MyWorksPage />
			</Route>

			<Route path="/dashboard/my-collaborators" exact>
				<MyCollaboratorsPage />
			</Route>

			<Route path="/dashboard/change-password" exact>
				<ChangePasswordPage />
			</Route>

			<Route path="/dashboard/new-email" exact>
				<NewEmailModal />
			</Route>

			<Route path="/dashboard/test/forms" exact>
				<FormsTest />
			</Route>

			<Route path="/dashboard/test/store" exact>
				<StoreTestPage />
			</Route>
		</Switch>
	)
}
