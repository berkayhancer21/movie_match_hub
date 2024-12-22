import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        // Şifre eşleşmesini kontrol et
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        // API'ye kayıt isteği gönder
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => {
                router.push("/login"); // Giriş sayfasına yönlendir
            }, 2000);
        } else {
            setMessage(data.error || "An error occurred!");
        }
    }

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center">
            <div className="card lg:card-side bg-gray-800 shadow-xl max-w-4xl w-full">
                {/* Sol Görsel */}
                <figure className="lg:w-1/2">
                    <img
                        src="https://picsum.photos/seed/register/800/600"
                        alt="Random image"
                        className="object-cover w-full h-full"
                    />
                </figure>

                {/* Sağ Form */}
                <div className="card-body lg:w-1/2 text-gray-300">
                    <h2 className="card-title text-2xl font-bold mb-6 text-white">Sign Up</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-400">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="input input-bordered bg-gray-700 text-white w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-400">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="input input-bordered bg-gray-700 text-white w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-400">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="input input-bordered bg-gray-700 text-white w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text text-gray-400">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="input input-bordered bg-gray-700 text-white w-full"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary w-full bg-blue-600 hover:bg-blue-800">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="divider text-gray-600">OR</div>
                    <p className="text-center">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-400 hover:text-blue-600 hover:underline">
                            Login
                        </a>
                    </p>
                    {message && (
                        <p className="mt-4 text-center text-red-500">
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
