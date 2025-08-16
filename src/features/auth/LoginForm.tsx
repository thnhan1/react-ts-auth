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
      const res = await api.post("/auth/login", data);
      setAccessToken(res.data.accessToken);
      setUser(res.data.user ?? null);
      onSuccess?.();
    } catch {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl w-xl mx-auto p-8 bg-[#F5F5F5] rounded-lg shadow space-y-8"
    >
      <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-[#323232]" htmlFor="identifier">
        Email or Username
      </label>
      <input
        {...register("identifier")}
        id="identifier"
        placeholder="Enter your Apple ID"
        className="w-full px-4 py-3 border border-[#E0E0E0] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6F00] text-[#323232] placeholder-[#BDBDBD] transition"
      />
      {errors.identifier && (
        <p className="text-[#D32F2F] text-xs mt-1">{errors.identifier.message}</p>
      )}
      </div>
      <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-[#323232]" htmlFor="password">
        Password
      </label>
      <input
        {...register("password")}
        id="password"
        type="password"
        placeholder="Enter your password"
        className="w-full px-4 py-3 border border-[#E0E0E0] rounded bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6F00] text-[#323232] placeholder-[#BDBDBD] transition"
      />
      {errors.password && (
        <p className="text-[#D32F2F] text-xs mt-1">{errors.password.message}</p>
      )}
      </div>
      <button
      disabled={isSubmitting}
      className="w-full bg-[#FF6F00] text-white py-3 rounded font-semibold hover:bg-[#F57C00] disabled:opacity-50 transition"
      >
      Sign In
      </button>
    </form>
  );
}

