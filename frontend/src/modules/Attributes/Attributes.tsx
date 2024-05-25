import { ViewLayout } from '../../components';
import { AttributesList } from './AttributesList';
import { AttributesDetail } from './AttributesDetail';

const Attributes = () => {
  // TODO
  // Obalit contextem nebo jiným state managementem ... Zustand?
  // Potřebuji to kvůli - filtraci, vyhledávání ...

  // TODO
  // Možná zde načítat a ukládat ty Labels ??? Jak často se budou měnit?

  const deleteHandler = (id: string, callback?: Function) => {
    console.log('on delete', id);

    // TODO - this is callback after api call
    callback?.();
  };

  return (
    <ViewLayout>
      <AttributesList onDelete={deleteHandler} />
      <AttributesDetail onDelete={deleteHandler} />
    </ViewLayout>
  );
};

export default Attributes;
