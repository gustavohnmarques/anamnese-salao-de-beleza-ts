import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function Skeleton(): React.JSX.Element {

    return (
        <>
            {[0, 1, 2, 3, 4].map((item, index) => {
                return (
                    <SkeletonPlaceholder borderRadius={4} backgroundColor='#282828' highlightColor='#404040' key={index}>
                        <SkeletonPlaceholder.Item width={'100%'} height={60} borderRadius={6} marginBottom={20}>
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                )
            })}
        </>

    )
}

export default Skeleton;