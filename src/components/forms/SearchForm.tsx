import { Field, Form, Formik } from 'formik'

interface Props {
  placeholder?: string
  onSubmit?: (query: string) => void | Promise<void>
}

interface FormValues {
  search: string
}

const initialValues: FormValues = {
  search: '',
}

export function SearchForm({ placeholder = '', onSubmit }: Props) {
  const handleSubmit = (values: FormValues) => {
    onSubmit?.(values.search)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex gap-x-2 items-center">
        <label htmlFor="search">Buscar</label>
        <Field
          className="border-gray-300 border rounded-md p-2"
          id="search"
          name="search"
          type="search"
          placeholder={placeholder}
        />
      </Form>
    </Formik>
  )
}
