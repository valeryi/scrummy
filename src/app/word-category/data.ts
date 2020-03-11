export interface ICategory {
  id: string;
  name: string;
  stat: IStatCategory;
  position: string;
}

export interface IStatCategory {
  frenquency: number;
}

export const category: ICategory[] = [
  {
    id: '41324341',
    name: 'General',
    stat: {
      frenquency: 0
    },
    position: '4'
  },
  {
    id: '41324342',
    name: 'Cooking',
    stat: {
      frenquency: 3
    },
    position: '2'
  },
  {
    id: '41324343',
    name: 'Weather',
    stat: {
      frenquency: 2
    },
    position: '3'
  },
  {
    id: '41324343',
    name: 'new topic',
    stat: {
      frenquency: 2
    },
    position: '1'
  }
];
