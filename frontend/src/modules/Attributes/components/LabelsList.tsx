import { useMemo } from 'react';
import { Chip } from '@mui/material';
import { Label } from '../../../types';
import { useAttributesContext } from '../contexts';

export interface LabelsListProps {
  labelIds?: Array<Label['id']>;
}

const LabelsList = ({ labelIds = [] }: LabelsListProps) => {
  const { labels: labelsList } = useAttributesContext();

  const labels = useMemo(() => [...labelsList.filter((label) => labelIds.includes(label.id))], [labelIds, labelsList]);

  return labels.map((label) => <Chip key={label.id} label={label.name} />);
};

export default LabelsList;
