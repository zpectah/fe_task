import { useMemo } from 'react';
import { useLabels } from '../../../hooks';
import { Label } from '../../../types';

interface AttributeDetailLabelsProps {
  labelIds?: Array<Label['id']>;
}

const AttributeDetailLabels = ({ labelIds = [] }: AttributeDetailLabelsProps) => {
  const { data } = useLabels({
    offset: 0,
    limit: 10,
  });

  const labels = useMemo(() => {
    return [...data.filter((label) => labelIds.includes(label.id))];
  }, [labelIds, data]);

  return labels.map((label) => <span key={label.id}>{label.name}</span>);
};

export default AttributeDetailLabels;
