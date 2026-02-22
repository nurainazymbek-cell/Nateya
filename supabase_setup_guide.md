# Supabase Setup Guide

The application is currently configured to use Supabase, but it cannot find the `users` table. This guide will help you fix it.

## 1. Verify Project ID

Your `.env.local` file has this URL:
`https://escviuyzwwoqknctncxp.supabase.co`

The Project ID is **`escviuyzwwoqknctncxp`**.

1.  Log in to [Supabase Dashboard](https://supabase.com/dashboard).
2.  Click on your project project.
3.  Look at the URL in your browser. It should look like:
    `https://supabase.com/dashboard/project/escviuyzwwoqknctncxp`
4.  **If the ID in your browser is different**:
    -   You are in the wrong project.
    -   Go to **Project Settings -> API**.
    -   Copy the **URL** and **anon public key**.
    -   Update your `.env.local` file with these new values.

## 2. Create the Table

If the Project ID is correct, you need to create the table.

1.  Go to the [SQL Editor](https://supabase.com/dashboard/project/escviuyzwwoqknctncxp/sql) (ensure the ID in the link matches your actual project).
2.  Click **New Query**.
3.  Paste this SQL:

```sql
create table public.users (
  id uuid primary key,
  name text not null,
  email text unique not null,
  password_hash text not null
);
```

4.  Click **Run**.
5.  Check the results section. It should say "Success".

## 3. Disable Row Level Security (RLS) for Testing

If the table exists but the app still can't see it, RLS might be blocking access.

1.  Go to the **Table Editor**.
2.  Select the `users` table.
3.  If you see a shield icon or "RLS" badge that is green/enabled, click it.
4.  Select **Disable RLS**.

## 4. Verify

Once you have done these steps, you can try registering a user in the application again.
