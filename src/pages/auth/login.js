import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import * as AuthActions from "../../../redux/Auth/Actions"
import { Redirect, useHistory } from "react-router"
import Button from "../../widgets/button"
import { Group, Row, Column, Flex } from "../../layout"
import { Heading, Paragraph, Text, Link } from "../../text"
import { TextField, PasswordField } from "../../forms"
import AuthLayout from "./layout"
import { CheckBox } from "../../forms"
import { Platform } from "../../platform"

import { notEmptyValidator } from "../../../helpers/validators"

export const LoginErrorCodes = {
	auth_invalid_credentials:
		"Adresse courriel ou mot de passe invalide. Veuillez réessayer.",
	auth_account_inactive:
		"Ce compte n'a pas encore été activé. Vérifie tes courriels, ou essaie de t'inscrire à nouveau!",
}

export const LoginForm = connect(
	function ({ auth }) {
		return { auth }
	},
	function (dispatch) {
		return {
			login: function (details, rememberMe) {
				dispatch(AuthActions.loginUser(details, rememberMe))
			},
		}
	}
)(function (props) {
	const {
		auth,
		login,
		stayLoggedIn,
		showForgotPassword,
		setFormState,
		children,
		onSuccess,
	} = props

	if (!auth.isLoading && auth.data && auth.data.accessToken) {
		onSuccess && onSuccess(auth.data.user)
	}

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const validEmail = notEmptyValidator(email)
	const validPassword = notEmptyValidator(password)

	const canSubmit = !auth.isLoading && validEmail && validPassword

	const error = !auth.isLoading && auth.error
	const errorCode = error && error.code
	const errorMessage =
		(errorCode && LoginErrorCodes[errorCode]) || (error && error.message)

	useEffect(() => {
		setEmail("")
		setPassword("")
	}, [auth.isLoggedIn])

	const handleLogin = () => login({ email, password }, stayLoggedIn)

	setFormState &&
		useEffect(() => {
			setFormState({ canSubmit, submit: handleLogin })
		}, [setFormState, canSubmit, email, password])

	return (
		<Column of="group">
			<TextField
				label="Mon courriel"
				placeholder="nom@example.com"
				onChangeText={setEmail}
				value={email}
			/>

			<Column of="inside">
				<PasswordField
					label="Mot de passe"
					onChangeText={setPassword}
					value={password}
				/>

				<Link link small onClick={showForgotPassword}>
					Mot de passe oublié ?
				</Link>
			</Column>

			{errorMessage && <Text error>{errorMessage}</Text>}

			{children}
		</Column>
	)
})

export default function LoginPage({ showRegister }) {
	const history = useHistory()

	const [stayLoggedIn, setStayLoggedIn] = useState(false)
	const [formState, setFormState] = useState({})

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	const onSuccess = () => history.push("/")

	const stayLoggedInCheckbox = (
		<CheckBox
			onChange={setStayLoggedIn}
			checked={stayLoggedIn}
			label="Rester connecté"
		/>
	)

	return (
		<AuthLayout>
			{(layoutProps) => (
				<Column of="group">
					<Column of="component">
						<Heading level="1">Connecte-toi à ton compte Smartsplit</Heading>

						<Paragraph>Entre tes informations ci-dessous</Paragraph>
					</Column>

					<LoginForm
						stayLoggedIn={stayLoggedIn}
						setFormState={setFormState}
						onSuccess={onSuccess}
						{...layoutProps}
					/>

					<Platform web={Row} native={Column} of="group">
						{Platform.web && stayLoggedInCheckbox}

						{Platform.web && <Flex />}

						<Button
							text="Me connecter"
							onClick={formState.submit}
							disabled={!formState.canSubmit}
							style={Platform.native && { flex: 1 }}
							size={buttonSize}
						/>

						{Platform.native && (
							<Button
								tertiary
								text="Créer mon compte"
								onClick={showRegister}
								size={buttonSize}
							/>
						)}
					</Platform>
				</Column>
			)}
		</AuthLayout>
	)
}
