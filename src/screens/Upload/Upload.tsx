import React from 'react';
import { Text } from 'react-native';
import { Button } from '@ui-kitten/components';

import { Placeholder } from '../../components/Placeholder';
import { useNavigation } from '../../hooks/useNavigation';

export interface UploadProps {}

export const Upload: React.FC<UploadProps> = () => {
	const { navigateToFeedScreen } = useNavigation();

	return (
		<Placeholder>
			<Text>This is Upload Screen</Text>

			<Button onPress={navigateToFeedScreen}>
				<Text>Go back</Text>
			</Button>
		</Placeholder>
	);
};

export default Upload;
