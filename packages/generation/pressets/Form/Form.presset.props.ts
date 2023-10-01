import {
  SlidePressetDefaultProps,
  SlidePressetProps,
} from '@tok/generation/pressets/Slide';

export type FormControl = {
  id: string;
  placeholder: string;
  type: 'checkbox' | 'radio' | string;
};

export type FormPressetProps = Omit<
  SlidePressetProps,
  'extends' | 'description'
> & {
  extends?: 'form';

  description?: string;

  form: FormControl[];
};

const defaultForm: FormControl[] = [
  {
    id: 'id1',
    placeholder: 'placeholder for type: text',
    type: 'text' as const,
  },
];

export const FormPressetDefaultProps = {
  ...SlidePressetDefaultProps,
  description: '',
  form: () => defaultForm,
} as const;
