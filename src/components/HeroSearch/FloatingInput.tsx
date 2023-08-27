import React, { ReactNode, useState } from 'react';
import { TextInput, createStyles, InputBaseProps } from '@mantine/core';
import { CurrentLocation, IconProps, Location, LocationOff, Search } from 'tabler-icons-react';
import CInput from '../../lib/Input/CInput';

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
    // width: '210px',
  },

  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'dark'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
      ? theme.colors.dark[3]
      : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },
}));

interface FloatingInputProps {
  label: string,
  placeholder: string,
  icon: ReactNode
};

const  FloatingInput = (props: FloatingInputProps) => {
  const { label, placeholder, icon } = props;
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const { classes } = useStyles({ floating: value.trim().length !== 0 || focused });

  return (
    <div>
      <CInput label = { label } placeholder = { placeholder } icon = { icon } />
    </div>
    // <TextInput
    //     label={ label }
    //     placeholder={ placeholder }
    //     required
    //     classNames={classes}
    //     value={value}
    //     style={{borderRadius: '30px'}}
    //     onChange={(event) => setValue(event.currentTarget.value)}
    //     onFocus={() => setFocused(true)}
    //     onBlur={() => setFocused(false)}
    //     mt="md"
    //     radius="md"
    //     size="lg"
    //     width={200}
    //     autoComplete="nope"
    //     rightSection={
    //       icon
    //     }
    // />
  );
};

export default FloatingInput;