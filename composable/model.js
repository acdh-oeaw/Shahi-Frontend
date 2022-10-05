export function dtoToEntity(dtoEntity){
  let item  = dtoEntity.features[0]
  item.type = (hierarchy) => item.types.find(x => x.hierarchy.split(' > ')[0] === hierarchy);
  item.getTypes = (hierarchy) => item.types.filter(x => x.hierarchy.split(' > ')[0] === hierarchy);
  item.relation = (relationType) => item.relations.find(x => x.relationType === relationType);
  item.getRelations = (relationType) => item.relations.filter(x => x.relationType === relationType);

  return item;
}

export function useGetType(entity){
    if(entity?.crmClass === "crm:E18 Physical Thing") return "archeological site";
  if(entity?.types.some(x => x.label === 'Stationary')) return "stationary";
  if(entity?.types.some(x => x.label === 'Portable')) return "portable";

}
