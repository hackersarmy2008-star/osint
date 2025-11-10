# Mobile Supabase App (Expo)

A minimal Expo React Native app with email/password login and a Users screen that shows total users.

## 1) Create a Supabase project
- Go to supabase.com and create a new project.
- In Project Settings → API, copy your **Project URL** and **anon public key**.

## 2) Configure the app
Edit `app.json` and set:
```json
"extra": {
  "supabaseUrl": "https://YOUR_PROJECT.supabase.co",
  "supabaseAnonKey": "YOUR_PUBLIC_ANON_KEY"
}
```

## 3) Create the `profiles` table and trigger
In the Supabase SQL Editor, run:
```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  created_at timestamp with time zone default now(),
  email text
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 4) Run the app
```bash
npm install
npx expo start
```

Sign up a couple accounts, then open the **Users** tab to see the total user count.

> Note: Only the count of rows in `profiles` is shown. For more control (e.g., restrict to admins), add RLS policies accordingly.

---

## Build an Android APK (signed)

1) Install EAS and log in:
```bash
npm i -g eas-cli
eas login
```

2) Initialize the project with EAS (creates a project on your Expo account):
```bash
eas init
# Follow prompts. This sets app.json > extra.eas.projectId automatically.
```

3) Configure `android.package` in `app.json` to your unique ID (e.g. `com.yourname.mobilesupabaseapp`).

4) Create a **signed APK**:
```bash
eas build -p android --profile apk
```
- If you don’t have a keystore, choose **Let EAS generate it**. EAS will store credentials for you.
- When the build finishes, you’ll get a download link to the **.apk**.

5) Install on device:
- Enable *Install unknown apps* on your Android device.
- Download the APK link provided by EAS and tap to install.
- Or use ADB: `adb install yourapp.apk`

### Notes
- For Play Store, use `eas build -p android --profile production` (AAB).
- Bump version in `app.json` → `expo.version` and Android `versionCode` via `expo.android.versionCode` when releasing updates.
