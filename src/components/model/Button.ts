export interface ButtonComponentProps {
    text: string;
    link: string;
    color?: 'primary' | 'secondary' | 'danger' | 'default';
    style?: object; 
    width?: string | number; 
  }