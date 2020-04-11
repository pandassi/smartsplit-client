import React, { useState, useEffect } from "react"
import { Platform, View, TouchableWithoutFeedback } from "react-native"
import { Redirect, useHistory } from "react-router"
import Button from "../../widgets/button"
import Scrollable from "../../widgets/scrollable"
import { Group, Row, Column, Flex } from "../../layout"
import { Heading, Paragraph, Text } from "../../text"
import { TextField, PasswordField } from "../../forms"
import PublicNavBar from "../../smartsplit/public/navbar"
import { CheckBox } from "../../forms"
import { Metrics, Links, Colors } from "../../theme"

import { notEmptyValidator } from "../../../helpers/validators"

export default function Login({ auth, login }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [hasSubmitted, setHasSubmitted] = useState(false)
	const [canSubmit, setCanSubmit] = useState(false)

	const history = useHistory()

	const buttonSize = Platform.OS === "web" ? "medium" : "large"

	useEffect(() => {
		if (auth.isLoggedIn) {
			setEmail("")
			setPassword("")
			setHasSubmitted(false)
		}
	}, [auth.isLoggedIn])

	useEffect(() => {
		let emailValid = notEmptyValidator(email)
		let passwordValid = notEmptyValidator(password)

		if (emailValid && passwordValid && !auth.isLoading) {
			setCanSubmit(true)
		} else {
			setCanSubmit(false)
		}
	}, [email, password, auth.isLoading])

	const handleForgotPassword = () => history.push("/auth/forgot-password")
	const handleSignUp = () => history.push("/auth/register")
	const handleLogin = () => {
		if (canSubmit) {
			login({ email, password })
			setHasSubmitted(true)
		}
	}

	return (
		<>
			{Platform.OS === "web" && (
				<PublicNavBar>
					<Text secondary>Pas de compte ?</Text>
					<View>
						<Button tertiary text="Crée un compte" onClick={handleSignUp} />
					</View>
					<Button secondary text="English" />
				</PublicNavBar>
			)}

			<Scrollable>
				<Column
					style={
						Platform.OS === "web" && { maxWidth: 464, alignSelf: "center" }
					}
				>
					<Group of="component">
						<Heading level="1">
							Connecte-toi à ton compte Smartsplit
						</Heading>

						<Paragraph>Entre tes informations ci-dessous</Paragraph>
					</Group>

					<Group of="group">
						{!auth.isLoading && hasSubmitted && auth.error && (
							<Text style={{ color: Colors.progressBar.orangered }}>
								{auth.error.response.data.message}
							</Text>
						)}

						{!auth.isLoading && auth.data && auth.data.accessToken && (
							<Redirect to="/dashboard/" />
						)}

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

							<TouchableWithoutFeedback onPress={handleForgotPassword}>
								<Text link small>
									Mot de passe oublié ?
								</Text>
							</TouchableWithoutFeedback>
						</Column>

						<Row align="right">
							<Button
								text="Me connecter"
								onClick={handleLogin}
								disabled={!canSubmit}
								style={Platform.OS !== "web" && { flex: 1 }}
								size={buttonSize}
							/>
						</Row>

						{Platform.OS !== "web" && (
							<Button
								tertiary
								text="Créer mon compte"
								onClick={handleSignUp}
								size={buttonSize}
							/>
						)}
					</Group>
				</Column>
			</Scrollable>
		</>
	)
}
