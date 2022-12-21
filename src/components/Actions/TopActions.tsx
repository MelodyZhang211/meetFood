import React from 'react';

import { ThreeColumnRow, ThreeColumnRowProps } from '../Layout';
import { styles } from './styles';

export interface TopActionsProps
	extends Pick<ThreeColumnRowProps, 'left' | 'center' | 'right' | 'style'> {
	backgroundColor?: string;
}

export const TopActions: React.FC<TopActionsProps> = ({
	left,
	center,
	right,
	style,
	backgroundColor,
}) => {
	return (
		<ThreeColumnRow
			left={left}
			center={center}
			right={right}
			style={[
				styles.topActions,
				backgroundColor !== undefined && { backgroundColor },
				style,
			]}
		/>
	);
};

export default TopActions;
