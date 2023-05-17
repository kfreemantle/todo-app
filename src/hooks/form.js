import { useEffect, useContext } from 'react';
import { SettingsContext } from '../Context/Settings';

const useForm = (callback, defaultValues = {}) => {
  const { values, setValues } = useContext(SettingsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    callback({ ...values });
    event.target.reset();
  };

  const handleChange = (event) => {
    let name, value;
    if (typeof (event) === 'object') {
      name = event.target.name;
      value = event.target.value;
    } else {
      console.log('event from slider', event)
      // hard coded for Mantine slider functionality 
      // change "difficulty" language if desired
      // change name dynamically if doing stretch goal!
      name = 'difficulty';
      value = event;
    }

    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues, setValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
