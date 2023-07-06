export const typesColors = {
  normal: 'light',
  fighting: 'danger',
  flying: 'indigo',
  poison: 'violet',
  ground: 'amber',
  rock: 'amber',
  bug: 'lime',
  ghost: 'violet',
  steel: 'trueGray',
  fire: 'red',
  water: 'blue',
  grass: 'green',
  electric: 'yellow',
  psychic: 'pink',
  ice: 'lightblue',
  dragon: 'purple',
  dark: 'dark',
  fairy: 'pink',
  unknown: 'gray',
  shadow: 'dark',
};

// Obtener el color de tipos de pokemon
export const getTypeColor = (type: string) => {
  return typesColors[type as keyof typesColors] || 'light';
};

// Crea formato para número de pokemon
export const formatNumber = (num: number) => {
  return num.toString().padStart(3, '0');
};

export const removeEscapeCharacters = (str: string) => {
  return str.replace(/[\n\r\t\f]/g, ' ');
};
