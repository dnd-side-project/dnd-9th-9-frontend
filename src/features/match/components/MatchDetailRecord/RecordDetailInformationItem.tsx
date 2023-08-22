import React from 'react';

import {Gap} from '../../../../components/Gap';
import {Line} from '../../../../components/Line';
import {Text} from '../../../../components/Text';

interface IRecordDetailInformationItemProps {
  label: string;
  value: string;
}

export const RecordDetailInformationItem = ({
  label,
  value,
}: IRecordDetailInformationItemProps): React.JSX.Element => (
  <>
    <Text type="caption" color="gray-600" fontWeight="400" text={label} />
    <Gap size="14px" />
    <Text type="body2" color="gray-950" fontWeight="600" text={value} />
    <Gap size="10px" />
    <Line size="sm" />
  </>
);
