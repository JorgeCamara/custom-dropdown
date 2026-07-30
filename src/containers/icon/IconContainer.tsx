import type { ComponentPropsWithoutRef } from 'react';
import {
    getIconSource,
    type IconName,
} from '@containers/icon/Icon';

interface IconContainerPropsProps
  extends Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt'> {
  iconName: IconName,
  iconSize?: number,
  label?: string,
}

function IconContainer ({
    iconName,
    iconSize,
    ...imageProps
}: IconContainerPropsProps) {
    const iconSource = getIconSource(iconName);
    return (
        <img
            {...imageProps}
            aria-hidden='true'
            alt=''
            className='iconContainer'
            width={iconSize}
            height={iconSize}
            src={iconSource}
        />
    );
}

export default IconContainer;