export interface ButtonComponentProps {
    text: string;
    link: string;
    color?: 'primary' | 'secondary' | 'danger' | 'default';
    style?: object; // To allow custom styling
    width?: string | number; // Accept width as a string or number (percentage or fixed value)
  }