import React, { useState, useCallback } from 'react';
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Spinner } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import { Text } from '../Text';

import { styles } from './styles';

export interface ButtonProps {
	text?: string;
	variant?: 'default' | 'basic' | 'primary';
	onPress?: () => void | Promise<void>;
	style?: ViewStyle;
	textStyle?: TextStyle;
	spinnerStatus?: EvaStatus;
	loading?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	text,
	variant = 'default',
	onPress,
	style,
	textStyle,
	spinnerStatus = 'basic',
	loading,
	disabled = false,
	children,
}) => {
	const [internalIsLoading, setInternalIsLoading] = useState(false);

	const internalOnPress = useCallback(async () => {
		setInternalIsLoading(true);
		await onPress?.();
		setInternalIsLoading(false);
	}, [onPress]);

	const isLoading = loading === undefined ? internalIsLoading : loading;

	return (
		<TouchableOpacity
			style={[
				styles.container,
				isLoading && styles.isLoading,
				disabled && styles.disabled,
				variant === 'basic' && styles.basic,
				variant === 'primary' && styles.primary,
				style,
			]}
			onPress={internalOnPress}
			disabled={disabled || isLoading}
		>
			{isLoading ? (
				<Spinner status={spinnerStatus} />
			) : children ? (
				children
			) : (
				<Text style={[styles.text, textStyle]} text={text} />
			)}
		</TouchableOpacity>
	);
};

export default Button;
