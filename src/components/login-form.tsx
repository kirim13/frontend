export default function LoginForm() {
  return (
    <>
      <form>
        <input id="username" name="username" placeholder="Username" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
