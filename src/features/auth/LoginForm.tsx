import z from "zod";
import { useAuthStore } from "../../stores/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/api";

const schema = z.object({
  identifier: z.string(),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;
type Props = { onSuccess?: () => void };

export function LoginForm({ onSuccess }: Props) {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/api/auth/login", data);
      setAccessToken(res.data.accessToken);
      setUser(res.data.user ?? null);
      onSuccess?.();
    } catch {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("identifier")} placeholder="email" />
      {errors.identifier && <p>{errors.identifier.message}</p>}
      <input
        {...register("password")}
        type="password"
        placeholder="password"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button disabled={isSubmitting}>Login</button>
    </form>
  );
}

