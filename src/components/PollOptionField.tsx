import {UseFormRegister, FieldValues, useForm} from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  FormErrorMessage,
  Button,
  Flex,
  Heading,
  Box,
  IconButton,
  Spacer,
} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';
import React, {Dispatch, SetStateAction, useEffect} from 'react';

export interface PollOptionFieldProps {
  errors: {
    [key: string]: any;
  };
  id: number;
  index: number;
  removeOption: Function;
  register: UseFormRegister<FieldValues>;
}

export default function PollOptionFields(props: PollOptionFieldProps) {
  const {errors, id, index, register, removeOption} = props;
  const name = `option${id}-value`;
  const description = `option${id}-description`;

  function handleRemove() {
    removeOption(id, name, description);
  }

  useEffect(() => {
    if (index > 0) {
      const field = document.getElementById(name);

      field?.scrollIntoView({behavior: 'smooth'});
      field?.focus();
    }
  }, []);

  return (
    <>
      {index > 0 && (
        <Box mt={10} mb={10}>
          <hr />
        </Box>
      )}

      <Box mt={10}>
        <Heading as="h2" size="md">
          Option #{index + 1}
        </Heading>

        <FormControl mt={10} isInvalid={errors[name]}>
          <FormLabel htmlFor={name}>Option #{index + 1}</FormLabel>
          <Input
            id={name}
            type="text"
            resize="none"
            size="md"
            {...register(name, {
              required: 'This is required',
            })}
          />
          <FormErrorMessage>
            {errors[name] && errors[name].message}
          </FormErrorMessage>
        </FormControl>

        <Flex mt={10} justifyContent="flex-end">
          <IconButton
            aria-label={`Remove Option #${index + 1}`}
            icon={<DeleteIcon />}
            onClick={handleRemove}
          />
        </Flex>
      </Box>
    </>
  );
}
