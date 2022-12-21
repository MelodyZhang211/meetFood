import React, { useCallback } from 'react';
import { View } from 'react-native';

import { Button, Input, SecureInput, Text } from '../../components/Common';
import { useForm } from '../../hooks/useForm';
import { userSignup } from '../../utils/auth';
import { useNavigation } from '../../hooks/useNavigation';
import { AuthLayout } from '../../components/Layout';

export const Signup: React.FC = () => {
	const { navigateToConfirmSignupCodeScreen, navigateToLoginScreen } =
		useNavigation();

	const {
		values: { email, password },
		errors,
		onFormValueChange,
		handleSubmit,
		setFormErrors,
	} = useForm(
		{
			email: '',
			password: '',
		},
		{
			email: 'required',
			password: [
				'required',
				(password: string) =>
					password.length < 8
						? 'Your password must be at least 8 characters'
						: null,
				(password: string) =>
					!/[A-Z]/.test(password)
						? 'Your password must contain uppercase letters'
						: null,
				(password: string) =>
					!/[a-z]/.test(password)
						? 'Your password must contain lowercase letters'
						: null,
				(password: string) =>
					!/\d/.test(password) ? 'Your password must contain numbers' : null,
			],
		},
	);

	const onSignup = useCallback(async () => {
		try {
			await userSignup(email, password);

			navigateToConfirmSignupCodeScreen(email, password);
		} catch (error: any) {
			setFormErrors(error);
		}
	}, [email, navigateToConfirmSignupCodeScreen, password, setFormErrors]);

	return (
		<AuthLayout>
			<Text
				category="h5"
				text="Sign up"
				style={{
					alignSelf: 'center',
					marginTop: 16,
					marginBottom: 24,
				}}
			/>

			<Input
				label="Email"
				value={email}
				onChangeText={onFormValueChange('email')}
				keyboardType="email-address"
				style={{
					marginBottom: 24,
				}}
				errorMessage={errors?.email}
			/>

			<SecureInput
				label="Password"
				value={password}
				onChangeText={onFormValueChange('password')}
				keyboardType="default"
				style={{
					marginBottom: 24,
				}}
				caption={() =>
					!password ? (
						<Text
							category="c1"
							style={{
								color: '#7D7A77',
								marginBottom: 0,
							}}
							text="Your password must be at least 8 characters and contain uppercase letters, lowercase letters, and numbers"
						/>
					) : (
						<React.Fragment />
					)
				}
				errorMessage={errors?.password}
			/>

			<Button
				text="Continue"
				variant="primary"
				onPress={handleSubmit(onSignup)}
				style={{ marginBottom: 24 }}
			/>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text text="Have an account?" style={{ marginRight: 4 }} />
				<Text text="Log in here" onPress={navigateToLoginScreen} />
				<Text text="." />
			</View>
		</AuthLayout>
	);
};

export default Signup;
