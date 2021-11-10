import { zodResolver } from "@hookform/resolvers/zod/dist/zod"; // https://github.com/react-hook-form/resolvers/issues/271
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../components/ui/Button";
import { urqlClientWrapper } from "../graphql/client";
import { useRegisterUserMutation } from "../graphql/hooks";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";

const schema = z.object({
  name: z.string().nonempty({ message: "Required" }),
  email: z.string().nonempty({ message: "Required" }),
  password: z.string().nonempty({ message: "Required" }),
  image: z.string().nonempty({ message: "Required" }),
});

type RegisterInput = z.infer<typeof schema>;

const RegisterPage: FC = () => {
  const [, submitInput] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    submitInput({ userInput: data }).then((result) => {
      if (result.error) console.log(result.error.message);
      else console.log(result.data?.RegisterUser.email);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-2 m-auto p-2 w-3/12"
    >
      <input
        {...register("name")}
        placeholder="Name"
        className="focus:ring-primary p-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <input
        {...register("email")}
        placeholder="Email"
        className="focus:ring-primary p-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <input
        {...register("password")}
        placeholder="Password"
        type="password"
        className="focus:ring-primary p-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}

      <input
        {...register("image")}
        placeholder="Image"
        className="focus:ring-primary p-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50"
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}
      <Button label="Submit" type="submit" />
    </form>
  );
};

export default urqlClientWrapper(RegisterPage, true);
