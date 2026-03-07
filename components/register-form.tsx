"use client";

import Link from "next/link";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Create an account 🚀
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Join us today — it&apos;s free.
        </p>

        {/* Form */}
        <Form
          className="mt-6"
          onFinish={(values) => console.log("Register success:", values)}
          onFinishFailed={(errors) => console.log("Register errors:", errors)}
        >
          <Form.Item
            label="Full name"
            name="name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input name="name" type="text" placeholder="John Doe" />
          </Form.Item>

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
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input name="password" type="password" placeholder="••••••••" />
          </Form.Item>

          <Button type="submit" variant="primary" block className="mt-2">
            Create account
          </Button>
        </Form>

        {/* Footer links */}
        <p className="mt-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
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
