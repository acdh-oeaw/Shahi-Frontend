export function dtoToEntity(dtoEntity){
  let item  = dtoEntity.features[0]
  item.getType = (hierarchy) => item.types?.find(x => x.hierarchy.split(' > ')[0] === hierarchy);
  item.getTypes = (hierarchy) => item.types?.filter(x => x.hierarchy.split(' > ')[0] === hierarchy);
  item.relation = (relationType) => item.relations?.find(x => x.relationType === relationType);
  item.getRelations = (relationType) => item.relations?.filter(x => x.relationType === relationType);

  return item;
}

export function useGetType(entity){
  if(entity?.crmClass === "crm:E18 Physical Thing") return "archeological site";
  if(entity?.types?.some(x => x.label === 'Coin')) return "coin";
  if(entity?.types?.some(x => x.label === 'Stationary' || x.hierarchy.startsWith('Artifact > Stationary'))) return "stationary";
  if(entity?.types?.some(x => x.label === 'Portable' || x.hierarchy.startsWith('Artifact > Portable'))) return "portable";
  if(entity?.types?.some(x => x.label === 'Inscriptions' || x.hierarchy.startsWith('Artifact > Information carrier'))) return "inscription";
}
