import React, { useCallback, useState } from 'react';

import { Button, Input, SecureInput, Text } from '../../components/Common';
import { useForm } from '../../hooks/useForm';
import { forgetPassword, forgetPasswordSubmit } from '../../utils/auth';
import { useNavigation } from '../../hooks/useNavigation';
import { AuthLayout } from '../../components/Layout';

export const ResetPassword: React.FC = () => {
	const { navigateToLoginScreen } = useNavigation();

	const {
		values: { email, password, code },
		errors,
		onFormValueChange,
		handleSubmit,
		setFormError,
		setFormErrors,
	} = useForm(
		{
			email: '',
			password: '',
			code: '',
		},
		{
			email: 'required',
		},
	);
	const [codeSent, setCodeSent] = useState(false);

	const onPress = useCallback(async () => {
		if (!codeSent) {
			try {
				await forgetPassword(email);
				setCodeSent(true);
			} catch (error: any) {
				setFormError('email', error?.message);
			}
		} else {
			try {
				await forgetPasswordSubmit(email, code, password);
				navigateToLoginScreen();
			} catch (error: any) {
				setFormErrors(error?.message);
			}
		}
	}, [
		code,
		codeSent,
		email,
		navigateToLoginScreen,
		password,
		setFormError,
		setFormErrors,
	]);

	return (
		<AuthLayout>
			<Text
				category="h5"
				text="Reset your password"
				style={{
					alignSelf: 'center',
					marginTop: 16,
					marginBottom: 24,
				}}
			/>

			{!codeSent && (
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
			)}

			{codeSent && (
				<>
					<Input
						label="Verification Code"
						value={code}
						onChangeText={onFormValueChange('code')}
						keyboardType="default"
						style={{
							marginBottom: 24,
						}}
						errorMessage={errors?.code}
					/>

					<SecureInput
						label="Password"
						value={password}
						onChangeText={onFormValueChange('password')}
						keyboardType="default"
						style={{
							marginBottom: 24,
						}}
						errorMessage={errors?.password}
					/>
				</>
			)}

			<Button
				text="Continue"
				variant="primary"
				onPress={handleSubmit(onPress)}
				style={{ marginBottom: 24 }}
			/>
		</AuthLayout>
	);
};

export default ResetPassword;
