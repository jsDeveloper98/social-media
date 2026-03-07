"use client";

import Link from "next/link";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Welcome back 👋
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Sign in to your account to continue.
        </p>

        {/* Form */}
        <Form
          className="mt-6"
          onFinish={(values) => console.log("Login success:", values)}
          onFinishFailed={(errors) => console.log("Login errors:", errors)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input name="email" type="email" placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input name="password" type="password" placeholder="••••••••" />
          </Form.Item>

          <Button type="submit" variant="primary" block className="mt-2">
            Login
          </Button>
        </Form>

        {/* Footer links */}
        <p className="mt-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Register
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href="/"
            className="font-medium text-zinc-900 underline underline-offset-2 dark:text-zinc-100"
          >
            ← Back to Home
          </Link>
        </p>
      </div>
    </main>
  );
}
