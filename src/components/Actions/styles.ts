import { StyleSheet } from 'react-native';

import { TOP_ACTIONS_HEIGHT, DEVICE_WIDTH } from '../../constants/layout';

export const styles = StyleSheet.create({
	topActions: {
		height: TOP_ACTIONS_HEIGHT,
		paddingHorizontal: 10,
		paddingVertical: 10,
		width: DEVICE_WIDTH,
	},
});
