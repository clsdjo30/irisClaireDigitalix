import React from 'react';

const Icon = ({ name, size, color }) => (
    <React.Fragment testID={`icon-${name}`}>{name}</React.Fragment>
);

export default Icon;
