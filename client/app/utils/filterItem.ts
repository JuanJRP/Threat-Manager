const filterItemByFormConfig = (
  item: Record<string, any>,
  allowedFields: string[]
) => {
  return Object.keys(item).reduce((filteredItem, key) => {
    if (allowedFields.includes(key)) {
        filteredItem[key] = item[key];
    }
    return filteredItem;
  }, {} as Record<string, any>)
};

export default filterItemByFormConfig;