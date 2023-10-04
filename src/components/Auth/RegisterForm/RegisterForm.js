import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Auth } from "@/api";
import { initialValues, validationSchema } from "./RegisterForm.form";

const authCtrl = new Auth();

export function RegisterForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await authCtrl.register(formValue);
        router.push("/join/sign-in");
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Input
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Form.Input
          name="firstname"
          type="text"
          placeholder="Nombres"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.errors.firstname}
        />
        <Form.Input
          name="lastname"
          type="text"
          placeholder="Apellidos"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
      </Form.Group>
        
      <Form.Group widths="equal">
        <Form.Input
          name="password"
          type="password"
          placeholder="Contraseña (Mínimo 6 caracteres)"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
      </Form.Group>

      <Form.Button type="submit" fluid loading={formik.isSubmitting}>
        Registrarse
      </Form.Button>
    </Form>
  );
}